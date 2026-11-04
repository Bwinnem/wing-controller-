// Plain-language text shown on the rack: what each effect is for and what each control does.

export const MODEL_INFO = {
  NONE: 'Empty slot. Pick an effect to load one.',
  EXT: 'Routes the slot to outboard gear through the console I/O.',
  HALL: 'Large concert-hall reverb with a long, smooth tail.',
  ROOM: 'Small to medium room reverb for natural space.',
  CHAMBER: 'Echo-chamber reverb: dense and warm, good on vocals.',
  PLATE: 'Classic plate reverb: bright and dense, great on vocals and snare.',
  CONCERT: 'Big concert reverb with modulation and separate early reflections.',
  AMBI: 'Short ambience that adds air without an obvious tail.',
  'V-ROOM': 'Vintage digital room reverb (80s rack style).',
  'V-REV': 'Vintage digital hall reverb with a lush, grainy tail.',
  'V-PLATE': 'Vintage plate reverb emulation.',
  GATED: 'Gated reverb: big burst that cuts off sharply (80s drums).',
  REVERSE: 'Reverse reverb: swells in before the sound.',
  'DEL/REV': 'Delay and reverb in one slot, mixable.',
  SHIMMER: 'Reverb with pitch-shifted octaves for an airy, glowing pad.',
  SPRING: 'Spring reverb like a guitar amp: twangy and boingy.',
  DIMCRS: 'Dimension chorus: subtle stereo widening without obvious wobble.',
  CHORUS: 'Stereo chorus: thickens a sound with slightly detuned copies.',
  FLANGER: 'Stereo flanger: sweeping jet-plane comb effect.',
  'ST-DL': 'Stereo delay with separate left/right timing and feedback.',
  'TAP-DL': 'Multi-tap delay with tap tempo.',
  'TAPE-DL': 'Tape echo: warm repeats with wow, flutter and saturation.',
  OILCAN: 'Oil-can delay: dark, wobbly vintage echo.',
  'BBD-DL': 'Bucket-brigade analog delay: dark, lo-fi repeats.',
  PITCH: 'Pitch shifter: moves the sound up or down in semitones.',
  'D-PITCH': 'Dual pitch shifter: two independent voices for harmonies or doubling.',
  VSS3: 'High-end studio reverb with detailed early reflections.',
  BPLATE: 'Blue plate reverb: smooth vintage plate.',
  GEQ: '31-band graphic EQ for room tuning and feedback control.',
  PIA: '10-band musical graphic EQ (API 560 style).',
  DOUBLE: 'Vocal doubler: makes one voice sound like a double-tracked take.',
  PCORR: 'Pitch correction (auto-tune) for vocals.',
  LIMITER: 'Precision limiter: stops peaks going over a ceiling.',
  'DE-S2': 'Two-band de-esser: tames harsh S and T sounds.',
  ENHANCE: 'Enhancer: adds clarity and punch to bass, mids and highs.',
  EXCITER: 'Exciter: adds harmonics for sparkle and presence.',
  'P-BASS': 'Psycho bass: adds low harmonics so bass is heard on small speakers.',
  ROTARY: 'Rotary speaker (Leslie) for organ and keys.',
  PHASER: 'Phaser: swirling, sweeping phase effect.',
  PANNER: 'Tremolo / auto-panner: pulses the volume or moves it left and right.',
  TAPE: 'Tape machine: warm tape saturation and compression.',
  MOOD: 'Mood filter: sweeping filter driven by an LFO or envelope.',
  SUB: 'Sub octaver: adds a synthesized octave below.',
  RACKAMP: 'Guitar amp simulation: rack-style amp and cabinet.',
  UKROCK: 'British rock guitar amp simulation.',
  ANGEL: 'High-gain angel amp simulation.',
  JAZZC: 'Jazz clean guitar amp simulation.',
  DELUXE: 'Vintage deluxe combo amp simulation.',
  BODY: 'BodyRez: restores natural body to piezo acoustic pickups.',
  SOUL: 'Soul analog EQ (British console style).',
  E88: 'Even 88 formant EQ (classic British console style).',
  E84: 'Even 84 EQ (vintage British 3-band style).',
  F110: 'Fortissimo 110 EQ (Focusrite ISA style).',
  PULSAR: 'Pulsar EQ: passive tube EQ in the Pultec style.',
  MACH4: 'Mach EQ4: broad, musical mastering EQ.',
  'C5-CMB': 'C5 combinator: five-band multiband compressor.',
  'SUB-M': 'Sub monster: generates and boosts deep sub bass.',
  'V-IMG': 'Velvet imager: widens or narrows the stereo image.',
  SPKMAN: 'Speaker manager: crossover, EQ, delay and limit for speakers.',
  DEQ3: 'Triple dynamic EQ: three bands that boost or cut only when needed.',
  '*EVEN*': 'Even channel strip: gate, Even 88 EQ and compressor/limiter.',
  '*SOUL*': 'Soul channel strip: gate/expander, Soul EQ and compressor.',
  '*VINTAGE*': 'Vintage strip: 76 limiter, Pulsar EQ and LA leveler.',
  '*BUS*': 'Bus strip: Soul warmth, Even 84 EQ and bus compressor.',
  '*MASTER*': 'Mastering strip: tape, Mach EQ4, enhancer and limiter.',
};

