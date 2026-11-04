// A pretend WING that answers the same OSC the real console does, so the rack
// can be tried (and tested) without a console on the network.
import { encode, decode } from './osc.js';
import { FX_CATALOG, PREMIUM_MODELS, STANDARD_MODELS } from './public/catalog.js';

const START_MODELS = [
  'HALL', 'PLATE', 'ST-DL', 'CHORUS', 'TAPE-DL', 'V-ROOM', 'PITCH', 'NONE',
  'GEQ', 'LIMITER', 'DE-S2', 'PIA', '*MASTER*', 'ROTARY', 'NONE', 'EXCITER',
];

function defaultValue(p) {
  if (p.type === 'str' || p.type === 'flt') return p.options?.[0] ?? '';
  if (p.type === 'fader') return 0;
  const min = p.min ?? 0;
  const max = p.max ?? 1;
  if (p.type === 'int') return Math.round(min + (max - min) * 0.3);
  if (min < 0 && max > 0) return 0;
  if (p.type === 'logf' && min > 0) return +(min * Math.pow(max / min, 0.4)).toFixed(3);
  return +(min + (max - min) * 0.4).toFixed(3);
}

export class DemoTransport {
  constructor() {
    this.slots = START_MODELS.map((m, i) => this.#load(i + 1, m));
    this.slots[2].chn = 0;
    this.slots[8].chn = 49; // GEQ on bus 1, as an example of an insert
    this.slots[9].chn = 65; // limiter on main 1
    this.slots[9].pos = 1;
    this.slots[10].chn = 3; // de-esser on ch 3
  }

  #load(n, model) {
    // A Map keeps the documented order (a plain object would sort keys like "20", "25" first).
    const params = new Map();
    for (const p of FX_CATALOG[model]?.params || []) params.set(p.key, defaultValue(p));
    return { n, model, mix: 100, chn: 0, pos: 0, params };
  }

  identify() {
    this.#reply(Buffer.from('WING,127.0.0.1,DEMO,wing-full,DEMO,3.1.0\0'));
  }

  send(buf) {
    const msg = decode(buf);
    if (!msg) return;
    const m = msg.address.match(/^\/fx\/(\d+)(?:\/(.+))?$/);
    if (!m) return;
    const slot = this.slots[Number(m[1]) - 1];
    if (!slot) return;
    const key = m[2];
    const addr = msg.address;

    if (!key) {
      const names = ['mdl', 'fxmix', '$esrc', '$emode', '$a_chn', '$a_pos', ...slot.params.keys()];
      return this.#out(addr, names.map((s) => ({ type: 's', value: s })));
    }
    if (msg.args.length) {
      const v = msg.args[0];
      if (key === 'mdl') {
        const model = String(v).toUpperCase();
        const allowed = slot.n <= 8 ? PREMIUM_MODELS : STANDARD_MODELS;
        if (allowed.includes(model)) Object.assign(slot, this.#load(slot.n, model), { chn: slot.chn, pos: slot.pos });
      } else if (key === 'fxmix') slot.mix = v;
      else if (slot.params.has(key)) slot.params.set(key, v);
      return;
    }
    if (key === 'mdl') return this.#out(addr, [{ type: 's', value: slot.model }]);
    if (key === 'fxmix') return this.#sff(addr, `${slot.mix}`, slot.mix / 100, slot.mix);
    if (key === '$a_chn') return this.#sff(addr, `${slot.chn}`, slot.chn / 76, slot.chn, 'i');
    if (key === '$a_pos') return this.#sff(addr, `${slot.pos}`, slot.pos, slot.pos, 'i');
    if (slot.params.has(key)) {
      const v = slot.params.get(key);
      if (typeof v === 'string') return this.#out(addr, [{ type: 's', value: v }]);
      return this.#sff(addr, String(v), 0.5, v);
    }
  }

  #sff(addr, text, norm, real, last = 'f') {
    this.#out(addr, [
      { type: 's', value: text },
      { type: 'f', value: norm },
      { type: last, value: real },
    ]);
  }

  #out(addr, args) {
    this.#reply(encode(addr, args));
  }

  #reply(buf) {
    setTimeout(() => this.onPacket?.(buf), 2);
  }

  close() {}
}
