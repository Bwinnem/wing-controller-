import test from 'node:test';
import assert from 'node:assert/strict';
import { encode, decode } from '../osc.js';
import { WingRack, oscArgFor } from '../wing.js';
import { DemoTransport } from '../demo-wing.js';

test('OSC round trip', () => {
  const buf = encode('/fx/1/dcy', [{ type: 'f', value: 2.5 }, { type: 's', value: 'abc' }, { type: 'i', value: 3 }]);
  assert.equal(buf.length % 4, 0);
  assert.deepEqual(decode(buf), { address: '/fx/1/dcy', args: [2.5, 'abc', 3] });
  assert.deepEqual(decode(encode('/*S')), { address: '/*S', args: [] });
});

test('argument types follow the documented parameter type', () => {
  assert.deepEqual(oscArgFor('HALL', 'pdel', 20.4), { type: 'i', value: 20 });
  assert.deepEqual(oscArgFor('HALL', 'dcy', 1.5), { type: 'f', value: 1.5 });
  assert.deepEqual(oscArgFor('ST-DL', 'mode', 'X'), { type: 's', value: 'X' });
  assert.deepEqual(oscArgFor('HALL', 'mdl', 'PLATE'), { type: 's', value: 'PLATE' });
});

test('reads all 16 slots from the demo console and changes values', async () => {
  const rack = new WingRack();
  const slots = new Map();
  rack.on('slot', (s) => slots.set(s.n, s));
  rack.attach(new DemoTransport(), 'demo');
  await new Promise((r) => setTimeout(r, 1000));
  assert.equal(rack.status, 'online');
  assert.equal(slots.size, 16);
  assert.equal(slots.get(1).model, 'HALL');
  assert.deepEqual(slots.get(1).params.map((p) => p.key).slice(0, 3), ['pdel', 'size', 'dcy']);
  assert.equal(slots.get(9).params[0].key, 'type'); // GEQ keeps documented order

  rack.set(1, 'mdl', 'PLATE');
  await new Promise((r) => setTimeout(r, 800));
  assert.equal(slots.get(1).model, 'PLATE');
  rack.set(1, 'dcy', 3);
  rack.refreshSlot(1);
  await new Promise((r) => setTimeout(r, 800));
  assert.equal(slots.get(1).params.find((p) => p.key === 'dcy').value, 3);
  rack.detach();
});
