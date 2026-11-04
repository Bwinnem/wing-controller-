#!/usr/bin/env node
// WING FX Rack bridge: serves the web page and relays between the browser
// (WebSocket) and the console (OSC over UDP). Browsers can't send UDP themselves.
//
//   node bridge.js                 start, then type the console's IP in the page
//   node bridge.js 192.168.1.71    connect to that console straight away
//   node bridge.js --demo          pretend console, for trying it out
//   --port 8080                    web page port (default 8080)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { attachWebSocket } from './ws.js';
import { WingRack, UdpTransport } from './wing.js';
import { DemoTransport } from './demo-wing.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(here, 'public');
const argv = process.argv.slice(2);
const portIndex = argv.indexOf('--port');
const port = portIndex >= 0 ? Number(argv[portIndex + 1]) : 8080;
const demo = argv.includes('--demo');
const hostArg = argv.find((a, i) => !a.startsWith('--') && argv[i - 1] !== '--port');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  const rel = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname).replace(/^\/+/, '');
  const file = path.normalize(path.join(publicDir, rel));
  if (!file.startsWith(publicDir + path.sep)) {
    res.writeHead(403).end();
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404).end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  });
});

const rack = new WingRack();
const clients = new Set();
let lastStatus = { status: 'offline', detail: null, console: null, target: null };

function broadcast(obj) {
  const text = JSON.stringify(obj);
  for (const c of clients) c.send(text);
}

rack.on('status', (s) => {
  lastStatus = s;
  broadcast({ t: 'status', ...s, demo: rack.label === 'demo' });
});
rack.on('slot', (slot) => broadcast({ t: 'slot', ...slot }));
rack.on('value', (v) => broadcast({ t: 'val', ...v }));
rack.on('reset', () => broadcast({ t: 'reset' }));

function connectTo(target) {
  if (target === 'demo') {
    rack.attach(new DemoTransport(), 'demo');
  } else {
    rack.attach(new UdpTransport(target), target);
  }
  console.log(`Connecting to ${target === 'demo' ? 'the demo console' : `WING at ${target}`}…`);
}

attachWebSocket(server, (client) => {
  clients.add(client);
  client.send(JSON.stringify({ t: 'status', ...lastStatus, demo: rack.label === 'demo' }));
  for (let n = 1; n <= 16; n++) {
    if (rack.slots[n - 1].model) client.send(JSON.stringify({ t: 'slot', ...rack.snapshot(n) }));
  }
  client.on('message', (text) => {
    let msg;
    try {
      msg = JSON.parse(text);
    } catch {
      return;
    }
    if (msg.t === 'connect' && typeof msg.host === 'string') {
      const host = msg.host.trim();
      if (host === 'demo' || /^[a-zA-Z0-9.\-:]+$/.test(host)) connectTo(host);
    } else if (msg.t === 'disconnect') {
      rack.detach();
    } else if (msg.t === 'set' && Number.isInteger(msg.n) && msg.n >= 1 && msg.n <= 16 && typeof msg.key === 'string') {
      rack.set(msg.n, msg.key, msg.value);
    } else if (msg.t === 'refresh') {
      rack.refreshAll();
    }
  });
  client.on('close', () => clients.delete(client));
});

server.listen(port, () => {
  const ips = Object.values(os.networkInterfaces())
    .flat()
    .filter((i) => i && i.family === 'IPv4' && !i.internal)
    .map((i) => `http://${i.address}:${port}`);
  console.log(`WING FX Rack is running.`);
  console.log(`  Open  http://localhost:${port}  in a browser on this computer`);
  if (ips.length) console.log(`  or    ${ips.join('  ')}  from a tablet on the same network`);
  if (demo) connectTo('demo');
  else if (hostArg) connectTo(hostArg);
  else console.log('  Then type the console\'s IP address in the page (Setup › Network on the WING).');
});
