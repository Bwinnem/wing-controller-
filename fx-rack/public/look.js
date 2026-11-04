// Faceplate colours per effect, in the spirit of each unit's panel on the WING's FX screen.
// face = panel colour, ink = text on the panel, knob = knob body, arc = value ring.
const P = (face, ink, knob, arc) => ({ face, ink, knob, arc });

const CREAM = P('#e4dfcf', '#2a2622', '#2b2b2b', '#c8372d');
const SILVER = P('#c4c6c3', '#1d1d1d', '#1e1e1e', '#e0662a');
const BLACK = P('#1b1c1b', '#d8d8d2', '#3a3b3a', '#e2412f');

export const FACEPLATES = {
  NONE: P('#0d0d0d', '#666', '#222', '#444'),
  EXT: P('#202224', '#cfd3d6', '#3a3d40', '#3c9ae4'),
  HALL: CREAM, ROOM: CREAM, CHAMBER: CREAM, PLATE: CREAM, CONCERT: CREAM, AMBI: CREAM,
  VSS3: SILVER,
  'V-ROOM': P('#2c2629', '#e9e2e4', '#141214', '#e5342b'),
  'V-REV': P('#1f1f1e', '#e6e6e0', '#0e0e0e', '#e5342b'),
  'V-PLATE': P('#9c9d99', '#151515', '#171717', '#d33a2c'),
  BPLATE: P('#1e46c2', '#eef3ff', '#0f1a3a', '#7fe3ff'),
  GATED: P('#0e0f0e', '#cfe9cf', '#2b2c2b', '#39e06d'),
  REVERSE: P('#262825', '#d9dbd5', '#101110', '#39e06d'),
  'DEL/REV': P('#1c2226', '#d9e4ea', '#0d1012', '#3ab0ff'),
  SHIMMER: P('#141a52', '#e8e6ff', '#2b2370', '#b48cff'),
  SPRING: P('#eef0ec', '#1e231d', '#1d1f1c', '#3b8f45'),
  DIMCRS: P('#171b1f', '#e7dcc4', '#2b3036', '#e9d4a2'),
  CHORUS: P('#16b3bf', '#06292c', '#1b1b1b', '#ffffff'),
  FLANGER: P('#cfa22e', '#2a1f08', '#efe6cf', '#3e261f'),
  'ST-DL': P('#2a8a3c', '#eaffee', '#141414', '#d7ffd9'),
  'TAP-DL': P('#2c2e31', '#e8e8e8', '#151617', '#f0c43a'),
  'TAPE-DL': P('#1d2119', '#e2e0d2', '#dcd8c8', '#f0a43a'),
  OILCAN: P('#c3c4c1', '#1e1b19', '#121212', '#b0442c'),
  'BBD-DL': P('#a41bd4', '#fbeaff', '#1a1a1a', '#ffffff'),
  PITCH: P('#1c2a3f', '#dbe7f7', '#0c121c', '#4db3ff'),
  'D-PITCH': SILVER,
  GEQ: P('#3a4156', '#e3e8f4', '#1d2130', '#f2c443'),
  PIA: P('#1a221f', '#e7e3c8', '#0d1210', '#e6d24c'),
  SPKMAN: P('#1c293a', '#dbe6f2', '#0e1520', '#4fa4ff'),
  DEQ3: P('#3e3d31', '#ecead7', '#1a1a14', '#e3c04f'),
  'C5-CMB': P('#262823', '#e6e0c6', '#121310', '#e0b546'),
  LIMITER: P('#d0d2cf', '#1b1b1b', '#262626', '#d64a2a'),
  'DE-S2': P('#c3c4c0', '#0f0f0f', '#0b0b0b', '#2f8de4'),
  ENHANCE: P('#c49a5c', '#2a1c0c', '#2a1d10', '#fff1d4'),
  EXCITER: P('#d6d7d5', '#1b1b1b', '#1f8f43', '#1f8f43'),
  'P-BASS': P('#0b0f27', '#cfd8ff', '#1c2347', '#5a7dff'),
  SUB: P('#74433c', '#f3e6dd', '#e8e8e2', '#ff6b4f'),
  'SUB-M': P('#62717e', '#f0f4f7', '#232a30', '#bfe3ff'),
  'V-IMG': P('#6e071f', '#ffe6ec', '#2a020b', '#ffb3c4'),
  DOUBLE: P('#121212', '#f2f2f2', '#2a2a2a', '#f39a2e'),
  PCORR: P('#242725', '#dfe5e1', '#0f1110', '#2ed3b7'),
  ROTARY: P('#533327', '#f1e3d4', '#1e1410', '#e9b56a'),
  PHASER: P('#36434d', '#e7eef3', '#e57a2c', '#ffb36b'),
  PANNER: P('#172637', '#e6ded6', '#7d6f67', '#f0c08a'),
  TAPE: P('#6f6e69', '#f5f4ec', '#d5d5ca', '#e8b44a'),
  MOOD: P('#262826', '#e1e8ea', '#455155', '#4ab7ff'),
  BODY: P('#34302b', '#efe5d8', '#111312', '#d9a14f'),
  RACKAMP: P('#555b46', '#f0eedd', '#2e2c26', '#d9c46a'),
  UKROCK: P('#141512', '#e9dfac', '#2b2a24', '#d7c26b'),
  ANGEL: P('#1b1c1a', '#f2f2f2', '#2f302e', '#e94b3c'),
  JAZZC: P('#232523', '#e8e8e8', '#c9c9c9', '#7cc4ff'),
  DELUXE: P('#262726', '#efe9d8', '#b5b2a8', '#e9c46a'),
  SOUL: P('#49494a', '#efefef', '#1e1e20', '#ff6a3d'),
  E88: P('#222b29', '#e0ebe7', '#2f5c9e', '#7fb2ff'),
  E84: P('#2d3339', '#e5eaef', '#b23a3a', '#ff7a7a'),
  F110: P('#acaea9', '#0e1959', '#0e1959', '#2a46d6'),
  PULSAR: P('#3e4b54', '#e9eef1', '#151b1f', '#e6c35a'),
  MACH4: P('#3d9be5', '#06213a', '#0e2f4f', '#ffffff'),
  '*EVEN*': P('#1a201e', '#dfe8e4', '#2d6db5', '#7fc0ff'),
  '*SOUL*': P('#1b1c22', '#e8e8ef', '#5f605e', '#ff8a4a'),
  '*VINTAGE*': P('#404e56', '#edf2f4', '#141a1d', '#ff6a5c'),
  '*BUS*': P('#1e2122', '#e6eaee', '#33383f', '#f2c443'),
  '*MASTER*': P('#3c9ae4', '#04213b', '#0d2f50', '#ffffff'),
};

export function faceplate(model) {
  return FACEPLATES[model] || BLACK;
}

// The one control shown big on the rack tile, like the console's overview.
const MAIN_KEYS = ['dcy', 'time', 'semi', 'tilt', 'wid', 'drv', 'thr', 'gin', 'gain', 'g', 'mix', 'spd', 'rate', 'f'];
export function mainParam(params, numericKeys) {
  for (const k of MAIN_KEYS) if (numericKeys.has(k) && params.some((p) => p.key === k)) return k;
  return params.find((p) => numericKeys.has(p.key))?.key || null;
}
