import { FX_CATALOG, PREMIUM_MODELS, STANDARD_MODELS } from './catalog.js';
import { MODEL_INFO, paramLabel, paramHint } from './help.js';
import { faceplate, mainParam } from './look.js';

const rackEl = document.getElementById('rack');
const statusEl = document.getElementById('status');
const hostEl = document.getElementById('host');
const explainEl = document.getElementById('explain');
const allParamsEl = document.getElementById('allparams');

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
allParamsEl.checked = pref('wing.allparams', '1') === '1';
document.body.classList.toggle('overview', !allParamsEl.checked);
allParamsEl.addEventListener('change', () => {
  document.body.classList.toggle('overview', !allParamsEl.checked);
  savePref('wing.allparams', allParamsEl.checked ? '1' : '0');
});
explainEl.addEventListener('change', () => {
  document.body.classList.toggle('explain', explainEl.checked);
  savePref('wing.explain', explainEl.checked ? '1' : '0');
});

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
// Same order as the console's EFFECTS screen: FX 1-4 down the first column,
// 5-8 the second (premium), 9-12 and 13-16 the right half (standard).
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

/** "BUS 4", "CH 12", "MAIN 1"… from $a_chn (assumed order: 1-40 ch, 41-48 aux, 49-64 bus, 65-68 main, 69-76 mtx). */
function insertShort(chn) {
  if (!chn) return '';
  const ranges = [[40, 'CH', 0], [48, 'AUX', 40], [64, 'BUS', 48], [68, 'MAIN', 64], [76, 'MTX', 68]];
  const r = ranges.find(([max]) => chn <= max);
  return r ? `${r[1]} ${chn - r[2]}` : `#${chn}`;
}

function modelSelect(n, model) {
  const select = el('select', 'model');
  select.title = 'Load a different effect in this slot';
  const list = n <= 8 ? PREMIUM_MODELS : STANDARD_MODELS;
  if (!model) select.append(new Option('…', ''));
  for (const m of list) select.append(new Option(m === 'NONE' ? '— Empty —' : FX_CATALOG[m]?.name || m, m));
  if (model && !list.includes(model)) select.append(new Option(model, model));
  select.value = model || '';
  select.addEventListener('change', () => {
    send({ t: 'set', n, key: 'mdl', value: select.value });
    slots.get(n).el.querySelector('.panel-params')?.replaceChildren(el('div', 'loading', 'Loading effect…'));
  });
  return select;
}

function addControl(slot, key, control) {
  if (!slot.controls.has(key)) slot.controls.set(key, []);
  slot.controls.get(key).push(control);
}

function renderSlot(data) {
  let slot = slots.get(data.n);
  if (!slot) {
    slot = { el: el('section', 'slot'), controls: new Map() };
    slots.set(data.n, slot);
    const after = [...slots.keys()].filter((k) => k > data.n).sort((a, b) => a - b)[0];
    rackEl.insertBefore(slot.el, after ? slots.get(after).el : null);
  }
  slot.data = data;
  slot.controls.clear();
  const { n, model } = data;
  const empty = !model || model === 'NONE';
  const look = faceplate(model || 'NONE');
  const root = slot.el;
  root.className = `slot ${n <= 8 ? 'premium' : 'standard'}${empty ? ' empty' : ''}`;
  for (const [k, v] of Object.entries(look)) root.style.setProperty(`--${k}`, v);
  root.innerHTML = '';

  const tile = el('div', 'tile');
  tile.append(el('span', 'num', String(n)));
  root.append(tile);

  if (empty) {
    const plus = el('div', 'plus');
    plus.append(el('span', 'plus-ring', '+'), el('span', 'plus-text', model ? `FX ${n}: empty` : 'Reading…'));
    const pick = modelSelect(n, model);
    pick.classList.add('overlay');
    tile.append(plus, pick, meterEl());
    return;
  }

  // left column: model tag, FX glyph, insert, PRE/POST, ON
  const side = el('div', 'side');
  side.append(el('div', 'tag', model), el('div', 'glyph', 'FX'));
  side.append(el('div', 'ins', insertShort(data.chn) || ' '));
  const pp = el('div', 'prepost');
  const pre = el('span', 'pre', 'PRE');
  const post = el('span', 'post', 'POST');
  if (data.chn) (data.pos ? post : pre).classList.add('lit');
  pp.append(pre, post);
  pp.title = data.chn ? `Inserted ${data.pos ? 'post' : 'pre'} on ${insertShort(data.chn)}` : 'Not inserted on any channel';
  const on = el('div', `on${data.chn ? ' lit' : ''}`, 'ON');
  on.title = pp.title;
  side.append(pp, on);

  // faceplate with the effect picker
  const plate = el('div', 'plate');
  plate.append(modelSelect(n, model));
  const deco = el('div', 'deco');
  for (let i = 0; i < 5; i++) deco.append(el('i'));
  plate.append(deco);

  const centre = el('div', 'centre');
  centre.append(plate);

  // big knob for the effect's main parameter
  const defs = new Map((FX_CATALOG[model]?.params || []).map((d) => [d.key, d]));
  const numeric = new Set(
    data.params.filter((p) => isKnob(defs.get(p.key))).map((p) => p.key)
  );
  const mainKey = mainParam(data.params, numeric);
  if (mainKey) {
    const def = defs.get(mainKey);
    const value = data.params.find((p) => p.key === mainKey)?.value;
    centre.append(knobControl(slot, n, mainKey, def, value, { size: 44, big: true }));
  }
  tile.append(side, centre, meterEl());

  // full panel: description, slot mix and every parameter
  const panel = el('div', 'panel');
  panel.append(el('div', 'desc', MODEL_INFO[model] || ''));
  const grid = el('div', 'panel-params');
  const mixDef = { type: 'linf', min: 0, max: 100, steps: 101, unit: '%', label: 'FX mix' };
  grid.append(knobControl(slot, n, 'fxmix', mixDef, data.mix, { hint: 'Wet/dry balance of the whole slot', label: 'FX mix' }));
  if (!data.params.length) grid.append(el('div', 'loading', data.loading ? 'Reading parameters…' : 'No adjustable parameters'));
  for (const p of data.params) grid.append(makeControl(slot, n, p.key, defs.get(p.key), p.value));
  panel.append(grid);
  root.append(panel);
}

