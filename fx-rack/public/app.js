import { FX_CATALOG, PREMIUM_MODELS, STANDARD_MODELS } from './catalog.js';
import { MODEL_INFO, paramLabel, paramHint, insertLabel } from './help.js';

const rackEl = document.getElementById('rack');
const statusEl = document.getElementById('status');
const hostEl = document.getElementById('host');
const explainEl = document.getElementById('explain');

const slots = new Map(); // n -> { data, el, controls: Map(key -> control) }
let ws = null;
let bridgeStatus = 'offline';

// ---------- preferences ----------
function pref(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v == null ? fallback : v;
  } catch {
    return fallback;
  }
}
function savePref(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}
hostEl.value = pref('wing.host', '');
explainEl.checked = pref('wing.explain', '1') === '1';
document.body.classList.toggle('explain', explainEl.checked);
explainEl.addEventListener('change', () => {
  document.body.classList.toggle('explain', explainEl.checked);
  savePref('wing.explain', explainEl.checked ? '1' : '0');
});

// ---------- effect families (for colour) ----------
const FAMILY = {
  reverb: ['HALL', 'ROOM', 'CHAMBER', 'PLATE', 'CONCERT', 'AMBI', 'V-ROOM', 'V-REV', 'V-PLATE', 'GATED', 'REVERSE', 'SHIMMER', 'SPRING', 'VSS3', 'BPLATE', 'DEL/REV'],
  delay: ['ST-DL', 'TAP-DL', 'TAPE-DL', 'OILCAN', 'BBD-DL'],
  mod: ['DIMCRS', 'CHORUS', 'FLANGER', 'ROTARY', 'PHASER', 'PANNER', 'MOOD', 'DOUBLE'],
  pitch: ['PITCH', 'D-PITCH', 'PCORR', 'SUB', 'SUB-M', 'P-BASS'],
  eq: ['GEQ', 'PIA', 'SOUL', 'E88', 'E84', 'F110', 'PULSAR', 'MACH4', 'DEQ3', 'ENHANCE', 'EXCITER', 'V-IMG', 'BODY', 'SPKMAN'],
  dyn: ['LIMITER', 'DE-S2', 'C5-CMB', 'TAPE'],
  amp: ['RACKAMP', 'UKROCK', 'ANGEL', 'JAZZC', 'DELUXE'],
  strip: ['*EVEN*', '*SOUL*', '*VINTAGE*', '*BUS*', '*MASTER*'],
};
function family(model) {
  for (const [f, list] of Object.entries(FAMILY)) if (list.includes(model)) return f;
  return 'other';
}

// ---------- value scales ----------
function faderPos(db) {
  if (db <= -90) return 0;
  if (db < -60) return (db + 90) / 480;
  if (db < -30) return (db + 70) / 160;
  if (db < -10) return (db + 50) / 80;
  return Math.min(1, (db + 30) / 40);
}
function faderDb(p) {
  if (p <= 0) return -144;
  if (p < 0.0625) return p * 480 - 90;
  if (p < 0.25) return p * 160 - 70;
  if (p < 0.5) return p * 80 - 50;
  return p * 40 - 30;
}

/** A scale maps a real value to a 0..1 bar position and back, snapping to the console's steps. */
function makeScale(def) {
  const { type } = def;
  const min = def.min ?? 0;
  const max = def.max ?? 1;
  const clamp = (p) => Math.min(1, Math.max(0, p));
  if (type === 'fader') {
    return { pos: faderPos, val: (p) => Math.round(faderDb(clamp(p)) * 10) / 10, min: -144, max: 10, step: 0.1 };
  }
  const log = type === 'logf' && min > 0 && max > 0;
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  const steps = type === 'int' ? Math.abs(max - min) + 1 : def.steps || 201;
  const snap = (p) => Math.round(clamp(p) * (steps - 1)) / (steps - 1);
  const raw = (p) => (log ? min * Math.pow(max / min, p) : min + (max - min) * p);
  const pos = (v) => clamp(log ? Math.log(v / min) / Math.log(max / min) : (v - min) / (max - min || 1));
  return {
    pos,
    val: (p) => {
      const v = raw(snap(p));
      return type === 'int' ? Math.round(v) : +v.toPrecision(5);
    },
    min: lo,
    max: hi,
    stepPos: 1 / (steps - 1),
    bipolar: lo < 0 && hi > 0,
  };
}