// Short names for parameter keys the documentation leaves without a label.
const KEY_NAMES = {
  thr: 'threshold', hyst: 'hysteresis', range: 'range', rel: 'release', att: 'attack', hld: 'hold',
  fast: 'fast', m40: '-40 dB mode', on: 'on', mode: 'mode', ratio: 'ratio', gain: 'gain', peak: 'peak',
  rec: 'recovery', lon: 'limiter on', lthr: 'limiter thr', lrec: 'limiter rec', lfast: 'limiter fast',
  con: 'comp on', cthr: 'comp thr', crec: 'comp rec', cfast: 'comp fast', in: 'input', out: 'output',
  ingain: 'input gain', drv: 'drive', spd: 'speed', low: 'low boost', hi: 'high boost', hrm: 'harmonics',
  col: 'colour', trim: 'trim', mix: 'mix', gin: 'in gain', gout: 'out gain', sqz: 'squeeze', knee: 'knee',
  again: 'auto gain', stlvl: 'stereo level', lmf: 'low-mid', mlvl: 'mono level', st: 'stereo', m: 'mono',
  bass: 'bass', mid: 'mid', high: 'high', bassf: 'bass freq', midq: 'mid Q', highf: 'high freq',
  lf: 'low freq', lg: 'low gain', lq: 'low Q', lt: 'low type', lmg: 'low-mid gain', lmq: 'low-mid Q',
  lmf3: 'low-mid ×3', hmf: 'high-mid freq', hmg: 'high-mid gain', hmq: 'high-mid Q', hmf3: 'high-mid ×3',
  hf: 'high freq', hg: 'high gain', hq: 'high Q', ht: 'high type', mf: 'mid freq', mg: 'mid gain', mq: 'mid Q',
  g: 'gain', sub: 'sub', air: 'air', airm: 'air freq', eq1: 'EQ1 on', eq5: 'EQ5 on', '1lb': 'low boost',
  '1latt': 'low atten', '1lf': 'low freq', '1hw': 'high width', '1hb': 'high boost', '1hf': 'high freq',
  '1hatt': 'high atten', '1hattf': 'high atten freq', '5lb': 'low boost', '5lf': 'low freq', '5md': 'mid dip',
  '5mf': 'mid freq', '5hb': 'high boost', '5hf': 'high freq',
};

const PREFIXES = {
  g_: 'Gate', d_: 'Comp', l_: 'Limiter', t_: 'Tape', e_: 'Enhancer', w_: 'Warmth', eq_: 'EQ',
};

/** A readable name for a parameter, e.g. "Pre-delay" or "Gate threshold". */
export function paramLabel(key, def) {
  let label = def?.label;
  if (!label) {
    const prefix = Object.keys(PREFIXES).find((p) => key.startsWith(p));
    const rest = prefix ? key.slice(prefix.length) : key;
    const name = KEY_NAMES[rest] || rest;
    label = prefix ? `${PREFIXES[prefix]} ${name}` : name;
  }
  label = { LC: 'low cut', HC: 'high cut', sw: 'switch' }[label] || label;
  if (/^[\d.]+k?\d*$/.test(label) && def?.unit !== 'Hz') label = `${label} Hz`;
  return label.charAt(0).toUpperCase() + label.slice(1);
}