function meterEl() {
  const m = el('div', 'meter');
  m.title = 'Level meter (not sent over OSC)';
  for (let i = 0; i < 2; i++) {
    const col = el('div', 'meter-col');
    for (let j = 0; j < 10; j++) col.append(el('i'));
    m.append(col);
  }
  return m;
}

function updateValue({ n, key, value }) {
  const slot = slots.get(n);
  if (!slot) return;
  for (const c of slot.controls.get(key) || []) c.set(value);
  const p = slot.data.params.find((x) => x.key === key);
  if (p) p.value = value;
  if (key === 'fxmix') slot.data.mix = value;
}

// ---------- controls ----------
function isKnob(def) {
  return def && !(def.type === 'str' || def.type === 'flt') && !(def.type === 'int' && def.min === 0 && def.max === 1);
}

function makeControl(slot, n, key, def, value) {
  if (isKnob(def)) return knobControl(slot, n, key, def, value);
  const label = paramLabel(key, def);
  const box = el('div', 'ctl');
  box.append(el('div', 'ctl-name', label));
  let control;
  if (!def) {
    const ro = el('div', 'lcd');
    box.append(ro);
    control = { set: (v) => (ro.textContent = formatValue(typeof v === 'number' ? +v.toFixed(2) : v, null)) };
    box.title = 'Shown as reported by the console';
  } else if (def.type === 'str' || def.type === 'flt') {
    const pick = el('select', 'lcd pick');
    for (const o of def.options || []) pick.append(new Option(o + (def.unit && def.unit !== '%' ? ` ${def.unit}` : ''), o));
    pick.addEventListener('change', () => sendValue(n, key, def.type === 'flt' ? Number(pick.value) : pick.value));
    box.append(pick);
    control = {
      set: (v) => {
        const s = String(v);
        const match = (def.options || []).find((o) => o === s || (def.type === 'flt' && Number(o) === Number(v)));
        if (match == null && s && ![...pick.options].some((o) => o.value === s)) pick.append(new Option(s, s));
        pick.value = match ?? s;
      },
    };
  } else {
    const btn = el('button', 'switch-btn');
    btn.type = 'button';
    let on = false;
    btn.addEventListener('click', () => {
      control.set(on ? 0 : 1);
      sendValue(n, key, on ? 1 : 0);
    });
    box.append(btn);
    control = {
      set: (v) => {
        on = Number(v) > 0.5;
        btn.classList.toggle('lit', on);
        btn.textContent = on ? 'ON' : 'OFF';
      },
    };
  }
  const hint = paramHint(key, label);
  if (hint) box.append(el('div', 'hint', hint));
  control.set(value);
  addControl(slot, key, control);
  return box;
}