function formatValue(v, def) {
  if (typeof v === 'string') return v;
  if (v == null || Number.isNaN(v)) return '–';
  const unit = def?.unit || '';
  if (def?.type === 'fader' || unit === 'dB') {
    if (v <= -144) return '-∞ dB';
    return `${v > 0 ? '+' : ''}${v.toFixed(1)} dB`;
  }
  if (unit === 'Hz') {
    if (v >= 1000) return `${(v / 1000).toFixed(v >= 10000 ? 1 : 2)} kHz`;
    return `${v >= 100 ? Math.round(v) : +v.toFixed(1)} Hz`;
  }
  let digits = 0;
  if (def?.type !== 'int') {
    const span = Math.abs((def?.max ?? 1) - (def?.min ?? 0));
    const step = span / ((def?.steps || 101) - 1);
    digits = step >= 1 ? 0 : step >= 0.1 ? 1 : 2;
  }
  const text = v.toFixed(digits);
  if (unit === 'ms' && v >= 1000) return `${(v / 1000).toFixed(2)} s`;
  return unit ? `${text}${unit === '%' ? '' : ' '}${unit}` : text;
}

// ---------- talking to the bridge ----------
const pending = new Map();
function send(obj) {
  if (ws && ws.readyState === 1) ws.send(JSON.stringify(obj));
}
/** Sends at most ~25 changes per second per control while dragging; always sends the last one. */
function sendValue(n, key, value) {
  const id = `${n}/${key}`;
  const entry = pending.get(id);
  if (entry) {
    entry.value = value;
    return;
  }
  send({ t: 'set', n, key, value });
  const e = { value };
  pending.set(id, e);
  setTimeout(() => {
    pending.delete(id);
    if (e.value !== value) send({ t: 'set', n, key, value: e.value });
  }, 40);
}

function setStatus(status, text, title) {
  bridgeStatus = status;
  statusEl.className = `status ${status}`;
  statusEl.querySelector('span').textContent = text;
  statusEl.title = title || '';
}

