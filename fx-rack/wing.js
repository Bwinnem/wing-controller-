// Talks to the WING FX rack over OSC and keeps a mirror of all 16 slots.
//
// WING OSC (Patrick-Gilles Maillot, "WING Remote Protocols" FW 3.1):
//   - UDP port 2223. "WING?" to port 2222 answers "WING,<ip>,<name>,<model>,<serial>,<fw>".
//   - Query a value by sending the bare address. Replies are ",sff"/",sfi"
//     (text, normalized 0..1, real value) or ",s" for text-only values.
//   - Query a node by sending its bare address, e.g. "/fx/1": the reply lists its children
//     ("mdl", "fxmix", "$esrc", ..., then the loaded effect's parameter names).
//   - FX slot n: /fx/n/mdl (model), /fx/n/fxmix (0..100 %), /fx/n/$a_chn, /fx/n/$a_pos (read only),
//     and /fx/n/<param> for the loaded effect's parameters.
//   - "/*S" subscribes to changes for 10 s; we renew every 8 s.
import dgram from 'node:dgram';
import { EventEmitter } from 'node:events';
import { encode, decode } from './osc.js';
import { FX_CATALOG } from './public/catalog.js';

export const OSC_PORT = 2223;
export const DISCOVERY_PORT = 2222;
const RENEW_MS = 8000;
const SLOT_KEYS = new Set(['mdl', 'fxmix', '$esrc', '$emode', '$a_chn', '$a_pos']);

export function paramDef(model, key) {
  return FX_CATALOG[model]?.params.find((p) => p.key === key);
}

/** Builds the OSC argument WING expects for a parameter value. */
export function oscArgFor(model, key, value) {
  if (key === 'mdl') return { type: 's', value: String(value) };
  if (key === 'fxmix') return { type: 'f', value: Number(value) };
  const def = paramDef(model, key);
  if (def?.type === 'str') return { type: 's', value: String(value) };
  if (def?.type === 'int') return { type: 'i', value: Math.round(Number(value)) };
  if (typeof value === 'string' && Number.isNaN(Number(value))) return { type: 's', value };
  return { type: 'f', value: Number(value) };
}

/** Real UDP connection to a console. */
export class UdpTransport {
  constructor(host) {
    this.host = host;
    this.socket = dgram.createSocket('udp4');
    this.socket.on('error', (e) => this.onError?.(e));
    this.socket.on('message', (buf) => this.onPacket?.(buf));
    this.socket.bind(0);
  }
  send(buf) {
    this.socket.send(buf, OSC_PORT, this.host);
  }
  identify() {
    this.socket.send(Buffer.from('WING?'), DISCOVERY_PORT, this.host);
  }
  close() {
    try {
      this.socket.close();
    } catch {}
  }
}

function emptySlot(n) {
  return { n, model: null, mix: null, chn: 0, pos: 0, keys: [], values: {}, loading: true };
}

export class WingRack extends EventEmitter {
  constructor() {
    super();
    this.slots = Array.from({ length: 16 }, (_, i) => emptySlot(i + 1));
    this.status = 'offline';
    this.consoleName = null;
    this.transport = null;
    this.queue = [];
    this.lastRx = 0;
    this.timers = [];
    this.flushTimers = new Map();
  }

  // ---- connection ----