const ARC = 270; // degrees of knob travel, from 7:30 to 4:30 like a hardware pot
function arcPath(r, from, to) {
  const a0 = ((from - 225) * Math.PI) / 180;
  const a1 = ((to - 225) * Math.PI) / 180;
  const x0 = 50 + r * Math.cos(a0);
  const y0 = 50 + r * Math.sin(a0);
  const x1 = 50 + r * Math.cos(a1);
  const y1 = 50 + r * Math.sin(a1);
  return `M${x0.toFixed(2)} ${y0.toFixed(2)}A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

function knobControl(slot, n, key, def, value, opts = {}) {
  const label = opts.label || paramLabel(key, def);
  const box = el('div', `ctl knob-ctl${opts.big ? ' big' : ''}`);
  const knob = el('div', 'knob');
  knob.tabIndex = 0;
  knob.setAttribute('role', 'slider');
  knob.setAttribute('aria-label', label);
  const size = opts.size || 32;
  knob.style.width = knob.style.height = `${size}px`;
  knob.innerHTML =
    '<svg viewBox="0 0 100 100" aria-hidden="true">' +
    `<path class="track" d="${arcPath(44, 0, ARC)}"/>` +
    '<path class="value" d=""/>' +
    '<circle class="body" cx="50" cy="50" r="33"/>' +
    '<line class="pointer" x1="50" y1="50" x2="50" y2="22"/>' +
    '</svg>';
  const text = el('div', 'knob-text');
  const name = el('div', 'ctl-name', label);
  name.title = `${label} (${key})`;
  const val = el('div', 'ctl-val');
  text.append(name, val);
  box.append(knob, text);
  const hint = opts.hint || paramHint(key, label);
  if (hint && !opts.big) box.append(el('div', 'hint', hint));
  if (opts.big) box.title = hint;

  const valuePath = knob.querySelector('.value');
  const pointer = knob.querySelector('.pointer');
  const control = makeDial(knob, def, (v) => sendValue(n, key, v), (pos, bipolarZero, v) => {
    const start = bipolarZero == null ? 0 : bipolarZero * ARC;
    const end = pos * ARC;
    valuePath.setAttribute('d', Math.abs(end - start) < 0.5 ? '' : arcPath(44, Math.min(start, end), Math.max(start, end)));
    pointer.setAttribute('transform', `rotate(${end - 135} 50 50)`);
    val.textContent = formatValue(v, def);
    knob.setAttribute('aria-valuetext', val.textContent);
  });
  control.set(value);
  addControl(slot, key, control);
  return box;
}

/** Drag (up/right raises), wheel, arrow keys and double-click-to-type for a knob. */
function makeDial(knob, def, onChange, draw) {
  const scale = makeScale(def);
  const zero = scale.bipolar ? scale.pos(0) : null;
  let value = null;
  let pos = 0;
  let dragging = false;

  function show(v) {
    value = v;
    pos = typeof v === 'number' ? scale.pos(v) : 0;
    draw(pos, zero, v);
  }
  function change(p) {
    const v = scale.val(p);
    if (v !== value) {
      show(v);
      onChange(v);
    }
    pos = p; // keep sub-step motion while dragging
  }

  let startX = 0;
  let startY = 0;
  let startPos = 0;
  knob.addEventListener('pointerdown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startPos = pos;
    knob.setPointerCapture(e.pointerId);
    knob.classList.add('dragging');
    e.preventDefault();
  });
  knob.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const fine = e.shiftKey ? 0.2 : 1;
    const travel = (e.clientX - startX - (e.clientY - startY)) / 180;
    change(Math.min(1, Math.max(0, startPos + travel * fine)));
  });
  const end = () => {
    dragging = false;
    knob.classList.remove('dragging');
  };
  knob.addEventListener('pointerup', end);
  knob.addEventListener('pointercancel', end);

  const nudge = (dir, big) => change(Math.min(1, Math.max(0, pos + dir * (scale.stepPos || 0.005) * (big ? 10 : 1))));
  knob.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      nudge(e.deltaY < 0 ? 1 : -1, false);
    },
    { passive: false }
  );
  knob.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') nudge(1, e.shiftKey);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') nudge(-1, e.shiftKey);
    else if (e.key === 'Enter') typeIn();
    else return;
    e.preventDefault();
  });

  function typeIn() {
    const box = knob.parentElement;
    const input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'decimal';
    input.className = 'type-in';
    input.value = typeof value === 'number' ? String(+value.toFixed(3)) : '';
    box.append(input);
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
        if (!Number.isNaN(num)) change(scale.pos(Math.min(scale.max, Math.max(scale.min, num))));
      }
      input.remove();
      knob.focus();
    };
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') finish(true);
      if (e.key === 'Escape') finish(false);
      e.stopPropagation();
    });
    input.addEventListener('blur', () => finish(true));
  }
  knob.addEventListener('dblclick', typeIn);

  return {
    set: (v) => {
      if (dragging) return; // don't fight the hand on the knob
      show(typeof v === 'string' && !Number.isNaN(Number(v)) ? Number(v) : v);
    },
  };
}

resetRack();
connectBridge();
