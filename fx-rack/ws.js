// A tiny WebSocket server (text messages only), so the bridge needs no npm packages.
import crypto from 'node:crypto';

const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

export function attachWebSocket(httpServer, onConnection) {
  httpServer.on('upgrade', (req, socket) => {
    const key = req.headers['sec-websocket-key'];
    if (!key || (req.headers.upgrade || '').toLowerCase() !== 'websocket') {
      socket.destroy();
      return;
    }
    const accept = crypto.createHash('sha1').update(key + GUID).digest('base64');
    socket.write(
      'HTTP/1.1 101 Switching Protocols\r\n' +
        'Upgrade: websocket\r\nConnection: Upgrade\r\n' +
        `Sec-WebSocket-Accept: ${accept}\r\n\r\n`
    );
    socket.setNoDelay(true);
    onConnection(new Client(socket));
  });
}

class Client {
  constructor(socket) {
    this.socket = socket;
    this.open = true;
    this.handlers = { message: [], close: [] };
    this.buffer = Buffer.alloc(0);
    this.fragments = [];
    socket.on('data', (d) => this.#onData(d));
    socket.on('close', () => this.#closed());
    socket.on('error', () => this.#closed());
  }

  on(event, fn) {
    this.handlers[event].push(fn);
  }

  send(text) {
    if (!this.open) return;
    const payload = Buffer.from(text, 'utf8');
    this.#writeFrame(0x1, payload);
  }

  #writeFrame(opcode, payload) {
    let header;
    if (payload.length < 126) {
      header = Buffer.from([0x80 | opcode, payload.length]);
    } else if (payload.length < 65536) {
      header = Buffer.alloc(4);
      header[0] = 0x80 | opcode;
      header[1] = 126;
      header.writeUInt16BE(payload.length, 2);
    } else {
      header = Buffer.alloc(10);
      header[0] = 0x80 | opcode;
      header[1] = 127;
      header.writeBigUInt64BE(BigInt(payload.length), 2);
    }
    this.socket.write(Buffer.concat([header, payload]));
  }

  #closed() {
    if (!this.open) return;
    this.open = false;
    this.socket.destroy();
    this.handlers.close.forEach((fn) => fn());
  }

  #onData(data) {
    this.buffer = Buffer.concat([this.buffer, data]);
    while (this.buffer.length >= 2) {
      const b0 = this.buffer[0];
      const b1 = this.buffer[1];
      const fin = (b0 & 0x80) !== 0;
      const opcode = b0 & 0x0f;
      const masked = (b1 & 0x80) !== 0;
      let len = b1 & 0x7f;
      let pos = 2;
      if (len === 126) {
        if (this.buffer.length < 4) return;
        len = this.buffer.readUInt16BE(2);
        pos = 4;
      } else if (len === 127) {
        if (this.buffer.length < 10) return;
        len = Number(this.buffer.readBigUInt64BE(2));
        pos = 10;
      }
      const maskLen = masked ? 4 : 0;
      if (this.buffer.length < pos + maskLen + len) return;
      const mask = masked ? this.buffer.subarray(pos, pos + 4) : null;
      const payload = Buffer.from(this.buffer.subarray(pos + maskLen, pos + maskLen + len));
      if (mask) for (let i = 0; i < payload.length; i++) payload[i] ^= mask[i & 3];
      this.buffer = this.buffer.subarray(pos + maskLen + len);

      if (opcode === 0x8) {
        this.#writeFrame(0x8, Buffer.alloc(0));
        this.#closed();
        return;
      }
      if (opcode === 0x9) {
        this.#writeFrame(0xa, payload);
        continue;
      }
      if (opcode === 0xa) continue;
      if (opcode === 0x1 || opcode === 0x0) {
        this.fragments.push(payload);
        if (fin) {
          const text = Buffer.concat(this.fragments).toString('utf8');
          this.fragments = [];
          this.handlers.message.forEach((fn) => fn(text));
        }
      }
    }
  }
}