// One-line explanation per control, matched on the end of the key or on words in its label.
const HINTS = [
  [/pre-?delay|^pdel$/, 'Gap before the reverb starts; keeps the dry sound clear'],
  [/decay|^dcy$/, 'How long the tail rings out'],
  [/size/, 'Size of the simulated space'],
  [/bass mult|lmult|low mult/, 'Low-end decay compared with the rest'],
  [/hmult|high mult/, 'High-end decay compared with the rest'],
  [/damp/, 'Highs above this fade faster, for a darker tail'],
  [/low cut|^lc$|feed l(ow)? ?cut|feed lc/, 'Removes lows below this from the effect'],
  [/high cut|^hc$|feed h(igh)? ?cut|feed hc/, 'Removes highs above this from the effect'],
  [/spread|sprd/, 'Stereo width of the effect'],
  [/diffusion|diff/, 'Smoothness: low is echoey, high is dense'],
  [/shape|shp/, 'How the tail builds and fades'],
  [/mod speed|mspd|modulation/, 'Movement in the tail; avoids metallic ringing'],
  [/density|dens/, 'How thick the reflections are'],
  [/early|erlvl|\ber (delay|level)/, 'Level or timing of the first reflections'],
  [/echo|ecl|ecr|ell|elr/, 'Extra discrete echoes inside the reverb'],
  [/freeze|frz/, 'Holds the current tail forever'],
  [/delay l|delay r/, 'Delay time of this side'],
  [/^time$|^dly/, 'Delay time between repeats'],
  [/feed(back)?$|^feed|efl|efr/, 'How many repeats; higher means more'],
  [/factor|fact/, 'Delay time as a note value of the tempo'],
  [/pattern|pat/, 'Left/right timing relation'],
  [/speed|rate|spd/, 'Speed of the movement'],
  [/depth|dep/, 'How strong the movement is'],
  [/semi/, 'Pitch shift in semitones'],
  [/cent/, 'Fine pitch shift in cents'],
  [/thr|threshold/, 'Level where it starts working'],
  [/ratio/, 'How hard it squeezes above threshold'],
  [/attack|att/, 'How fast it reacts'],
  [/release|rel/, 'How fast it lets go'],
  [/knee/, 'Soft or hard onset of the processing'],
  [/squeeze|sqz/, 'Extra density from the limiter'],
  [/in gain|gin|drive|drv|ingain/, 'Input level; more gives more effect'],
  [/out gain|gout|output/, 'Output level'],
  [/auto gain|again/, 'Keeps the output level steady'],
  [/mix/, 'Balance of effect and dry inside the effect'],
  [/width|wid/, 'Stereo width'],
  [/ Hz$|^\d/, 'Boost or cut at this frequency'],
  [/gain|^g$/, 'Boost or cut'],
  [/freq|^f$/, 'Frequency it works on'],
  [/ q$|^q$/, 'Width of the band (high Q is narrow)'],
  [/on$/, 'Switches this section in or out'],
  [/mode|type/, 'Character of the effect'],
  [/trim/, 'Level trim'],
];

export function paramHint(key, label) {
  const l = label.toLowerCase();
  for (const [re, text] of HINTS) if (re.test(l) || re.test(key)) return text;
  return '';
}

/**
 * $a_chn numbering (0..76). 0 = not inserted. Assumed order, matching the console's
 * source numbering: 1-40 channels, 41-48 aux, 49-64 buses, 65-68 mains, 69-76 matrix.
 */
export function insertLabel(chn, pos) {
  if (!chn) return 'Not inserted';
  const where = pos ? 'post' : 'pre';
  const ranges = [
    [40, 'Ch', 0], [48, 'Aux', 40], [64, 'Bus', 48], [68, 'Main', 64], [76, 'Mtx', 68],
  ];
  const r = ranges.find(([max]) => chn <= max);
  return r ? `Insert on ${r[1]} ${chn - r[2]} (${where})` : `Insert ${chn} (${where})`;
}