function connectBridge() {
  if (location.protocol === 'file:') {
    setStatus('nobridge', 'Start the bridge', 'Run "node bridge.js" and open http://localhost:8080');
    return;
  }
  ws = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}`);
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.t === 'status') onStatus(msg);
    else if (msg.t === 'slot') renderSlot(msg);
    else if (msg.t === 'val') updateValue(msg);
    else if (msg.t === 'reset') resetRack();
  };
  ws.onopen = () => setStatus('connecting', 'Bridge connected');
  ws.onclose = () => {
    setStatus('nobridge', 'Bridge not running', 'Start it with "node bridge.js", then this page reconnects by itself');
    setTimeout(connectBridge, 2000);
  };
}

let autoConnected = false;
function onStatus(s) {
  const target = s.demo ? 'demo console' : s.target;
  if (s.status === 'online') setStatus('online', s.console ? `Connected: ${s.console}` : `Connected to ${target}`);
  else if (s.status === 'connecting') setStatus('connecting', `Connecting to ${target}…`, s.detail || '');
  else if (s.status === 'error') setStatus('error', 'Network error', s.detail || '');
  else {
    setStatus('offline', 'Not connected to a console');
    const saved = pref('wing.host', '');
    if (!autoConnected && saved) {
      autoConnected = true;
      send({ t: 'connect', host: saved });
    }
  }
  if (s.target && s.target !== 'demo') hostEl.value = s.target;
}

document.getElementById('connect-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const host = hostEl.value.trim();
  if (!host) return hostEl.focus();
  savePref('wing.host', host);
  send({ t: 'connect', host });
});
document.getElementById('demo-btn').addEventListener('click', () => send({ t: 'connect', host: 'demo' }));
document.getElementById('refresh').addEventListener('click', () => send({ t: 'refresh' }));

// ---------- rack ----------
function resetRack() {
  slots.clear();
  rackEl.innerHTML = '';
  for (let n = 1; n <= 16; n++) renderSlot({ n, model: null, params: [], loading: true });
}

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

function renderSlot(data) {
  let slot = slots.get(data.n);
  if (!slot) {
    slot = { el: el('section', 'slot'), controls: new Map() };
    slots.set(data.n, slot);
    // keep slots in order
    const after = [...slots.keys()].filter((k) => k > data.n).sort((a, b) => a - b)[0];
    rackEl.insertBefore(slot.el, after ? slots.get(after).el : null);
  }
  slot.data = data;
  slot.controls.clear();
  const { n, model } = data;
  const fam = model ? family(model) : 'other';
  const root = slot.el;
  root.className = `slot cat-${fam}${!model || model === 'NONE' ? ' empty' : ''}`;
  root.innerHTML = '';

  // header: number, tier, model picker
  const head = el('div', 'slot-head');
  head.append(el('span', 'slot-no', `FX ${n}`), el('span', 'slot-tier', n <= 8 ? 'Premium' : 'Standard'));
  const select = el('select', 'model');
  select.title = 'Load a different effect in this slot';
  const list = n <= 8 ? PREMIUM_MODELS : STANDARD_MODELS;
  if (!model) select.append(new Option('…', ''));
  for (const m of list) select.append(new Option(`${FX_CATALOG[m]?.name || m}`, m));
  if (model && !list.includes(model)) select.append(new Option(model, model));
  select.value = model || '';
  select.addEventListener('change', () => {
    send({ t: 'set', n, key: 'mdl', value: select.value });
    root.querySelector('.params')?.replaceChildren(el('div', 'loading', 'Loading effect…'));
  });
  head.append(select);
  root.append(head);

  const meta = el('div', 'slot-meta');
  const ins = el('span', `ins${data.chn ? ' on' : ''}`, insertLabel(data.chn, data.pos));
  meta.append(ins, el('span', 'code', model && model !== 'NONE' ? model : ''));
  root.append(meta);
  if (model) root.append(el('div', 'slot-desc', MODEL_INFO[model] || ''));

  if (!model) {
    root.append(el('div', 'loading', 'Reading slot…'));
    return;
  }
  if (model === 'NONE') return;

  const mixRow = el('div', 'mixrow');
  const mixDef = { type: 'linf', min: 0, max: 100, steps: 101, unit: '%', label: 'FX mix' };
  mixRow.append(makeControl(n, 'fxmix', mixDef, data.mix, 'Wet/dry balance of the whole slot'));
  root.append(mixRow);

  const params = el('div', 'params');
  if (!data.params.length) params.append(el('div', 'loading', data.loading ? 'Reading parameters…' : 'No adjustable parameters'));
  for (const p of data.params) {
    const def = FX_CATALOG[model]?.params.find((d) => d.key === p.key);
    params.append(makeControl(n, p.key, def, p.value));
  }
  root.append(params);
}

function updateValue({ n, key, value }) {
  const ctl = slots.get(n)?.controls.get(key);
  if (ctl) ctl.set(value);
  const p = slots.get(n)?.data.params.find((x) => x.key === key);
  if (p) p.value = value;
  if (key === 'fxmix' && slots.get(n)) slots.get(n).data.mix = value;
}

// ---------- controls ----------
function makeControl(n, key, def, value, hintText) {
  const slot = slots.get(n);
  const label = def?.label === 'FX mix' ? 'FX mix' : paramLabel(key, def);
  const box = el('div', 'ctl');
  const top = el('div', 'ctl-top');
  const name = el('span', 'ctl-name', label);
  const val = el('span', 'ctl-val');
  name.title = `${label} (${key})`;
  top.append(name, val);
  box.append(top);
  const hint = hintText || paramHint(key, label);

  let control;
  if (!def) {
    // Not in the documentation: show what the console reports, read only.
    control = { set: (v) => (val.textContent = formatValue(typeof v === 'number' ? +v.toFixed(2) : v, null)) };
    box.append(el('div', 'readonly hint', 'Shown as reported by the console'));
  } else if (def.type === 'str' || def.type === 'flt') {
    const pick = el('select', 'pick');
    for (const o of def.options || []) pick.append(new Option(o + (def.unit && def.unit !== '%' ? ` ${def.unit}` : ''), o));
    pick.addEventListener('change', () => {
      const v = def.type === 'flt' ? Number(pick.value) : pick.value;
      val.textContent = '';
      sendValue(n, key, v);
    });
    box.append(pick);
    control = {
      set: (v) => {
        const s = String(v);
        const match = (def.options || []).find((o) => o === s || (def.type === 'flt' && Number(o) === Number(v)));
        if (match == null && s && ![...pick.options].some((o) => o.value === s)) pick.append(new Option(s, s));
        pick.value = match ?? s;
        val.textContent = '';
      },
    };
  } else if (def.type === 'int' && def.min === 0 && def.max === 1) {
    const btn = el('button', 'toggle');
    btn.type = 'button';
    let on = false;
    btn.addEventListener('click', () => {
      on = !on;
      control.set(on ? 1 : 0);
      sendValue(n, key, on ? 1 : 0);
    });
    box.append(btn);
    control = {
      set: (v) => {
        on = Number(v) > 0.5;
        btn.classList.toggle('on', on);
        btn.textContent = on ? 'On' : 'Off';
        val.textContent = '';
      },
    };
  } else {
    control = makeBar(box, val, def, (v) => sendValue(n, key, v));
  }
  if (hint) box.append(el('div', 'hint', hint));
  control.set(value);
  slot.controls.set(key, control);
  return box;
}

function makeBar(box, valEl, def, onChange) {
  const scale = makeScale(def);
  const bar = el('div', 'bar');
  bar.tabIndex = 0;
  bar.setAttribute('role', 'slider');
  const fill = el('div', 'fill');
  bar.append(fill);
  if (scale.bipolar) {
    const z = el('div', 'zero');
    z.style.left = `${scale.pos(0) * 100}%`;
    bar.append(z);
  }
  box.append(bar);

  let value = null;
  let pos = 0;
  let dragging = false;

  function show(v) {
    value = v;
    pos = typeof v === 'number' ? scale.pos(v) : 0;
    if (scale.bipolar) {
      const z = scale.pos(0);
      fill.style.left = `${Math.min(z, pos) * 100}%`;
      fill.style.width = `${Math.abs(pos - z) * 100}%`;
    } else {
      fill.style.left = '0';
      fill.style.width = `${pos * 100}%`;
    }
    valEl.textContent = formatValue(v, def);
    bar.setAttribute('aria-valuetext', valEl.textContent);
  }
  function change(p) {
    const v = scale.val(p);
    pos = p;
    if (v !== value) {
      show(v);
      pos = p; // keep sub-step drag motion
      onChange(v);
    }
  }

  // drag relative to where you grab, so touching a bar never jumps the value
  let startX = 0;
  let startPos = 0;
  bar.addEventListener('pointerdown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    dragging = true;
    startX = e.clientX;
    startPos = pos;
    bar.setPointerCapture(e.pointerId);
    bar.classList.add('dragging');
  });
  bar.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const width = bar.getBoundingClientRect().width || 1;
    const fine = e.shiftKey ? 0.2 : 1;
    change(Math.min(1, Math.max(0, startPos + ((e.clientX - startX) / width) * fine)));
  });
  const end = () => {
    dragging = false;
    bar.classList.remove('dragging');
  };
  bar.addEventListener('pointerup', end);
  bar.addEventListener('pointercancel', end);

  const nudge = (dir, big) => {
    const step = (scale.stepPos || 0.005) * (big ? 10 : 1);
    change(Math.min(1, Math.max(0, pos + dir * step)));
  };
  bar.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      nudge(e.deltaY < 0 || e.deltaX > 0 ? 1 : -1, false);
    },
    { passive: false }
  );
  bar.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') nudge(1, e.shiftKey);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') nudge(-1, e.shiftKey);
    else if (e.key === 'Enter') typeIn();
    else return;
    e.preventDefault();
  });

  // double-click to type an exact value
  function typeIn() {
    const input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'decimal';
    input.value = typeof value === 'number' ? String(+value.toFixed(3)) : '';
    bar.append(input);
    input.focus();
    input.select();
    let done = false;
    const finish = (commit) => {
      if (done) return;
      done = true;
      if (commit) {
        let t = input.value.trim().toLowerCase().replace(',', '.');
        let mult = 1;
        if (/k(hz)?$/.test(t)) {
          mult = 1000;
          t = t.replace(/k(hz)?$/, '');
        }
        const num = parseFloat(t) * mult;
        if (!Number.isNaN(num)) {
          const clamped = Math.min(scale.max, Math.max(scale.min, num));
          change(scale.pos(clamped));
          // land exactly on the typed value when it is a valid step
          if (Math.abs(scale.val(scale.pos(clamped)) - clamped) > 1e-6 && def.type !== 'int') {
            show(scale.val(scale.pos(clamped)));
          }
        }
      }
      input.remove();
      bar.focus();
    };
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') finish(true);
      if (e.key === 'Escape') finish(false);
      e.stopPropagation();
    });
    input.addEventListener('blur', () => finish(true));
  }
  bar.addEventListener('dblclick', typeIn);

  return {
    set: (v) => {
      if (dragging) return; // don't fight the hand on the bar
      show(typeof v === 'string' && !Number.isNaN(Number(v)) ? Number(v) : v);
    },
  };
}

resetRack();
connectBridge();