  attach(transport, label) {
    this.detach();
    this.transport = transport;
    this.label = label;
    this.slots = Array.from({ length: 16 }, (_, i) => emptySlot(i + 1));
    transport.onPacket = (buf) => this.#onPacket(buf);
    transport.onError = (e) => this.#setStatus('error', e.message);
    this.#setStatus('connecting');
    transport.identify?.();
    this.#send('/*S');
    this.refreshAll();
    this.timers.push(setInterval(() => this.#send('/*S'), RENEW_MS));
    this.timers.push(setInterval(() => this.#drain(), 10));
    this.timers.push(
      setInterval(() => {
        if (this.status === 'online' && Date.now() - this.lastRx > 12000) {
          this.#setStatus('connecting', 'No answer from the console');
          transport.identify?.();
          this.refreshAll();
        }
      }, 3000)
    );
    this.emit('reset');
  }

  detach() {
    this.timers.forEach(clearInterval);
    this.timers = [];
    this.queue = [];
    this.transport?.close();
    this.transport = null;
    this.consoleName = null;
    this.#setStatus('offline');
  }

  refreshAll() {
    for (let n = 1; n <= 16; n++) this.refreshSlot(n);
  }

  refreshSlot(n) {
    const slot = this.slots[n - 1];
    slot.model = null; // forces a full re-read when the model reply arrives
    for (const k of ['mdl', 'fxmix', '$a_chn', '$a_pos']) this.#query(`/fx/${n}/${k}`);
  }

  // ---- changing values ----

  set(n, key, value) {
    const slot = this.slots[n - 1];
    if (!slot || !this.transport) return;
    const arg = oscArgFor(slot.model, key, value);
    this.#send(`/fx/${n}/${key}`, [arg]);
    if (key === 'mdl') {
      // Read it back: the console may refuse a model the slot can't host.
      setTimeout(() => this.refreshSlot(n), 150);
      return;
    }
    if (key === 'fxmix') slot.mix = arg.value;
    else slot.values[key] = arg.value;
    this.emit('value', { n, key, value: arg.value });
  }

  // ---- receiving ----

  #onPacket(buf) {
    this.lastRx = Date.now();
    const text = buf.toString('latin1');
    if (text.startsWith('WING,')) {
      const f = text.replace(/\0+$/, '').split(',');
      this.consoleName = `${f[2]} (${f[3]}, fw ${f[5]})`;
      this.#setStatus('online');
      return;
    }
    const msg = decode(buf);
    if (!msg) return;
    if (this.status !== 'online') this.#setStatus('online');
    this.#handle(msg);
  }

  #handle({ address, args }) {
    const m = address.match(/^\/fx\/(\d+)(?:\/(.+))?$/);
    if (!m) return;
    const n = Number(m[1]);
    const key = m[2];
    const slot = this.slots[n - 1];
    if (!slot) return;

    if (!key) {
      // Node listing: children names of /fx/n.
      if (args.length && args.every((a) => typeof a === 'string') && args[0] === 'mdl') {
        this.#gotKeys(slot, args.filter((k) => !SLOT_KEYS.has(k)));
      }
      return;
    }
    if (!args.length) return;
    const text = typeof args[0] === 'string' ? args[0] : null;
    const real = args.length >= 3 ? args[2] : args[0];

    if (key === 'mdl') {
      const model = String(text ?? real).toUpperCase();
      if (model !== slot.model) {
        slot.model = model;
        slot.keys = [];
        slot.values = {};
        slot.loading = true;
        this.#send(`/fx/${n}`); // ask for the parameter names of this model
        clearTimeout(slot.keysTimer);
        // If the console doesn't list the node, fall back to the documented parameters.
        slot.keysTimer = setTimeout(() => {
          if (!slot.keys.length) this.#gotKeys(slot, (FX_CATALOG[model]?.params || []).map((p) => p.key));
        }, 1500);
        this.#scheduleSlot(slot);
      }
      return;
    }
    if (key === 'fxmix') {
      slot.mix = Number(real);
      this.#valueChanged(slot, key, slot.mix);
      return;
    }
    if (key === '$a_chn' || key === '$a_pos') {
      slot[key === '$a_chn' ? 'chn' : 'pos'] = Number(real);
      this.#scheduleSlot(slot);
      return;
    }
    if (key.startsWith('$')) return;

    const def = paramDef(slot.model, key);
    let value = real;
    if (def?.type === 'str' && text != null) value = text;
    else if (typeof value === 'string' && !Number.isNaN(Number(value))) value = Number(value);
    if (!slot.keys.includes(key)) slot.keys.push(key);
    slot.values[key] = value;
    this.#valueChanged(slot, key, value);
  }

  #gotKeys(slot, keys) {
    clearTimeout(slot.keysTimer);
    slot.keys = keys;
    for (const k of keys) this.#query(`/fx/${slot.n}/${k}`);
    if (!keys.length) slot.loading = false;
    this.#scheduleSlot(slot);
  }

  #valueChanged(slot, key, value) {
    if (slot.loading) this.#scheduleSlot(slot);
    else this.emit('value', { n: slot.n, key, value });
  }

  /** Sends one full snapshot of a slot once its burst of replies has settled. */
  #scheduleSlot(slot) {
    clearTimeout(this.flushTimers.get(slot.n));
    this.flushTimers.set(
      slot.n,
      setTimeout(() => {
        if (slot.keys.length && slot.keys.every((k) => k in slot.values)) slot.loading = false;
        this.emit('slot', this.snapshot(slot.n));
      }, 120)
    );
  }

  snapshot(n) {
    const s = this.slots[n - 1];
    return {
      n,
      model: s.model,
      mix: s.mix,
      chn: s.chn,
      pos: s.pos,
      loading: s.loading,
      params: s.keys.map((k) => ({ key: k, value: s.values[k] })),
    };
  }

  // ---- sending ----

  #query(address) {
    this.queue.push(encode(address));
  }

  #send(address, args = []) {
    this.transport?.send(encode(address, args));
  }

  /** Paces queries so a full read of the rack (~500 messages) doesn't flood the console. */
  #drain() {
    for (let i = 0; i < 25 && this.queue.length; i++) this.transport?.send(this.queue.shift());
  }

  #setStatus(status, detail) {
    if (this.status === status && !detail) return;
    this.status = status;
    this.emit('status', { status, detail: detail || null, console: this.consoleName, target: this.label || null });
  }
}
