// Minimal OSC 1.0 encoder/decoder for the Behringer WING (messages only; WING never sends bundles).

function padString(str) {
  const bytes = Buffer.from(str + '\0', 'utf8');
  const padded = Buffer.alloc(Math.ceil(bytes.length / 4) * 4);
  bytes.copy(padded);
  return padded;
}

/** args: array of { type: 'i' | 'f' | 's', value } */
export function encode(address, args = []) {
  const parts = [padString(address)];
  // A message without arguments is sent as a bare address: that is how WING
  // expects value queries ("/fx/1/mdl") and the subscribe command ("/*S").
  if (args.length) {
    parts.push(padString(',' + args.map((a) => a.type).join('')));
    for (const a of args) {
      if (a.type === 'i') {
        const b = Buffer.alloc(4);
        b.writeInt32BE(Math.round(a.value));
        parts.push(b);
      } else if (a.type === 'f') {
        const b = Buffer.alloc(4);
        b.writeFloatBE(a.value);
        parts.push(b);
      } else {
        parts.push(padString(String(a.value)));
      }
    }
  }
  return Buffer.concat(parts);
}

function readString(buf, pos) {
  const end = buf.indexOf(0, pos);
  if (end < 0) return null;
  return { value: buf.toString('utf8', pos, end), next: (end + 4) & ~3 };
}

/** Returns { address, args: [values] } or null for anything that is not an OSC message. */
export function decode(buf) {
  const addr = readString(buf, 0);
  if (!addr || !addr.value.startsWith('/')) return null;
  let pos = addr.next;
  const args = [];
  if (pos >= buf.length) return { address: addr.value, args };
  const tags = readString(buf, pos);
  if (!tags || !tags.value.startsWith(',')) return { address: addr.value, args };
  pos = tags.next;
  for (const tag of tags.value.slice(1)) {
    if (tag === 'i') {
      if (pos + 4 > buf.length) break;
      args.push(buf.readInt32BE(pos));
      pos += 4;
    } else if (tag === 'f') {
      if (pos + 4 > buf.length) break;
      args.push(buf.readFloatBE(pos));
      pos += 4;
    } else if (tag === 's' || tag === 'S') {
      const s = readString(buf, pos);
      if (!s) break;
      args.push(s.value);
      pos = s.next;
    } else if (tag === 'b') {
      if (pos + 4 > buf.length) break;
      const size = buf.readInt32BE(pos);
      args.push(buf.subarray(pos + 4, pos + 4 + size));
      pos = (pos + 4 + size + 3) & ~3;
    } else if (tag === 'T') {
      args.push(1);
    } else if (tag === 'F') {
      args.push(0);
    }
  }
  return { address: addr.value, args };
}
