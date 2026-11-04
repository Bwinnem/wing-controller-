// Generated from Patrick-Gilles Maillot, "WING Remote Protocols" FW 3.1, appendix
// "Effects and Plugins' Parameters list". Used for labels and ranges; the console's
// own answers win when they differ.
export const PREMIUM_MODELS = ["NONE", "EXT", "HALL", "ROOM", "CHAMBER", "PLATE", "CONCERT", "AMBI", "V-ROOM", "V-REV", "V-PLATE", "GATED", "REVERSE", "DEL/REV", "SHIMMER", "SPRING", "DIMCRS", "CHORUS", "FLANGER", "ST-DL", "TAP-DL", "TAPE-DL", "OILCAN", "BBD-DL", "PITCH", "D-PITCH", "VSS3", "BPLATE", "GEQ", "PIA", "DOUBLE", "PCORR", "LIMITER", "DE-S2", "ENHANCE", "EXCITER", "P-BASS", "ROTARY", "PHASER", "PANNER", "TAPE", "MOOD", "SUB", "RACKAMP", "UKROCK", "ANGEL", "JAZZC", "DELUXE", "BODY", "SOUL", "E88", "E84", "F110", "PULSAR", "MACH4", "C5-CMB", "SUB-M", "V-IMG", "SPKMAN", "DEQ3", "*EVEN*", "*SOUL*", "*VINTAGE*", "*BUS*", "*MASTER*"];
export const STANDARD_MODELS = ["NONE", "EXT", "GEQ", "PIA", "DOUBLE", "PCORR", "LIMITER", "DE-S2", "ENHANCE", "EXCITER", "P-BASS", "ROTARY", "PHASER", "PANNER", "TAPE", "MOOD", "SUB", "RACKAMP", "UKROCK", "ANGEL", "JAZZC", "DELUXE", "BODY", "SOUL", "E88", "E84", "F110", "PULSAR", "MACH4", "C5-CMB", "SUB-M", "V-IMG", "SPKMAN", "DEQ3", "*EVEN*", "*SOUL*", "*VINTAGE*", "*BUS*", "*MASTER*"];
export const FX_CATALOG = {
 "NONE": {
  "name": "Empty",
  "params": []
 },
 "EXT": {
  "name": "External",
  "params": [
   {
    "key": "egrp",
    "type": "str",
    "options": [
     "OFF",
     "LCL",
     "AUX",
     "A",
     "B",
     "C",
     "SC",
     "USB",
     "CRD",
     "MOD",
     "PLAY",
     "AES"
    ],
    "label": "ext grp"
   },
   {
    "key": "ein",
    "type": "int",
    "min": 1,
    "max": 64,
    "label": "ext in"
   },
   {
    "key": "emode",
    "type": "str",
    "options": [
     "M",
     "ST",
     "M/S"
    ],
    "label": "ext mode"
   },
   {
    "key": "lat",
    "type": "int",
    "min": 0,
    "max": 200,
    "label": "latency"
   },
   {
    "key": "trim",
    "type": "linf",
    "min": -18,
    "max": 18,
    "steps": 361,
    "unit": "dB",
    "label": "trim"
   }
  ]
 },
 "HALL": {
  "name": "Hall Reverb",
  "params": [
   {
    "key": "pdel",
    "type": "int",
    "min": 0,
    "max": 200,
    "unit": "ms",
    "label": "pre-delay"
   },
   {
    "key": "size",
    "type": "int",
    "min": 0,
    "max": 100,
    "label": "hall size"
   },
   {
    "key": "dcy",
    "type": "logf",
    "min": 0.2,
    "max": 5,
    "steps": 101,
    "unit": "s",
    "label": "decay"
   },
   {
    "key": "mult",
    "type": "logf",
    "min": 0.5,
    "max": 2,
    "steps": 101,
    "label": "bass multiplier"
   },
   {
    "key": "damp",
    "type": "logf",
    "min": 1000,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "damping"
   },
   {
    "key": "lc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "low cut"
   },
   {
    "key": "hc",
    "type": "logf",
    "min": 200,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "high cut"
   },
   {
    "key": "shp",
    "type": "linf",
    "min": 0,
    "max": 50,
    "steps": 51,
    "label": "shape"
   },
   {
    "key": "sprd",
    "type": "int",
    "min": 0,
    "max": 50,
    "label": "spread"
   },
   {
    "key": "diff",
    "type": "int",
    "min": 1,
    "max": 30,
    "label": "diffusion"
   },
   {
    "key": "mspd",
    "type": "int",
    "min": 0,
    "max": 100,
    "label": "mod speed"
   }
  ]
 },
 "ROOM": {
  "name": "Room Reverb",
  "params": [
   {
    "key": "pdel",
    "type": "int",
    "min": 0,
    "max": 200,
    "unit": "ms",
    "label": "pre-delay"
   },
   {
    "key": "size",
    "type": "linf",
    "min": 4,
    "max": 76,
    "steps": 145,
    "unit": "m",
    "label": "room size"
   },
   {
    "key": "dcy",
    "type": "logf",
    "min": 0.3,
    "max": 25,
    "steps": 101,
    "unit": "s",
    "label": "decay"
   },
   {
    "key": "mult",
    "type": "logf",
    "min": 0.25,
    "max": 4,
    "steps": 101,
    "label": "bass multiplier"
   },
   {
    "key": "damp",
    "type": "logf",
    "min": 1000,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "damping"
   },
   {
    "key": "lc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "low cut"
   },
   {
    "key": "hc",
    "type": "logf",
    "min": 200,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "high cut"
   },
   {
    "key": "shp",
    "type": "linf",
    "min": 0,
    "max": 250,
    "steps": 51,
    "label": "shape"
   },
   {
    "key": "sprd",
    "type": "int",
    "min": 0,
    "max": 50,
    "label": "spread"
   },
   {
    "key": "diff",
    "type": "int",
    "min": 0,
    "max": 100,
    "label": "diffusion"
   },
   {
    "key": "spin",
    "type": "int",
    "min": 0,
    "max": 100,
    "label": "spin"
   },
   {
    "key": "ecl",
    "type": "linf",
    "min": 0,
    "max": 1200,
    "steps": 1201,
    "unit": "ms",
    "label": "echo left"
   },
   {
    "key": "ecr",
    "type": "linf",
    "min": 0,
    "max": 1200,
    "steps": 1201,
    "unit": "ms",
    "label": "echo right"
   },
   {
    "key": "efl",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "unit": "%",
    "label": "feed left"
   },
   {
    "key": "efr",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "unit": "%",
    "label": "feed right"
   }
  ]
 },
 "CHAMBER": {
  "name": "Chamber Reverb",
  "params": [
   {
    "key": "pdel",
    "type": "int",
    "min": 0,
    "max": 200,
    "unit": "ms",
    "label": "pre-delay"
   },
   {
    "key": "size",
    "type": "linf",
    "min": 4,
    "max": 76,
    "steps": 145,
    "unit": "m",
    "label": "room size"
   },
   {
    "key": "dcy",
    "type": "logf",
    "min": 0.3,
    "max": 25,
    "steps": 101,
    "unit": "s",
    "label": "decay"
   },
   {
    "key": "mult",
    "type": "logf",
    "min": 0.25,
    "max": 4,
    "steps": 101,
    "label": "bass multiplier"
   },
   {
    "key": "damp",
    "type": "logf",
    "min": 1000,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "damping"
   },
   {
    "key": "lc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "low cut"
   },
   {
    "key": "hc",
    "type": "logf",
    "min": 200,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "high cut"
   },
   {
    "key": "shp",
    "type": "linf",
    "min": 0,
    "max": 250,
    "steps": 51,
    "label": "shape"
   },
   {
    "key": "sprd",
    "type": "int",
    "min": 0,
    "max": 50,
    "label": "spread"
   },
   {
    "key": "diff",
    "type": "int",
    "min": 0,
    "max": 100,
    "label": "diffusion"
   },
   {
    "key": "spin",
    "type": "int",
    "min": 0,
    "max": 100,
    "label": "spin"
   },
   {
    "key": "ecl",
    "type": "linf",
    "min": 0,
    "max": 300,
    "steps": 301,
    "unit": "ms",
    "label": "echo left"
   },
   {
    "key": "ecr",
    "type": "linf",
    "min": 0,
    "max": 300,
    "steps": 301,
    "unit": "ms",
    "label": "echo right"
   },
   {
    "key": "ell",
    "type": "fader",
    "min": -144,
    "max": 10,
    "unit": "lvl dB",
    "label": "echo left"
   },
   {
    "key": "elr",
    "type": "fader",
    "min": -144,
    "max": 10,
    "unit": "lvl dB",
    "label": "echo right"
   }
  ]
 },
 "PLATE": {
  "name": "Plate Reverb",
  "params": [
   {
    "key": "pdel",
    "type": "int",
    "min": 0,
    "max": 200,
    "unit": "ms",
    "label": "pre-delay"
   },
   {
    "key": "size",
    "type": "linf",
    "min": 4,
    "max": 76,
    "steps": 145,
    "unit": "m",
    "label": "room size"
   },
   {
    "key": "dcy",
    "type": "logf",
    "min": 0.3,
    "max": 25,
    "steps": 101,
    "unit": "s",
    "label": "decay"
   },
   {
    "key": "mult",
    "type": "logf",
    "min": 0.25,
    "max": 4,
    "steps": 101,
    "label": "bass multiplier"
   },
   {
    "key": "damp",
    "type": "logf",
    "min": 1000,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "damping"
   },
   {
    "key": "lc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "low cut"
   },
   {
    "key": "hc",
    "type": "logf",
    "min": 200,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "high cut"
   },
   {
    "key": "att",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "label": "attack"
   },
   {
    "key": "sprd",
    "type": "int",
    "min": 0,
    "max": 50,
    "label": "spread"
   },
   {
    "key": "diff",
    "type": "int",
    "min": 0,
    "max": 100,
    "label": "diffusion"
   },
   {
    "key": "spin",
    "type": "int",
    "min": 0,
    "max": 100,
    "label": "spin"
   },
   {
    "key": "ecl",
    "type": "linf",
    "min": 0,
    "max": 1200,
    "steps": 1201,
    "unit": "ms",
    "label": "echo left"
   },
   {
    "key": "ecr",
    "type": "linf",
    "min": 0,
    "max": 1200,
    "steps": 1201,
    "unit": "ms",
    "label": "echo right"
   },
   {
    "key": "efl",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "unit": "%",
    "label": "feed left"
   },
   {
    "key": "efr",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "unit": "%",
    "label": "feed right"
   }
  ]
 },
 "CONCERT": {
  "name": "Concert Reverb",
  "params": [
   {
    "key": "pdel",
    "type": "int",
    "min": 0,
    "max": 200,
    "unit": "ms",
    "label": "pre-delay"
   },
   {
    "key": "size",
    "type": "linf",
    "min": 20,
    "max": 76,
    "steps": 113,
    "unit": "m",
    "label": "room size"
   },
   {
    "key": "dcy",
    "type": "logf",
    "min": 0.3,
    "max": 29,
    "steps": 51,
    "unit": "s",
    "label": "decay"
   },
   {
    "key": "mult",
    "type": "logf",
    "min": 0.25,
    "max": 4,
    "steps": 101,
    "label": "bass multiplier"
   },
   {
    "key": "damp",
    "type": "logf",
    "min": 1000,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "damping"
   },
   {
    "key": "lc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "low cut"
   },
   {
    "key": "hc",
    "type": "logf",
    "min": 200,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "high cut"
   },
   {
    "key": "shp",
    "type": "linf",
    "min": 0,
    "max": 50,
    "steps": 51,
    "label": "shape"
   },
   {
    "key": "sprd",
    "type": "int",
    "min": 0,
    "max": 50,
    "label": "spread"
   },
   {
    "key": "diff",
    "type": "int",
    "min": 1,
    "max": 16,
    "label": "diffusion"
   },
   {
    "key": "depth",
    "type": "int",
    "min": 0,
    "max": 100,
    "label": "depth"
   },
   {
    "key": "rfl",
    "type": "linf",
    "min": 0,
    "max": 1200,
    "steps": 1201,
    "unit": "ms",
    "label": "refl. left"
   },
   {
    "key": "rfr",
    "type": "linf",
    "min": 0,
    "max": 1200,
    "steps": 1201,
    "unit": "ms",
    "label": "refl. right"
   },
   {
    "key": "rfll",
    "type": "fader",
    "min": -144,
    "max": 10,
    "unit": "lvl dB",
    "label": "reflection left"
   },
   {
    "key": "rflr",
    "type": "fader",
    "min": -144,
    "max": 10,
    "unit": "lvl dB",
    "label": "reflection right"
   },
   {
    "key": "spin",
    "type": "int",
    "min": 0,
    "max": 100,
    "label": "spin"
   },
   {
    "key": "crs",
    "type": "int",
    "min": 1,
    "max": 100,
    "label": "chorus"
   }
  ]
 },
 "AMBI": {
  "name": "Ambiance",
  "params": [
   {
    "key": "pdel",
    "type": "int",
    "min": 0,
    "max": 200,
    "unit": "ms",
    "label": "pre-delay"
   },
   {
    "key": "size",
    "type": "linf",
    "min": 2,
    "max": 100,
    "steps": 99,
    "unit": "m",
    "label": "room size"
   },
   {
    "key": "dcy",
    "type": "logf",
    "min": 0.2,
    "max": 7.3,
    "steps": 101,
    "unit": "s",
    "label": "decay"
   },
   {
    "key": "tail",
    "type": "int",
    "min": 0,
    "max": 100,
    "label": "tail gain"
   },
   {
    "key": "damp",
    "type": "logf",
    "min": 1000,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "damping"
   },
   {
    "key": "diff",
    "type": "int",
    "min": 1,
    "max": 30,
    "label": "diffusion"
   },
   {
    "key": "mod",
    "type": "int",
    "min": 1,
    "max": 100,
    "label": "modulation speed"
   },
   {
    "key": "lc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "low cut"
   },
   {
    "key": "hc",
    "type": "logf",
    "min": 200,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "high cut"
   }
  ]
 },
 "V-ROOM": {
  "name": "Vintage Room",
  "params": [
   {
    "key": "pdel",
    "type": "int",
    "min": 0,
    "max": 200,
    "unit": "ms",
    "label": "pre-delay"
   },
   {
    "key": "size",
    "type": "int",
    "min": 0,
    "max": 50,
    "label": "size"
   },
   {
    "key": "dcy",
    "type": "logf",
    "min": 0.1,
    "max": 20,
    "steps": 101,
    "unit": "s",
    "label": "decay"
   },
   {
    "key": "dens",
    "type": "linf",
    "min": 1,
    "max": 30,
    "steps": 30,
    "label": "density"
   },
   {
    "key": "erlvl",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "Early level"
   },
   {
    "key": "lmult",
    "type": "logf",
    "min": 0.1,
    "max": 10,
    "steps": 101,
    "label": "low multiplier"
   },
   {
    "key": "hmult",
    "type": "logf",
    "min": 0.1,
    "max": 10,
    "steps": 101,
    "label": "high multiplier"
   },
   {
    "key": "lc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "low cut"
   },
   {
    "key": "hc",
    "type": "logf",
    "min": 200,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "high cut"
   },
   {
    "key": "frz",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "freeze"
   },
   {
    "key": "erl",
    "type": "linf",
    "min": 0,
    "max": 200,
    "steps": 201,
    "unit": "ms",
    "label": "er delay left"
   },
   {
    "key": "err",
    "type": "linf",
    "min": 0,
    "max": 200,
    "steps": 201,
    "unit": "ms",
    "label": "er delay right"
   },
   {
    "key": "add",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "add"
   },
   {
    "key": "lvl",
    "type": "int",
    "min": -6,
    "max": 6,
    "unit": "dB",
    "label": "level"
   }
  ]
 },
 "V-REV": {
  "name": "Vintage Reverb",
  "params": [
   {
    "key": "pdel",
    "type": "int",
    "min": 0,
    "max": 120,
    "unit": "ms",
    "label": "pre-delay"
   },
   {
    "key": "dcy",
    "type": "linf",
    "min": 0.4,
    "max": 4.5,
    "steps": 83,
    "unit": "s",
    "label": "decay"
   },
   {
    "key": "lmult",
    "type": "logf",
    "min": 0.5,
    "max": 2,
    "steps": 51,
    "label": "low multiplier"
   },
   {
    "key": "hmult",
    "type": "logf",
    "min": 0.25,
    "max": 0.67,
    "steps": 51,
    "label": "high multiplier"
   },
   {
    "key": "mod",
    "type": "int",
    "min": 0,
    "max": 100,
    "label": "modulation speed"
   },
   {
    "key": "lc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "low cut"
   },
   {
    "key": "hc",
    "type": "logf",
    "min": 5000,
    "max": 20000,
    "steps": 31,
    "unit": "Hz",
    "label": "high cut"
   },
   {
    "key": "out",
    "type": "str",
    "options": [
     "FRONT",
     "REAR"
    ],
    "label": "output"
   },
   {
    "key": "trans",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "transformer"
   }
  ]
 },
 "V-PLATE": {
  "name": "Vintage Plate",
  "params": [
   {
    "key": "pdel",
    "type": "int",
    "min": 0,
    "max": 250,
    "unit": "ms",
    "label": "pre-delay"
   },
   {
    "key": "dcy",
    "type": "linf",
    "min": 1,
    "max": 6,
    "steps": 101,
    "unit": "s",
    "label": "decay"
   },
   {
    "key": "lc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "low cut"
   },
   {
    "key": "col",
    "type": "linf",
    "min": -20,
    "max": 20,
    "steps": 42,
    "label": "color"
   }
  ]
 },
 "GATED": {
  "name": "Gated Reverb",
  "params": [
   {
    "key": "pdel",
    "type": "int",
    "min": 0,
    "max": 200,
    "unit": "ms",
    "label": "pre-delay"
   },
   {
    "key": "att",
    "type": "int",
    "min": 4,
    "max": 30,
    "label": "attack"
   },
   {
    "key": "dcy",
    "type": "logf",
    "min": 0.14,
    "max": 1,
    "steps": 101,
    "unit": "s",
    "label": "decay"
   },
   {
    "key": "dens",
    "type": "int",
    "min": 0,
    "max": 100,
    "label": "density"
   },
   {
    "key": "diff",
    "type": "int",
    "min": 0,
    "max": 100,
    "label": "diffusion"
   },
   {
    "key": "sprd",
    "type": "int",
    "min": 0,
    "max": 50,
    "label": "spread"
   },
   {
    "key": "lc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "low cut"
   },
   {
    "key": "hfs",
    "type": "logf",
    "min": 200,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "high freq"
   },
   {
    "key": "hsg",
    "type": "linf",
    "min": -30,
    "max": 0,
    "steps": 61,
    "unit": "dB",
    "label": "high gain"
   }
  ]
 },
 "REVERSE": {
  "name": "Reverse Reverb",
  "params": [
   {
    "key": "pdel",
    "type": "int",
    "min": 0,
    "max": 200,
    "unit": "ms",
    "label": "pre-delay"
   },
   {
    "key": "rise",
    "type": "int",
    "min": 4,
    "max": 50,
    "label": "rise"
   },
   {
    "key": "dcy",
    "type": "logf",
    "min": 0.14,
    "max": 1,
    "steps": 101,
    "unit": "s",
    "label": "decay"
   },
   {
    "key": "diff",
    "type": "int",
    "min": 0,
    "max": 30,
    "label": "diffusion"
   },
   {
    "key": "sprd",
    "type": "int",
    "min": 0,
    "max": 100,
    "label": "spread"
   },
   {
    "key": "lc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "low cut"
   },
   {
    "key": "hfs",
    "type": "logf",
    "min": 200,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "high freq"
   },
   {
    "key": "hsg",
    "type": "linf",
    "min": -30,
    "max": 0,
    "steps": 61,
    "unit": "dB",
    "label": "high gain"
   }
  ]
 },
 "DEL/REV": {
  "name": "Delay/Reverb",
  "params": [
   {
    "key": "time",
    "type": "linf",
    "min": 0,
    "max": 3000,
    "steps": 3000,
    "unit": "ms",
    "label": "time"
   },
   {
    "key": "feed",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "feed"
   },
   {
    "key": "fhc",
    "type": "logf",
    "min": 200,
    "max": 2000,
    "steps": 51,
    "unit": "Hz",
    "label": "feed HC"
   },
   {
    "key": "dly",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "delay"
   },
   {
    "key": "d2r",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "delay→rev"
   },
   {
    "key": "pdel",
    "type": "int",
    "min": 0,
    "max": 200,
    "unit": "ms",
    "label": "pre delay"
   },
   {
    "key": "size",
    "type": "int",
    "min": 2,
    "max": 100,
    "label": "size"
   },
   {
    "key": "dcy",
    "type": "logf",
    "min": 0.1,
    "max": 5,
    "steps": 51,
    "unit": "s",
    "label": "decay"
   },
   {
    "key": "damp",
    "type": "logf",
    "min": 1000,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "damp"
   },
   {
    "key": "rlc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "rev LC"
   },
   {
    "key": "i2r",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "in→rev"
   }
  ]
 },
 "SHIMMER": {
  "name": "Shimmer Reverb",
  "params": [
   {
    "key": "pdel",
    "type": "int",
    "min": 0,
    "max": 250,
    "unit": "ms",
    "label": "pre delay"
   },
   {
    "key": "size",
    "type": "int",
    "min": 2,
    "max": 50,
    "label": "size"
   },
   {
    "key": "dcy",
    "type": "logf",
    "min": 1,
    "max": 20,
    "steps": 101,
    "unit": "s",
    "label": "decay"
   },
   {
    "key": "lc",
    "type": "logf",
    "min": 25,
    "max": 250,
    "steps": 51,
    "unit": "Hz",
    "label": "low cut"
   },
   {
    "key": "hc",
    "type": "logf",
    "min": 500,
    "max": 7000,
    "steps": 51,
    "unit": "Hz",
    "label": "high cut"
   },
   {
    "key": "damp",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "damp"
   },
   {
    "key": "shim",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "shimmer"
   },
   {
    "key": "shine",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "shine"
   }
  ]
 },
 "SPRING": {
  "name": "Spring Reverb",
  "params": [
   {
    "key": "dcy",
    "type": "logf",
    "min": 1.5,
    "max": 6,
    "steps": 101,
    "unit": "s",
    "label": "decay"
   },
   {
    "key": "dens",
    "type": "linf",
    "min": 1,
    "max": 30,
    "steps": 30,
    "label": "density"
   },
   {
    "key": "low",
    "type": "linf",
    "min": 1,
    "max": 50,
    "steps": 50,
    "label": "bass"
   },
   {
    "key": "high",
    "type": "linf",
    "min": 1,
    "max": 50,
    "steps": 50,
    "label": "treble"
   }
  ]
 },
 "DIMCRS": {
  "name": "Dimension CRS",
  "params": [
   {
    "key": "sw1",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "sw1"
   },
   {
    "key": "sw2",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "sw2"
   },
   {
    "key": "sw3",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "sw3"
   },
   {
    "key": "sw4",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "sw4"
   },
   {
    "key": "in",
    "type": "str",
    "options": [
     "MONO",
     "STEREO"
    ],
    "label": "input"
   },
   {
    "key": "drysw",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "dry"
   }
  ]
 },
 "CHORUS": {
  "name": "Stereo Chorus",
  "params": [
   {
    "key": "lc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "LC"
   },
   {
    "key": "hc",
    "type": "logf",
    "min": 200,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "HC"
   },
   {
    "key": "wave",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "label": "waveform"
   },
   {
    "key": "phase",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "label": "phase"
   },
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "mix"
   },
   {
    "key": "dlyl",
    "type": "linf",
    "min": 5,
    "max": 50,
    "steps": 226,
    "unit": "ms",
    "label": "delay l"
   },
   {
    "key": "dlyr",
    "type": "linf",
    "min": 5,
    "max": 50,
    "steps": 226,
    "unit": "ms",
    "label": "delay r"
   },
   {
    "key": "depl",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "depth l"
   },
   {
    "key": "depr",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "depth r"
   },
   {
    "key": "sprd",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "spread"
   },
   {
    "key": "spd",
    "type": "logf",
    "min": 0.05,
    "max": 5,
    "steps": 201,
    "unit": "Hz",
    "label": "speed"
   }
  ]
 },
 "FLANGER": {
  "name": "Stereo Flanger",
  "params": [
   {
    "key": "lc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "LC"
   },
   {
    "key": "hc",
    "type": "logf",
    "min": 200,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "HC"
   },
   {
    "key": "flc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "feed LC"
   },
   {
    "key": "fhc",
    "type": "logf",
    "min": 200,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "feed HC"
   },
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "mix"
   },
   {
    "key": "dlyl",
    "type": "linf",
    "min": 5,
    "max": 20,
    "steps": 196,
    "unit": "ms",
    "label": "delay l"
   },
   {
    "key": "dlyr",
    "type": "linf",
    "min": 5,
    "max": 20,
    "steps": 196,
    "unit": "ms",
    "label": "delay r"
   },
   {
    "key": "depl",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "depth l"
   },
   {
    "key": "depr",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "depth r"
   },
   {
    "key": "phase",
    "type": "linf",
    "min": 0,
    "max": 180,
    "steps": 181,
    "label": "phase"
   },
   {
    "key": "spd",
    "type": "logf",
    "min": 0.05,
    "max": 5,
    "steps": 201,
    "unit": "Hz",
    "label": "speed"
   },
   {
    "key": "feed",
    "type": "linf",
    "min": -90,
    "max": 90,
    "steps": 181,
    "unit": "%",
    "label": "feed"
   }
  ]
 },
 "ST-DL": {
  "name": "Stereo Delay",
  "params": [
   {
    "key": "time",
    "type": "linf",
    "min": 1,
    "max": 3000,
    "steps": 3000,
    "unit": "ms",
    "label": "time"
   },
   {
    "key": "mode",
    "type": "str",
    "options": [
     "ST",
     "X",
     "M"
    ],
    "label": "mode"
   },
   {
    "key": "fact",
    "type": "str",
    "options": [
     "1/4",
     "1/3",
     "1/2",
     "2/3",
     "3/4",
     "1",
     "3/8",
     "5/4",
     "4/3",
     "3/2",
     "2"
    ],
    "label": "factor"
   },
   {
    "key": "pat",
    "type": "str",
    "options": [
     "1/2:1",
     "2/3:1",
     "3/4:1",
     "7/8:1",
     "1:1",
     "1:9/8",
     "1:5/4",
     "1:4/3",
     "1:3/2"
    ],
    "label": "pattern"
   },
   {
    "key": "offset",
    "type": "int",
    "min": -50,
    "max": 50,
    "unit": "ms",
    "label": "offset"
   },
   {
    "key": "feed",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "feed"
   },
   {
    "key": "flc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "feed L cut"
   },
   {
    "key": "fhc",
    "type": "logf",
    "min": 200,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "feed H cut"
   },
   {
    "key": "lc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "low cut"
   },
   {
    "key": "hc",
    "type": "logf",
    "min": 200,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "high cut"
   }
  ]
 },
 "TAP-DL": {
  "name": "UltraTap Delay",
  "params": [
   {
    "key": "time",
    "type": "linf",
    "min": 1,
    "max": 2000,
    "steps": 2000,
    "unit": "ms",
    "label": "time"
   },
   {
    "key": "rep",
    "type": "int",
    "min": 1,
    "max": 16,
    "label": "repeat"
   },
   {
    "key": "slp",
    "type": "linf",
    "min": -6,
    "max": 6,
    "steps": 121,
    "unit": "dB",
    "label": "slope"
   },
   {
    "key": "fact",
    "type": "str",
    "options": [
     "1/3",
     "1/2",
     "2/3",
     "3/4",
     "1",
     "5/4",
     "4/3",
     "3/2",
     "2"
    ],
    "label": "factor"
   },
   {
    "key": "pdel",
    "type": "linf",
    "min": 0,
    "max": 500,
    "steps": 501,
    "unit": "ms",
    "label": "pre delay"
   },
   {
    "key": "mode",
    "type": "str",
    "options": [
     "MOVE",
     "JUMP",
     "FOCUS",
     "SPREAD"
    ],
    "label": "mode"
   },
   {
    "key": "wid",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "unit": "%",
    "label": "width"
   },
   {
    "key": "diff",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "label": "diffusion"
   },
   {
    "key": "lc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "low cut"
   },
   {
    "key": "hc",
    "type": "logf",
    "min": 200,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "high cut"
   }
  ]
 },
 "TAPE-DL": {
  "name": "Tape Delay",
  "params": [
   {
    "key": "time",
    "type": "linf",
    "min": 60,
    "max": 650,
    "steps": 591,
    "unit": "ms",
    "label": "time"
   },
   {
    "key": "sust",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "sustain"
   },
   {
    "key": "drv",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "drive"
   },
   {
    "key": "wf",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "flutter"
   }
  ]
 },
 "OILCAN": {
  "name": "OilCan Delay",
  "params": [
   {
    "key": "time",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 1001,
    "label": "time"
   },
   {
    "key": "sust",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "unit": "%",
    "label": "sustain"
   },
   {
    "key": "wb",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "unit": "%",
    "label": "wobble"
   },
   {
    "key": "tone",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "unit": "%",
    "label": "tone"
   }
  ]
 },
 "BBD-DL": {
  "name": "BBD Delay",
  "params": [
   {
    "key": "dly",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 1001,
    "label": "time"
   },
   {
    "key": "feed",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "feed"
   }
  ]
 },
 "PITCH": {
  "name": "Stereo Pitch",
  "params": [
   {
    "key": "semi",
    "type": "int",
    "min": -12,
    "max": 12,
    "label": "semitones"
   },
   {
    "key": "cent",
    "type": "int",
    "min": -50,
    "max": 50,
    "label": "cent"
   },
   {
    "key": "dly",
    "type": "linf",
    "min": 0,
    "max": 500,
    "steps": 501,
    "unit": "ms",
    "label": "delay"
   },
   {
    "key": "lc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "low cut"
   },
   {
    "key": "hc",
    "type": "logf",
    "min": 200,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "high cut"
   },
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "mix"
   }
  ]
 },
 "D-PITCH": {
  "name": "Dual Pitch",
  "params": [
   {
    "key": "semi1",
    "type": "int",
    "min": -12,
    "max": 12,
    "label": "semitones 1"
   },
   {
    "key": "cent1",
    "type": "int",
    "min": -50,
    "max": 50,
    "label": "cent 1"
   },
   {
    "key": "dly1",
    "type": "linf",
    "min": 0,
    "max": 500,
    "steps": 501,
    "unit": "ms",
    "label": "delay 1"
   },
   {
    "key": "pan1",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "unit": "%",
    "label": "pan 1"
   },
   {
    "key": "lvl1",
    "type": "fader",
    "min": -144,
    "max": 10,
    "unit": "dB",
    "label": "1"
   },
   {
    "key": "semi2",
    "type": "int",
    "min": -12,
    "max": 12,
    "label": "semitones 2"
   },
   {
    "key": "cent2",
    "type": "int",
    "min": -50,
    "max": 50,
    "label": "cent 2"
   },
   {
    "key": "dly2",
    "type": "linf",
    "min": 0,
    "max": 500,
    "steps": 501,
    "unit": "ms",
    "label": "delay 2"
   },
   {
    "key": "pan2",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "unit": "%",
    "label": "pan 2"
   },
   {
    "key": "lvl2",
    "type": "fader",
    "min": -144,
    "max": 10,
    "unit": "dB",
    "label": "2"
   },
   {
    "key": "lc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "low cut"
   },
   {
    "key": "hc",
    "type": "logf",
    "min": 200,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "high cut"
   }
  ]
 },
 "VSS3": {
  "name": "VSS3 Reverb",
  "params": [
   {
    "key": "preset",
    "type": "str",
    "options": [],
    "unit": "[Build",
    "label": "Small Booth, Home Room, Dialog Alley, Small Wood Room, A Small Room, Intimate Studio, Small Room, Tight & Natural, Room Conversation, Furnished Room 2, Studio 20x20 ft, Drew Room, Piano Close, Clear Guitar Room, Wide Ambient Chamber, Small Dense Hall, Slap Hall, Acoustic Gtr Ambience, Clear Room, Livingroom, Band Rehearsal Room, The Studio, In The Room, Studio 40x40 ft, Hit Room, Ambient Hall, Stage and Hall, Acoustic Guitar Space, Medium Vocal Hall, Bright Theatre , Big"
   },
   {
    "key": "load",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "load"
   },
   {
    "key": "erpdly",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "ms",
    "label": "er pdly"
   },
   {
    "key": "ertype",
    "type": "str",
    "options": [
     "ROYAL",
     "THEATRE",
     "CHURCH",
     "GAS",
     "CONCERT",
     "ROYAL2",
     "V1-NEAR",
     "V2-HARD",
     "V3-SPREAD",
     "V4-BUILD",
     "V5-RANDOM",
     "SLAP",
     "CAR",
     "PHONEBTH",
     "BATHROOM",
     "CONFRM9",
     "CONFRM30",
     "GARAGE",
     "SWIMSTDM",
     "AIRPORT",
     "STREET",
     "ALLEY",
     "PIAZA",
     "FOREST"
    ],
    "label": "er type"
   },
   {
    "key": "ersize",
    "type": "str",
    "options": [
     "SML",
     "MED",
     "LRG"
    ],
    "label": "er size"
   },
   {
    "key": "erpos",
    "type": "str",
    "options": [
     "NEAR",
     "DIST"
    ],
    "label": "er position"
   },
   {
    "key": "erbal",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "label": "er balance"
   },
   {
    "key": "erlc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "er low cut"
   },
   {
    "key": "ercol",
    "type": "linf",
    "min": -40,
    "max": 40,
    "steps": 81,
    "label": "er color"
   },
   {
    "key": "erlvl",
    "type": "fader",
    "min": -144,
    "max": 10,
    "unit": "lvl dB",
    "label": "er level"
   },
   {
    "key": "rvtype",
    "type": "str",
    "options": [
     "SMOOTH",
     "NATURAL",
     "ALIVE",
     "FAST",
     "X-WIDE",
     "ALIVE2"
    ],
    "label": "rev type"
   },
   {
    "key": "rvwide",
    "type": "str",
    "options": [
     "NARROW",
     "NORMAL",
     "WIDE",
     "X-WIDE"
    ],
    "label": "rev"
   },
   {
    "key": "rvpdly",
    "type": "linf",
    "min": 0,
    "max": 200,
    "steps": 201,
    "unit": "ms",
    "label": "rev pdly"
   },
   {
    "key": "dcy",
    "type": "linf",
    "min": 0.1,
    "max": 20,
    "steps": 280,
    "unit": "s",
    "label": "decay"
   },
   {
    "key": "diff",
    "type": "linf",
    "min": -50,
    "max": 50,
    "steps": 101,
    "label": "diffuse"
   },
   {
    "key": "rvbal",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "label": "balance"
   },
   {
    "key": "rvlvl",
    "type": "fader",
    "min": -144,
    "max": 10,
    "unit": "lvl dB",
    "label": "reverb level"
   },
   {
    "key": "ldcy",
    "type": "linf",
    "min": 0.1,
    "max": 2.5,
    "steps": 25,
    "label": "low decay"
   },
   {
    "key": "lmdcy",
    "type": "linf",
    "min": 0.1,
    "max": 2.5,
    "steps": 25,
    "label": "lowmid decay"
   },
   {
    "key": "hmdcy",
    "type": "linf",
    "min": 0.1,
    "max": 2.5,
    "steps": 25,
    "label": "mid decay"
   },
   {
    "key": "hdcy",
    "type": "linf",
    "min": 0.1,
    "max": 2.5,
    "steps": 25,
    "label": "high decay"
   },
   {
    "key": "hsoft",
    "type": "linf",
    "min": -50,
    "max": 50,
    "steps": 101,
    "label": "high soft"
   },
   {
    "key": "lxo",
    "type": "logf",
    "min": 20,
    "max": 500,
    "steps": 113,
    "unit": "Hz",
    "label": "low xover"
   },
   {
    "key": "mxo",
    "type": "logf",
    "min": 200,
    "max": 2000,
    "steps": 81,
    "unit": "Hz",
    "label": "mid xover"
   },
   {
    "key": "hxo",
    "type": "logf",
    "min": 500,
    "max": 20000,
    "steps": 105,
    "unit": "Hz",
    "label": "high xover"
   },
   {
    "key": "lshv",
    "type": "logf",
    "min": 20,
    "max": 200,
    "steps": 81,
    "unit": "Hz",
    "label": "low shelf"
   },
   {
    "key": "lsdmp",
    "type": "linf",
    "min": 0,
    "max": -18,
    "steps": 37,
    "unit": "dB",
    "label": "low damp"
   },
   {
    "key": "hcut",
    "type": "logf",
    "min": 20,
    "max": 20000,
    "steps": 241,
    "unit": "Hz",
    "label": "high cut"
   },
   {
    "key": "mtype",
    "type": "str",
    "options": [
     "A",
     "B",
     "C",
     "D",
     "E",
     "F"
    ],
    "label": "modulation type"
   },
   {
    "key": "mrate",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "label": "modulation rate"
   },
   {
    "key": "mwid",
    "type": "linf",
    "min": 0,
    "max": 200,
    "steps": 201,
    "label": "modulation width"
   },
   {
    "key": "view",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "view"
   }
  ]
 },
 "BPLATE": {
  "name": "Blue Plate",
  "params": [
   {
    "key": "pdel",
    "type": "int",
    "min": 0,
    "max": 200,
    "unit": "ms",
    "label": "pre delay"
   },
   {
    "key": "size",
    "type": "int",
    "min": 0,
    "max": 100,
    "unit": "ms",
    "label": "size"
   },
   {
    "key": "dcy",
    "type": "logf",
    "min": 0.2,
    "max": 5,
    "steps": 101,
    "unit": "s",
    "label": "decay"
   },
   {
    "key": "mult",
    "type": "logf",
    "min": 0.5,
    "max": 2,
    "steps": 51,
    "label": "bass multiplier"
   },
   {
    "key": "damp",
    "type": "logf",
    "min": 1000,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "damping"
   },
   {
    "key": "lc",
    "type": "logf",
    "min": 20,
    "max": 400,
    "steps": 51,
    "unit": "Hz",
    "label": "low cut"
   },
   {
    "key": "hc",
    "type": "logf",
    "min": 200,
    "max": 20000,
    "steps": 51,
    "unit": "Hz",
    "label": "high cut"
   },
   {
    "key": "xover",
    "type": "logf",
    "min": 20,
    "max": 500,
    "steps": 51,
    "unit": "Hz",
    "label": "xover"
   },
   {
    "key": "mdep",
    "type": "linf",
    "min": 1,
    "max": 50,
    "steps": 50,
    "label": "modulation depth"
   },
   {
    "key": "msdp",
    "type": "int",
    "min": 0,
    "max": 100,
    "label": "modulation speed"
   },
   {
    "key": "diff",
    "type": "int",
    "min": 1,
    "max": 30,
    "label": "diffusion"
   }
  ]
 },
 "GEQ": {
  "name": "Graphic EQ",
  "params": [
   {
    "key": "type",
    "type": "str",
    "options": [
     "STD",
     "TRU"
    ],
    "label": "geq type"
   },
   {
    "key": "20",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "25",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "31",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "40",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "50",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "63",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "80",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "100",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "125",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "160",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "200",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "250",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "315",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "400",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "500",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "630",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "800",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "1k",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "1k25",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "1k6",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "2k",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "2k5",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "3k15",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "4k",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "5k",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "6k3",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "8k",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "10k",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "12k5",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "16k",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "20k",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   },
   {
    "key": "TRIM",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 121,
    "unit": "dB"
   }
  ]
 },
 "PIA": {
  "name": "PIA 560 GEQ",
  "params": [
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": 125,
    "steps": 126,
    "unit": "%",
    "label": "mix"
   },
   {
    "key": "gain",
    "type": "linf",
    "min": -12,
    "max": 12,
    "steps": 241,
    "unit": "dB"
   },
   {
    "key": "31",
    "type": "linf",
    "min": -12,
    "max": 12,
    "steps": 241,
    "unit": "dB"
   },
   {
    "key": "63",
    "type": "linf",
    "min": -12,
    "max": 12,
    "steps": 241,
    "unit": "dB"
   },
   {
    "key": "125",
    "type": "linf",
    "min": -12,
    "max": 12,
    "steps": 241,
    "unit": "dB"
   },
   {
    "key": "250",
    "type": "linf",
    "min": -12,
    "max": 12,
    "steps": 241,
    "unit": "dB"
   },
   {
    "key": "500",
    "type": "linf",
    "min": -12,
    "max": 12,
    "steps": 241,
    "unit": "dB"
   },
   {
    "key": "1k",
    "type": "linf",
    "min": -12,
    "max": 12,
    "steps": 241,
    "unit": "dB"
   },
   {
    "key": "2k",
    "type": "linf",
    "min": -12,
    "max": 12,
    "steps": 241,
    "unit": "dB"
   },
   {
    "key": "4k",
    "type": "linf",
    "min": -12,
    "max": 12,
    "steps": 241,
    "unit": "dB"
   },
   {
    "key": "8k",
    "type": "linf",
    "min": -12,
    "max": 12,
    "steps": 241,
    "unit": "dB"
   },
   {
    "key": "16k",
    "type": "linf",
    "min": -12,
    "max": 12,
    "steps": 241,
    "unit": "dB"
   }
  ]
 },
 "DOUBLE": {
  "name": "Double Vocal",
  "params": [
   {
    "key": "mode",
    "type": "str",
    "options": [
     "TIGHT",
     "LOOSE",
     "GROUP",
     "DETUNE",
     "THICK"
    ],
    "label": "mode"
   },
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "mix"
   },
   {
    "key": "sprd",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "spread"
   }
  ]
 },
 "PCORR": {
  "name": "Pitch Fix",
  "params": [
   {
    "key": "spd",
    "type": "linf",
    "min": 1,
    "max": 100,
    "steps": 100,
    "label": "speed"
   },
   {
    "key": "amnt",
    "type": "linf",
    "min": 0,
    "max": 50,
    "steps": 51,
    "label": "amount"
   },
   {
    "key": "a4",
    "type": "linf",
    "min": 410,
    "max": 470,
    "steps": 601,
    "label": "A4 pitch"
   },
   {
    "key": "_c",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "_db",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "_d",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "_eb",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "_e",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "_f",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "_gb",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "_g",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "_ab",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "_a",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "_bb",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "_b",
    "type": "int",
    "min": 0,
    "max": 1
   }
  ]
 },
 "LIMITER": {
  "name": "Precision Limiter",
  "params": [
   {
    "key": "gin",
    "type": "linf",
    "min": 0,
    "max": 18,
    "steps": 73,
    "unit": "dB",
    "label": "in gain"
   },
   {
    "key": "gout",
    "type": "linf",
    "min": -18,
    "max": 0,
    "steps": 73,
    "unit": "dB",
    "label": "out gain"
   },
   {
    "key": "sqz",
    "type": "int",
    "min": 0,
    "max": 100,
    "label": "squeeze"
   },
   {
    "key": "knee",
    "type": "int",
    "min": 0,
    "max": 10,
    "label": "knee"
   },
   {
    "key": "again",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "auto gain"
   },
   {
    "key": "att",
    "type": "linf",
    "min": 0.05,
    "max": 1,
    "steps": 95,
    "unit": "ms",
    "label": "attack"
   },
   {
    "key": "rel",
    "type": "logf",
    "min": 20,
    "max": 2000,
    "steps": 101,
    "unit": "ms",
    "label": "release"
   }
  ]
 },
 "DE-S2": {
  "name": "2-Band DeEsser",
  "params": [
   {
    "key": "lo",
    "type": "linf",
    "min": 0,
    "max": 50,
    "steps": 51,
    "label": "low"
   },
   {
    "key": "hi",
    "type": "linf",
    "min": 0,
    "max": 50,
    "steps": 51,
    "label": "high"
   },
   {
    "key": "los",
    "type": "linf",
    "min": 0,
    "max": 50,
    "steps": 51,
    "label": "low (s)"
   },
   {
    "key": "his",
    "type": "linf",
    "min": 0,
    "max": 50,
    "steps": 51,
    "label": "high (s)"
   },
   {
    "key": "gdr",
    "type": "str",
    "options": [
     "FEMALE",
     "MALE"
    ],
    "label": "gender"
   },
   {
    "key": "mode",
    "type": "str",
    "options": [
     "STEREO",
     "MID/SIDE"
    ],
    "label": "mode"
   }
  ]
 },
 "ENHANCE": {
  "name": "Ultra Enhancer",
  "params": [
   {
    "key": "stlv",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "unit": "%",
    "label": "st lvl"
   },
   {
    "key": "lmf",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "unit": "%",
    "label": "lmf spread"
   },
   {
    "key": "lmvl",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "unit": "%",
    "label": "mono lvl"
   },
   {
    "key": "st",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "unit": "%",
    "label": "st pan"
   },
   {
    "key": "m",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "unit": "%",
    "label": "mono pan"
   },
   {
    "key": "bass",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "bass gain"
   },
   {
    "key": "mid",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "mid gain"
   },
   {
    "key": "high",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "high gain"
   },
   {
    "key": "g",
    "type": "linf",
    "min": -112,
    "max": 12,
    "steps": 241,
    "unit": "dB",
    "label": "gain"
   },
   {
    "key": "solo",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "solo"
   },
   {
    "key": "bassf",
    "type": "linf",
    "min": 1,
    "max": 50,
    "steps": 50,
    "label": "bass freq"
   },
   {
    "key": "midq",
    "type": "linf",
    "min": 1,
    "max": 50,
    "steps": 50,
    "label": "mid Q"
   },
   {
    "key": "highf",
    "type": "linf",
    "min": 1,
    "max": 50,
    "steps": 50,
    "label": "high freq"
   }
  ]
 },
 "EXCITER": {
  "name": "Exciter",
  "params": [
   {
    "key": "tune",
    "type": "logf",
    "min": 1000,
    "max": 10000,
    "steps": 51,
    "unit": "Hz",
    "label": "tune"
   },
   {
    "key": "peak",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "peak"
   },
   {
    "key": "zfill",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "zfill"
   },
   {
    "key": "timbre",
    "type": "linf",
    "min": -50,
    "max": 50,
    "steps": 101,
    "label": "timbre"
   },
   {
    "key": "harm",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "harm"
   },
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "mix"
   },
   {
    "key": "dry",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "dry"
   }
  ]
 },
 "P-BASS": {
  "name": "Psycho Bass",
  "params": [
   {
    "key": "int",
    "type": "linf",
    "min": -24,
    "max": 6,
    "steps": 61,
    "unit": "dB",
    "label": "intensity"
   },
   {
    "key": "bass",
    "type": "linf",
    "min": -60,
    "max": 0,
    "steps": 121,
    "unit": "dB",
    "label": "bass gain"
   },
   {
    "key": "xf",
    "type": "logf",
    "min": 32,
    "max": 200,
    "steps": 51,
    "unit": "Hz",
    "label": "X/O freq"
   },
   {
    "key": "solo",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "solo"
   }
  ]
 },
 "ROTARY": {
  "name": "Rotary Speaker",
  "params": [
   {
    "key": "sw",
    "type": "str",
    "options": [
     "STOP",
     "SLOW",
     "FAST"
    ]
   },
   {
    "key": "lo",
    "type": "logf",
    "min": 0.1,
    "max": 3.999,
    "steps": 51,
    "unit": "Hz",
    "label": "lo speed"
   },
   {
    "key": "hi",
    "type": "logf",
    "min": 4,
    "max": 10,
    "steps": 51,
    "unit": "Hz",
    "label": "hi speed"
   },
   {
    "key": "bal",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "label": "balance"
   },
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "mix"
   },
   {
    "key": "dist",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "label": "distance"
   },
   {
    "key": "dac",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "drum accel"
   },
   {
    "key": "hac",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "horn accel"
   }
  ]
 },
 "PHASER": {
  "name": "Phaser",
  "params": [
   {
    "key": "spd",
    "type": "logf",
    "min": 0.05,
    "max": 5,
    "steps": 201,
    "unit": "Hz",
    "label": "speed"
   },
   {
    "key": "phase",
    "type": "int",
    "min": 0,
    "max": 180,
    "label": "phase"
   },
   {
    "key": "wave",
    "type": "int",
    "min": -50,
    "max": 50,
    "label": "wave"
   },
   {
    "key": "range",
    "type": "int",
    "min": 2,
    "max": 98,
    "unit": "%",
    "label": "range"
   },
   {
    "key": "depth",
    "type": "int",
    "min": 0,
    "max": 100,
    "unit": "%",
    "label": "depth"
   },
   {
    "key": "emod",
    "type": "int",
    "min": -100,
    "max": 100,
    "unit": "%",
    "label": "env mod"
   },
   {
    "key": "att",
    "type": "logf",
    "min": 10,
    "max": 1000,
    "steps": 201,
    "unit": "ms",
    "label": "attack"
   },
   {
    "key": "hld",
    "type": "logf",
    "min": 10,
    "max": 2000,
    "steps": 201,
    "unit": "ms",
    "label": "hold"
   },
   {
    "key": "rel",
    "type": "logf",
    "min": 10,
    "max": 1000,
    "steps": 201,
    "unit": "ms",
    "label": "release"
   },
   {
    "key": "mix",
    "type": "int",
    "min": 0,
    "max": 100,
    "unit": "%",
    "label": "mix"
   },
   {
    "key": "stg",
    "type": "int",
    "min": 2,
    "max": 12,
    "label": "stages"
   },
   {
    "key": "reso",
    "type": "int",
    "min": 0,
    "max": 80,
    "unit": "%",
    "label": "reso"
   }
  ]
 },
 "PANNER": {
  "name": "Tremolo Panner",
  "params": [
   {
    "key": "att",
    "type": "logf",
    "min": 10,
    "max": 1000,
    "steps": 201,
    "unit": "ms",
    "label": "attack"
   },
   {
    "key": "hld",
    "type": "logf",
    "min": 10,
    "max": 2000,
    "steps": 201,
    "unit": "ms",
    "label": "hold"
   },
   {
    "key": "rel",
    "type": "logf",
    "min": 10,
    "max": 1000,
    "steps": 201,
    "unit": "ms",
    "label": "release"
   },
   {
    "key": "espd",
    "type": "int",
    "min": 0,
    "max": 100,
    "unit": "%",
    "label": "env>depth"
   },
   {
    "key": "edep",
    "type": "int",
    "min": 0,
    "max": 100,
    "unit": "%",
    "label": "env>depth"
   },
   {
    "key": "spd",
    "type": "logf",
    "min": 0.05,
    "max": 5,
    "steps": 201,
    "unit": "Hz",
    "label": "speed"
   },
   {
    "key": "phase",
    "type": "int",
    "min": 0,
    "max": 180,
    "label": "phase"
   },
   {
    "key": "wave",
    "type": "int",
    "min": -50,
    "max": 50,
    "label": "wave"
   },
   {
    "key": "depth",
    "type": "int",
    "min": 0,
    "max": 100,
    "unit": "%",
    "label": "depth"
   }
  ]
 },
 "TAPE": {
  "name": "Tape Machine",
  "params": [
   {
    "key": "drv",
    "type": "linf",
    "min": -12,
    "max": 12,
    "steps": 97,
    "unit": "dB",
    "label": "drive"
   },
   {
    "key": "spd",
    "type": "logf",
    "min": 7.5,
    "max": 30,
    "steps": 65
   },
   {
    "key": "low",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "low bump"
   },
   {
    "key": "hi",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "high shelv"
   },
   {
    "key": "out",
    "type": "linf",
    "min": -12,
    "max": 12,
    "steps": 97,
    "unit": "dB",
    "label": "out gains s"
   }
  ]
 },
 "MOOD": {
  "name": "Mood Filter",
  "params": [
   {
    "key": "fbase",
    "type": "logf",
    "min": 20,
    "max": 15000,
    "steps": 101,
    "unit": "Hz",
    "label": "base"
   },
   {
    "key": "filt",
    "type": "str",
    "options": [
     "LP",
     "HP",
     "BP",
     "NOTCH"
    ],
    "label": "type"
   },
   {
    "key": "slope",
    "type": "str",
    "options": [
     "12",
     "24"
    ],
    "label": "slope"
   },
   {
    "key": "reso",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "reso"
   },
   {
    "key": "drv",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "drive"
   },
   {
    "key": "env",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "unit": "%",
    "label": "env"
   },
   {
    "key": "att",
    "type": "logf",
    "min": 10,
    "max": 250,
    "steps": 101,
    "unit": "ms",
    "label": "attack"
   },
   {
    "key": "hld",
    "type": "logf",
    "min": 1,
    "max": 500,
    "steps": 101,
    "unit": "ms",
    "label": "hold"
   },
   {
    "key": "rel",
    "type": "logf",
    "min": 1,
    "max": 500,
    "steps": 101,
    "unit": "ms",
    "label": "release"
   },
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "unit": "%",
    "label": "mix"
   },
   {
    "key": "lfo",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "unit": "%",
    "label": "lfo"
   },
   {
    "key": "spd",
    "type": "logf",
    "min": 0.05,
    "max": 20,
    "steps": 301,
    "unit": "Hz",
    "label": "speed"
   },
   {
    "key": "phase",
    "type": "int",
    "min": 0,
    "max": 180,
    "label": "phase"
   },
   {
    "key": "wave",
    "type": "str",
    "options": [
     "TRI",
     "SIN",
     "SAW",
     "SAW-",
     "RMP",
     "SQU",
     "RND"
    ],
    "label": "lfo wave"
   }
  ]
 },
 "SUB": {
  "name": "Sub Octaver",
  "params": [
   {
    "key": "rng",
    "type": "str",
    "options": [
     "LOW",
     "MID",
     "HIGH"
    ],
    "label": "range"
   },
   {
    "key": "oct1",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "octave 1"
   },
   {
    "key": "oct2",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "octave 2"
   }
  ]
 },
 "RACKAMP": {
  "name": "Rack Amp",
  "params": [
   {
    "key": "pre",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "preamp"
   },
   {
    "key": "buzz",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "buzz"
   },
   {
    "key": "punch",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "punch"
   },
   {
    "key": "crunch",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "crunch"
   },
   {
    "key": "out",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "out gain"
   },
   {
    "key": "leq",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "low eq"
   },
   {
    "key": "cab",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "cab sim"
   }
  ]
 },
 "UKROCK": {
  "name": "UK Rock Amp",
  "params": [
   {
    "key": "gain",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "gains"
   },
   {
    "key": "bass",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "bass"
   },
   {
    "key": "mid",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "middle"
   },
   {
    "key": "treb",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "treble"
   },
   {
    "key": "mstr",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "master"
   },
   {
    "key": "out",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "out gain"
   },
   {
    "key": "cab",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "cab sim"
   }
  ]
 },
 "ANGEL": {
  "name": "Angel Amp",
  "params": [
   {
    "key": "gain",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "gains"
   },
   {
    "key": "bass",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "bass"
   },
   {
    "key": "mid",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "middle"
   },
   {
    "key": "treb",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "treble"
   },
   {
    "key": "mstr",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "master"
   },
   {
    "key": "out",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "out gain"
   },
   {
    "key": "cab",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "cab sim"
   },
   {
    "key": "midb",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "mid boost"
   },
   {
    "key": "bri",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "bright"
   },
   {
    "key": "bt",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "bottom"
   }
  ]
 },
 "JAZZC": {
  "name": "Jazz Clean Amp",
  "params": [
   {
    "key": "vol",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "volume"
   },
   {
    "key": "bass",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "bass"
   },
   {
    "key": "mid",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "middle"
   },
   {
    "key": "treb",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "treble"
   },
   {
    "key": "out",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "out gain"
   },
   {
    "key": "bri",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "bright"
   },
   {
    "key": "cab",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "cab sim"
   }
  ]
 },
 "DELUXE": {
  "name": "Deluxe Amp",
  "params": [
   {
    "key": "vol",
    "type": "linf",
    "min": 1,
    "max": 10,
    "steps": 91,
    "label": "volume"
   },
   {
    "key": "bass",
    "type": "linf",
    "min": 1,
    "max": 10,
    "steps": 91,
    "label": "bass"
   },
   {
    "key": "treb",
    "type": "linf",
    "min": 1,
    "max": 10,
    "steps": 91,
    "label": "treble"
   },
   {
    "key": "out",
    "type": "linf",
    "min": 1,
    "max": 10,
    "steps": 91,
    "label": "out gain"
   },
   {
    "key": "sag",
    "type": "linf",
    "min": 1,
    "max": 10,
    "steps": 91,
    "label": "sag"
   },
   {
    "key": "cab",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "cab sim"
   }
  ]
 },
 "BODY": {
  "name": "Bodyrez",
  "params": [
   {
    "key": "body",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "label": "body"
   }
  ]
 },
 "SOUL": {
  "name": "Soul Analogue",
  "params": [
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": 125,
    "steps": 126,
    "unit": "%",
    "label": "mix"
   },
   {
    "key": "lf",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "lo freq"
   },
   {
    "key": "lg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "lo gain"
   },
   {
    "key": "lmf",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "lm freq"
   },
   {
    "key": "lmf3",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "lm /3"
   },
   {
    "key": "lmq",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "lm q"
   },
   {
    "key": "lmg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "lm gain"
   },
   {
    "key": "hmf",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "hm freq"
   },
   {
    "key": "hmf3",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "hm x3"
   },
   {
    "key": "hmq",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "hm q"
   },
   {
    "key": "hmg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "hm gain"
   },
   {
    "key": "hf",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "hf freq"
   },
   {
    "key": "hg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "hf gain"
   }
  ]
 },
 "E88": {
  "name": "Even 88 Formant",
  "params": [
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": 125,
    "steps": 126,
    "unit": "%",
    "label": "mix"
   },
   {
    "key": "lf",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "lf freq"
   },
   {
    "key": "lg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "lf gain"
   },
   {
    "key": "lq",
    "type": "str",
    "options": [
     "LOW",
     "HIGH"
    ],
    "label": "lf q"
   },
   {
    "key": "lt",
    "type": "str",
    "options": [
     "BELL",
     "SHELV"
    ],
    "label": "lf type"
   },
   {
    "key": "lmf",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "lm freq"
   },
   {
    "key": "lmg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "lm gain"
   },
   {
    "key": "lmq",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "lm q"
   },
   {
    "key": "hmf",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "hm freq"
   },
   {
    "key": "hmg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "hm gain"
   },
   {
    "key": "hmq",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "hm q"
   },
   {
    "key": "hf",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "hm freq"
   },
   {
    "key": "hg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "hf gain"
   },
   {
    "key": "hq",
    "type": "str",
    "options": [
     "LOW",
     "HIG"
    ],
    "label": "hf q"
   },
   {
    "key": "ht",
    "type": "str",
    "options": [
     "BELL",
     "SHELV"
    ],
    "label": "hf type"
   }
  ]
 },
 "E84": {
  "name": "Even 84",
  "params": [
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": 125,
    "steps": 126,
    "unit": "%",
    "label": "mix"
   },
   {
    "key": "g",
    "type": "linf",
    "min": -20,
    "max": 20,
    "steps": 81,
    "unit": "dB",
    "label": "gain"
   },
   {
    "key": "lf",
    "type": "str",
    "options": [
     "OFF",
     "35",
     "60",
     "110",
     "220"
    ],
    "label": "lf freq"
   },
   {
    "key": "lg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "lf gain"
   },
   {
    "key": "mf",
    "type": "str",
    "options": [
     "OFF",
     "350",
     "700",
     "1k6",
     "3k2",
     "4k8",
     "7k2"
    ],
    "label": "mid freq"
   },
   {
    "key": "mg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "mid gain"
   },
   {
    "key": "mq",
    "type": "str",
    "options": [
     "LOW",
     "HIGH"
    ],
    "label": "mid q"
   },
   {
    "key": "hf",
    "type": "str",
    "options": [
     "10k",
     "12k",
     "16k",
     "OFF"
    ],
    "label": "hf freq"
   },
   {
    "key": "hg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "hf gain"
   }
  ]
 },
 "F110": {
  "name": "Fortissimo110",
  "params": [
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": 125,
    "steps": 126,
    "unit": "%",
    "label": "mix"
   },
   {
    "key": "peq",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "peq on"
   },
   {
    "key": "lmf",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "lm freq"
   },
   {
    "key": "lmg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "lm gain"
   },
   {
    "key": "lmq",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "lm q"
   },
   {
    "key": "lmf3",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "lm /3"
   },
   {
    "key": "hmf",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "hm freq"
   },
   {
    "key": "hmg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "hm gain"
   },
   {
    "key": "hmq",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "hm q"
   },
   {
    "key": "hmf3",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "hm x3"
   },
   {
    "key": "shv",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "shv on"
   },
   {
    "key": "lf",
    "type": "str",
    "options": [
     "33",
     "56",
     "95",
     "160",
     "270",
     "460"
    ],
    "label": "lf freq"
   },
   {
    "key": "lg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "lf gain"
   },
   {
    "key": "hf",
    "type": "str",
    "options": [
     "3k3",
     "4k7",
     "6k8",
     "10k",
     "15k",
     "18k"
    ],
    "label": "hf freq"
   },
   {
    "key": "hg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "hf q"
   },
   {
    "key": "g",
    "type": "linf",
    "min": -18,
    "max": 18,
    "steps": 73,
    "label": "gain"
   }
  ]
 },
 "PULSAR": {
  "name": "Pulsar",
  "params": [
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": 125,
    "steps": 126,
    "unit": "%",
    "label": "mix"
   },
   {
    "key": "eq1",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "eq1 on"
   },
   {
    "key": "1lb",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "lf boost"
   },
   {
    "key": "1latt",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "lf att"
   },
   {
    "key": "1lf",
    "type": "str",
    "options": [
     "20",
     "30",
     "60",
     "100"
    ],
    "unit": "Hz",
    "label": "lf freq"
   },
   {
    "key": "1hw",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "hf wid"
   },
   {
    "key": "1hb",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "hf boost"
   },
   {
    "key": "1hf",
    "type": "str",
    "options": [
     "3k",
     "4k",
     "5k",
     "8k",
     "10k",
     "12k",
     "16k"
    ],
    "unit": "Hz",
    "label": "hf freq"
   },
   {
    "key": "1hatt",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "hf att"
   },
   {
    "key": "1hattf",
    "type": "str",
    "options": [
     "5k",
     "10k",
     "20k"
    ],
    "label": "hf att"
   },
   {
    "key": "eq5",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "eq5 on"
   },
   {
    "key": "5lb",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "lm boost"
   },
   {
    "key": "5lf",
    "type": "str",
    "options": [
     "200",
     "300",
     "500",
     "700",
     "1k"
    ],
    "unit": "Hz",
    "label": "lf freq"
   },
   {
    "key": "5md",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "mid dip"
   },
   {
    "key": "5mf",
    "type": "str",
    "options": [
     "200",
     "300",
     "500",
     "700",
     "1k",
     "1k5",
     "2k",
     "3k",
     "4k",
     "5k",
     "7k"
    ],
    "unit": "Hz",
    "label": "mid freq"
   },
   {
    "key": "5hb",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "HM boost"
   },
   {
    "key": "5hf",
    "type": "str",
    "options": [
     "1k5",
     "2k",
     "3k",
     "4k",
     "5k"
    ],
    "unit": "Hz",
    "label": "hf freq"
   }
  ]
 },
 "MACH4": {
  "name": "Mach EQ4",
  "params": [
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": 125,
    "steps": 126,
    "unit": "%",
    "label": "mix"
   },
   {
    "key": "sub",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "sub"
   },
   {
    "key": "40",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "40"
   },
   {
    "key": "160",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "160"
   },
   {
    "key": "650",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "650"
   },
   {
    "key": "2k5",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101,
    "label": "2k5"
   },
   {
    "key": "air",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101,
    "label": "air"
   },
   {
    "key": "airm",
    "type": "str",
    "options": [
     "OFF",
     "2k5",
     "5k",
     "10k",
     "20k",
     "40k"
    ],
    "label": "air mode"
   },
   {
    "key": "again",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "auto"
   }
  ]
 },
 "C5-CMB": {
  "name": "Combinator",
  "params": [
   {
    "key": "thr",
    "type": "linf",
    "min": -40,
    "max": 0,
    "steps": 401,
    "unit": "dB",
    "label": "threshold"
   },
   {
    "key": "gain",
    "type": "linf",
    "min": -10,
    "max": 10,
    "steps": 201,
    "unit": "dB",
    "label": "gain"
   },
   {
    "key": "ratio",
    "type": "str",
    "options": [
     "1.1",
     "1.2",
     "1.3",
     "1.5",
     "1.7",
     "2.0",
     "2.5",
     "3.0",
     "3.5",
     "4.0",
     "5.0",
     "7.0",
     "10.0",
     "100.0"
    ],
    "unit": "ms",
    "label": "ratio"
   },
   {
    "key": "slope",
    "type": "str",
    "options": [
     "24",
     "48"
    ],
    "unit": "dB/Oct",
    "label": "slope"
   },
   {
    "key": "bandse l",
    "type": "int",
    "min": 1,
    "max": 5,
    "label": "selected band"
   },
   {
    "key": "att",
    "type": "linf",
    "min": 0,
    "max": 20,
    "steps": 21,
    "label": "attack"
   },
   {
    "key": "rel",
    "type": "logf",
    "min": 20,
    "max": 3000,
    "steps": 201,
    "unit": "ms",
    "label": "release"
   },
   {
    "key": "arel",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "auto release"
   },
   {
    "key": "sbc",
    "type": "linf",
    "min": 1,
    "max": 10,
    "steps": 10,
    "label": "sbc speed"
   },
   {
    "key": "sbcon",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "sbc on"
   },
   {
    "key": "thr_1",
    "type": "linf",
    "min": -10,
    "max": 10,
    "steps": 201,
    "unit": "dB",
    "label": "1-THR"
   },
   {
    "key": "thr_2",
    "type": "linf",
    "min": -10,
    "max": 10,
    "steps": 201,
    "unit": "dB",
    "label": "2-THR"
   },
   {
    "key": "thr_3",
    "type": "linf",
    "min": -10,
    "max": 10,
    "steps": 201,
    "unit": "dB",
    "label": "3-THR"
   },
   {
    "key": "thr_4",
    "type": "linf",
    "min": -10,
    "max": 10,
    "steps": 201,
    "unit": "dB",
    "label": "4-THR"
   },
   {
    "key": "thr_5",
    "type": "linf",
    "min": -10,
    "max": 10,
    "steps": 201,
    "unit": "dB",
    "label": "5-THR"
   },
   {
    "key": "gain_1",
    "type": "linf",
    "min": -10,
    "max": 10,
    "steps": 201,
    "unit": "dB",
    "label": "1-GAIN"
   },
   {
    "key": "gain_2",
    "type": "linf",
    "min": -10,
    "max": 10,
    "steps": 201,
    "unit": "dB",
    "label": "2-GAIN"
   },
   {
    "key": "gain_3",
    "type": "linf",
    "min": -10,
    "max": 10,
    "steps": 201,
    "unit": "dB",
    "label": "3-GAIN"
   },
   {
    "key": "gain_4",
    "type": "linf",
    "min": -10,
    "max": 10,
    "steps": 201,
    "unit": "dB",
    "label": "4-GAIN"
   },
   {
    "key": "gain_5",
    "type": "linf",
    "min": -10,
    "max": 10,
    "steps": 201,
    "unit": "dB",
    "label": "5-GAIN"
   },
   {
    "key": "byp_1",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "1-BYP"
   },
   {
    "key": "byp_2",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "2-BYP"
   },
   {
    "key": "byp_3",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "3-BYP"
   },
   {
    "key": "byp_4",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "4-BYP"
   },
   {
    "key": "byp_5",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "5-BYP"
   },
   {
    "key": "width_1",
    "type": "linf",
    "min": -50,
    "max": 50,
    "steps": 101,
    "label": "1-XOVER"
   },
   {
    "key": "width_2",
    "type": "linf",
    "min": -50,
    "max": 50,
    "steps": 101,
    "label": "2-XOVER"
   },
   {
    "key": "width_3",
    "type": "linf",
    "min": -50,
    "max": 50,
    "steps": 101,
    "label": "3-XOVER"
   },
   {
    "key": "width_4",
    "type": "linf",
    "min": -50,
    "max": 50,
    "steps": 101,
    "label": "4-XOVER"
   },
   {
    "key": "width_5",
    "type": "linf",
    "min": -50,
    "max": 50,
    "steps": 101,
    "label": "5-XOVER"
   },
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "label": "mix"
   },
   {
    "key": "$bdsolo",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "band solo"
   }
  ]
 },
 "SUB-M": {
  "name": "Sub Monster",
  "params": [
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "label": "%mix"
   },
   {
    "key": "freq",
    "type": "linf",
    "min": 45,
    "max": 67.5,
    "steps": 226,
    "unit": "Hz",
    "label": "freq"
   },
   {
    "key": "bd1",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "band 1"
   },
   {
    "key": "bd2",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "band 2"
   },
   {
    "key": "bd3",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "band 3"
   },
   {
    "key": "bd4",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "band 4"
   },
   {
    "key": "bd5",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "band 5"
   }
  ]
 },
 "V-IMG": {
  "name": "Velvet Imager",
  "params": [
   {
    "key": "wid",
    "type": "linf",
    "min": -1,
    "max": 1,
    "steps": 201,
    "label": "width"
   },
   {
    "key": "st",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%",
    "label": "stereo"
   },
   {
    "key": "gain",
    "type": "linf",
    "min": -6,
    "max": 6,
    "steps": 49,
    "unit": "dB",
    "label": "gain"
   },
   {
    "key": "mode",
    "type": "str",
    "options": [
     "K",
     "VELVET"
    ],
    "label": "mode"
   },
   {
    "key": "deep",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "deep"
   }
  ]
 },
 "SPKMAN": {
  "name": "Speaker Manager",
  "params": [
   {
    "key": "hpf",
    "type": "logf",
    "min": 20,
    "max": 20000,
    "steps": 961,
    "unit": "Hz",
    "label": "high"
   },
   {
    "key": "hptype",
    "type": "str",
    "options": [
     "FLAT",
     "BW6",
     "BW12",
     "BS12",
     "LR12",
     "BW18",
     "BW24",
     "BS24",
     "LR24",
     "BW48",
     "LR48"
    ],
    "label": "type"
   },
   {
    "key": "lpf",
    "type": "logf",
    "min": 20,
    "max": 20000,
    "steps": 961,
    "unit": "Hz",
    "label": "low"
   },
   {
    "key": "lptype",
    "type": "str",
    "options": [
     "FLAT",
     "BW6",
     "BW12",
     "BS12",
     "LR12",
     "BW18",
     "BW24",
     "BS24",
     "LR24",
     "BW48",
     "LR48"
    ],
    "label": "type"
   },
   {
    "key": "tiltf",
    "type": "logf",
    "min": 100,
    "max": 10000,
    "steps": 121,
    "unit": "Hz",
    "label": "tilt"
   },
   {
    "key": "tiltg",
    "type": "linf",
    "min": -6,
    "max": 6,
    "steps": 121,
    "unit": "dB",
    "label": "tilt gain"
   },
   {
    "key": "phase",
    "type": "linf",
    "min": 0,
    "max": 180,
    "steps": 37,
    "label": "phase"
   },
   {
    "key": "invert ",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "invert"
   },
   {
    "key": "dist",
    "type": "linf",
    "min": 0,
    "max": 5,
    "steps": 501,
    "unit": "mtrs",
    "label": "distance"
   },
   {
    "key": "pos",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 1001,
    "unit": "mtrs",
    "label": "pos."
   },
   {
    "key": "dyneq",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "deq"
   },
   {
    "key": "dynthr",
    "type": "linf",
    "min": -60,
    "max": 0,
    "steps": 121,
    "unit": "dB",
    "label": "threshold"
   },
   {
    "key": "deqratio",
    "type": "str",
    "options": [
     "1.20",
     "1.30",
     "1.50",
     "2.00",
     "3.00",
     "5.00",
     "10.00"
    ],
    "label": "ratio"
   },
   {
    "key": "deqatt",
    "type": "linf",
    "min": 0,
    "max": 200,
    "steps": 201,
    "unit": "ms",
    "label": "attack"
   },
   {
    "key": "deqrel",
    "type": "logf",
    "min": 20,
    "max": 4000,
    "steps": 130,
    "unit": "ms",
    "label": "release"
   },
   {
    "key": "deqfilt",
    "type": "str",
    "options": [
     "OFF",
     "BP",
     "LP6",
     "LP12",
     "HP6",
     "HP12"
    ]
   },
   {
    "key": "deqg",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 301,
    "unit": "dB",
    "label": "gain"
   },
   {
    "key": "deqf",
    "type": "logf",
    "min": 20,
    "max": 20000,
    "steps": 961,
    "unit": "Hz",
    "label": "freq"
   },
   {
    "key": "deqq",
    "type": "logf",
    "min": 0.44,
    "max": 10,
    "steps": 181,
    "label": "qual"
   },
   {
    "key": "deqmode",
    "type": "str",
    "options": [
     "low",
     "high"
    ],
    "label": "mode"
   },
   {
    "key": "lim",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "limiter"
   },
   {
    "key": "limthr",
    "type": "linf",
    "min": -24,
    "max": 0,
    "steps": 241,
    "unit": "dB",
    "label": "threshold"
   },
   {
    "key": "limrms",
    "type": "int",
    "min": 0,
    "max": 1,
    "label": "rms"
   },
   {
    "key": "limrel",
    "type": "logf",
    "min": 50,
    "max": 2000,
    "steps": 121,
    "unit": "ms",
    "label": "release"
   }
  ]
 },
 "DEQ3": {
  "name": "Triple Dynamic EQ",
  "params": [
   {
    "key": "1-thr",
    "type": "linf",
    "min": -60,
    "max": 0,
    "steps": 121,
    "unit": "dB",
    "label": "threshold 1"
   },
   {
    "key": "1-ratio",
    "type": "str",
    "options": [
     "1.20",
     "1.30",
     "1.50",
     "2.00",
     "3.00",
     "5.00",
     "10.00"
    ],
    "unit": "ms",
    "label": "ratio 1"
   },
   {
    "key": "1-att",
    "type": "linf",
    "min": 0,
    "max": 200,
    "steps": 201,
    "unit": "ms",
    "label": "att 1"
   },
   {
    "key": "1-rel",
    "type": "logf",
    "min": 20,
    "max": 4000,
    "steps": 130,
    "unit": "ms",
    "label": "rel 1"
   },
   {
    "key": "1-filt",
    "type": "str",
    "options": [
     "OFF",
     "BP",
     "LP6",
     "LP12",
     "HP6",
     "HP12"
    ]
   },
   {
    "key": "1-g",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 301,
    "unit": "dB",
    "label": "gain 1"
   },
   {
    "key": "1-f",
    "type": "logf",
    "min": 20,
    "max": 20000,
    "steps": 961,
    "unit": "Hz",
    "label": "freq 1"
   },
   {
    "key": "1-q",
    "type": "logf",
    "min": 0.44,
    "max": 10,
    "steps": 181,
    "label": "qual 1"
   },
   {
    "key": "1-mode",
    "type": "str",
    "options": [
     "low",
     "high"
    ],
    "label": "mode 1"
   },
   {
    "key": "2-thr",
    "type": "linf",
    "min": -60,
    "max": 0,
    "steps": 121,
    "unit": "dB",
    "label": "threshold 2"
   },
   {
    "key": "2-ratio",
    "type": "str",
    "options": [
     "1.20",
     "1.30",
     "1.50",
     "2.00",
     "3.00",
     "5.00",
     "10.00"
    ],
    "unit": "ms",
    "label": "ratio 2"
   },
   {
    "key": "2-att",
    "type": "linf",
    "min": 0,
    "max": 200,
    "steps": 201,
    "unit": "ms",
    "label": "att 2"
   },
   {
    "key": "2-rel",
    "type": "logf",
    "min": 20,
    "max": 4000,
    "steps": 130,
    "unit": "ms",
    "label": "rel 2"
   },
   {
    "key": "2-filt",
    "type": "str",
    "options": [
     "OFF",
     "BP",
     "LP6",
     "LP12",
     "HP6",
     "HP12"
    ]
   },
   {
    "key": "2-g",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 301,
    "unit": "dB",
    "label": "gain 2"
   },
   {
    "key": "2-f",
    "type": "logf",
    "min": 20,
    "max": 20000,
    "steps": 961,
    "unit": "Hz",
    "label": "freq 2"
   },
   {
    "key": "2-q",
    "type": "logf",
    "min": 0.44,
    "max": 10,
    "steps": 181,
    "label": "qual 2"
   },
   {
    "key": "2-mode",
    "type": "str",
    "options": [
     "low",
     "high"
    ],
    "label": "mode 2"
   },
   {
    "key": "3-thr",
    "type": "linf",
    "min": -60,
    "max": 0,
    "steps": 121,
    "unit": "dB",
    "label": "threshold 3"
   },
   {
    "key": "3-ratio",
    "type": "str",
    "options": [
     "1.20",
     "1.30",
     "1.50",
     "2.00",
     "3.00",
     "5.00",
     "10.00"
    ],
    "unit": "ms",
    "label": "ratio 3"
   },
   {
    "key": "3-att",
    "type": "linf",
    "min": 0,
    "max": 200,
    "steps": 201,
    "unit": "ms",
    "label": "att 3"
   },
   {
    "key": "3-rel",
    "type": "logf",
    "min": 20,
    "max": 4000,
    "steps": 130,
    "unit": "ms",
    "label": "rel 3"
   },
   {
    "key": "3-filt",
    "type": "str",
    "options": [
     "OFF",
     "BP",
     "LP6",
     "LP12",
     "HP6",
     "HP12"
    ]
   },
   {
    "key": "3-g",
    "type": "linf",
    "min": -15,
    "max": 15,
    "steps": 301,
    "unit": "dB",
    "label": "gain 3"
   },
   {
    "key": "3-f",
    "type": "logf",
    "min": 20,
    "max": 20000,
    "steps": 961,
    "unit": "Hz",
    "label": "freq 3"
   },
   {
    "key": "3-q",
    "type": "logf",
    "min": 0.44,
    "max": 10,
    "steps": 181,
    "label": "qual 3"
   },
   {
    "key": "3-mode",
    "type": "str",
    "options": [
     "low",
     "high"
    ],
    "label": "mode 3"
   }
  ]
 },
 "*EVEN*": {
  "name": "Even Channel",
  "params": [
   {
    "key": "g_thr",
    "type": "linf",
    "min": -40,
    "max": 0,
    "steps": 81,
    "unit": "dB"
   },
   {
    "key": "g_hyst",
    "type": "linf",
    "min": 0,
    "max": 25,
    "steps": 51,
    "unit": "dB"
   },
   {
    "key": "g_range",
    "type": "linf",
    "min": 0,
    "max": 60,
    "steps": 61,
    "unit": "dB"
   },
   {
    "key": "g_rel",
    "type": "logf",
    "min": 100,
    "max": 3000,
    "steps": 130,
    "unit": "ms"
   },
   {
    "key": "g_fast",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "g_m40",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "g_on",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "eq_on",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "lf",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "lg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101
   },
   {
    "key": "lq",
    "type": "str",
    "options": [
     "LOW",
     "HIGH"
    ]
   },
   {
    "key": "lt",
    "type": "str",
    "options": [
     "BELL",
     "SHELV"
    ]
   },
   {
    "key": "lmf",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "lmg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101
   },
   {
    "key": "lmq",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "hmf",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "hmg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101
   },
   {
    "key": "hmq",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "hf",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "hg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101
   },
   {
    "key": "hq",
    "type": "str",
    "options": [
     "LOW",
     "HIGH"
    ]
   },
   {
    "key": "ht",
    "type": "str",
    "options": [
     "BELL",
     "SHELV"
    ]
   },
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": null,
    "steps": 126
   },
   {
    "key": "d_lon",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "d_lthr",
    "type": "linf",
    "min": -12,
    "max": 0,
    "steps": 25,
    "unit": "dB"
   },
   {
    "key": "d_lrec",
    "type": "str",
    "options": [
     "50",
     "100",
     "200",
     "800",
     "A1",
     "A2"
    ]
   },
   {
    "key": "d_lfast",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "d_con",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "d_cthr",
    "type": "linf",
    "min": -35,
    "max": -5,
    "steps": 61,
    "unit": "dB"
   },
   {
    "key": "d_ratio",
    "type": "str",
    "options": [
     "1.5",
     "2.0",
     "3.0",
     "4.0",
     "6.0"
    ]
   },
   {
    "key": "d_crec",
    "type": "str",
    "options": [
     "100",
     "400",
     "800",
     "1500",
     "A1",
     "A2"
    ]
   },
   {
    "key": "d_cfast",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "d_gain",
    "type": "linf",
    "min": -6,
    "max": 12,
    "steps": 37,
    "unit": "dB"
   }
  ]
 },
 "*SOUL*": {
  "name": "Soul Channel",
  "params": [
   {
    "key": "g_thr",
    "type": "linf",
    "min": -40,
    "max": 0,
    "steps": 81,
    "unit": "dB"
   },
   {
    "key": "g_range",
    "type": "linf",
    "min": 0,
    "max": 40,
    "steps": 41,
    "unit": "dB"
   },
   {
    "key": "g_hld",
    "type": "logf",
    "min": 10,
    "max": 4000,
    "steps": 130,
    "unit": "ms"
   },
   {
    "key": "g_rel",
    "type": "logf",
    "min": 100,
    "max": 4000,
    "steps": 130,
    "unit": "ms"
   },
   {
    "key": "g_fast",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "g_mode",
    "type": "str",
    "options": [
     "GATE",
     "EXP"
    ]
   },
   {
    "key": "g_on",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "eq_on",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "lf",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "lg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101
   },
   {
    "key": "lmf",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "lmf3",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "lmq",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "lmg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101
   },
   {
    "key": "hmf",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "hmf3",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "hmq",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "hmg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101
   },
   {
    "key": "hf",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "hg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101
   },
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": null,
    "steps": 126
   },
   {
    "key": "d_on",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "d_thr",
    "type": "linf",
    "min": -30,
    "max": 18,
    "steps": 97,
    "unit": "dB"
   },
   {
    "key": "d_ratio",
    "type": "str",
    "options": [
     "1.3",
     "1.4",
     "1.6",
     "1.8",
     "2.0",
     "2.5",
     "2.8",
     "3.3",
     "4.0",
     "5.0",
     "6.0",
     "7.0",
     "9.0",
     "12",
     "20",
     "50",
     "100"
    ]
   },
   {
    "key": "d_fast",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "d_rel",
    "type": "logf",
    "min": 100,
    "max": 4000,
    "steps": 65,
    "unit": "ms"
   },
   {
    "key": "d_peak",
    "type": "int",
    "min": 0,
    "max": 1
   }
  ]
 },
 "*VINTAGE*": {
  "name": "Vintage Channel",
  "params": [
   {
    "key": "d_in",
    "type": "linf",
    "min": -48,
    "max": 0,
    "steps": 97,
    "unit": "dB"
   },
   {
    "key": "d_out",
    "type": "linf",
    "min": -48,
    "max": 0,
    "steps": 97,
    "unit": "dB"
   },
   {
    "key": "d_att",
    "type": "linf",
    "min": 1,
    "max": 7,
    "steps": 61
   },
   {
    "key": "d_rel",
    "type": "linf",
    "min": 1,
    "max": 7,
    "steps": 61
   },
   {
    "key": "d_ratio",
    "type": "str",
    "options": [
     "4",
     "8",
     "12",
     "20",
     "ALL"
    ]
   },
   {
    "key": "d_on",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "eq1",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "1lb",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "1latt",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "1lf",
    "type": "str",
    "options": [
     "20",
     "30",
     "60",
     "100"
    ]
   },
   {
    "key": "1hw",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "1hb",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "1hf",
    "type": "str",
    "options": [
     "3k",
     "4k",
     "5k",
     "8k",
     "10k",
     "12k",
     "16k"
    ]
   },
   {
    "key": "1hatt",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "1hattf",
    "type": "str",
    "options": [
     "5k",
     "10k",
     "20k"
    ]
   },
   {
    "key": "eq5",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "5lb",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "5lf",
    "type": "str",
    "options": [
     "200",
     "300",
     "500",
     "700",
     "1k"
    ]
   },
   {
    "key": "5md",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "5mf",
    "type": "str",
    "options": [
     "200",
     "300",
     "500",
     "700",
     "1k",
     "1k5",
     "2k",
     "3k",
     "4k",
     "5k",
     "7k"
    ]
   },
   {
    "key": "5hb",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 101
   },
   {
    "key": "5hf",
    "type": "str",
    "options": [
     "1k5",
     "2k",
     "3k",
     "4k",
     "5k"
    ]
   },
   {
    "key": "l_ingain",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101
   },
   {
    "key": "l_peak",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101
   },
   {
    "key": "l_mode",
    "type": "str",
    "options": [
     "COMP",
     "LIM"
    ]
   },
   {
    "key": "l_on",
    "type": "int",
    "min": 0,
    "max": 1
   }
  ]
 },
 "*BUS*": {
  "name": "Bus Channel",
  "params": [
   {
    "key": "w_drv",
    "type": "linf",
    "min": 10,
    "max": 125,
    "steps": 116,
    "unit": "%"
   },
   {
    "key": "w_hrm",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201
   },
   {
    "key": "w_col",
    "type": "linf",
    "min": -1,
    "max": 1,
    "steps": 41
   },
   {
    "key": "w_trim",
    "type": "linf",
    "min": -18,
    "max": 6,
    "steps": 49,
    "unit": "dB"
   },
   {
    "key": "w_mix",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%"
   },
   {
    "key": "w_on",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "eq_on",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "g",
    "type": "linf",
    "min": -20,
    "max": 20,
    "steps": 81,
    "unit": "dB"
   },
   {
    "key": "lf",
    "type": "str",
    "options": [
     "OFF",
     "35",
     "60",
     "110",
     "220"
    ]
   },
   {
    "key": "lg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101
   },
   {
    "key": "mf",
    "type": "str",
    "options": [
     "OFF",
     "350",
     "700",
     "1k6",
     "3k2",
     "4k8",
     "7k2"
    ]
   },
   {
    "key": "mg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101
   },
   {
    "key": "mq",
    "type": "str",
    "options": [
     "LOW",
     "HIGH"
    ]
   },
   {
    "key": "hf",
    "type": "str",
    "options": [
     "10k",
     "12k",
     "16k",
     "OFF"
    ]
   },
   {
    "key": "hg",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 101
   },
   {
    "key": "mix",
    "type": "linf",
    "min": 0,
    "max": null,
    "steps": 126
   },
   {
    "key": "d_thr",
    "type": "linf",
    "min": -40,
    "max": 0,
    "steps": 81,
    "unit": "dB"
   },
   {
    "key": "d_ratio",
    "type": "str",
    "options": [
     "1.5",
     "2.0",
     "3.0",
     "4.0",
     "5.0",
     "10"
    ]
   },
   {
    "key": "d_att",
    "type": "str",
    "options": [
     "0.1",
     "0.3",
     "1.0",
     "3.0",
     "10.0",
     "30.0"
    ]
   },
   {
    "key": "d_rel",
    "type": "str",
    "options": [
     "0.1",
     "0.2",
     "0.4",
     "0.8",
     "1.6",
     "AUTO"
    ]
   },
   {
    "key": "d_gain",
    "type": "linf",
    "min": -6,
    "max": 12,
    "steps": 37,
    "unit": "dB"
   },
   {
    "key": "d_on",
    "type": "int",
    "min": 0,
    "max": 1
   }
  ]
 },
 "*MASTER*": {
  "name": "Mastering",
  "params": [
   {
    "key": "t_drv",
    "type": "linf",
    "min": -5,
    "max": 25,
    "steps": 61,
    "unit": "dB"
   },
   {
    "key": "t_spd",
    "type": "logf",
    "min": 7.5,
    "max": 30,
    "steps": 65
   },
   {
    "key": "t_low",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "t_hi",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "t_on",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "sub",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 201
   },
   {
    "key": "40",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 201
   },
   {
    "key": "160",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 201
   },
   {
    "key": "650",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 201
   },
   {
    "key": "2k5",
    "type": "linf",
    "min": -5,
    "max": 5,
    "steps": 201
   },
   {
    "key": "air",
    "type": "linf",
    "min": 0,
    "max": 10,
    "steps": 201
   },
   {
    "key": "airm",
    "type": "str",
    "options": [
     "OFF",
     "2k5",
     "5k",
     "10k",
     "20k",
     "40k"
    ]
   },
   {
    "key": "eq_on",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "e_stlvl",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "unit": "%"
   },
   {
    "key": "e_lmf",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "unit": "%"
   },
   {
    "key": "e_mlvl",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "unit": "%"
   },
   {
    "key": "e_st",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "unit": "%"
   },
   {
    "key": "e_m",
    "type": "linf",
    "min": -100,
    "max": 100,
    "steps": 201,
    "unit": "%"
   },
   {
    "key": "e_bass",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%"
   },
   {
    "key": "e_mid",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%"
   },
   {
    "key": "e_high",
    "type": "linf",
    "min": 0,
    "max": 100,
    "steps": 101,
    "unit": "%"
   },
   {
    "key": "e_bassf",
    "type": "linf",
    "min": 1,
    "max": 50,
    "steps": 50
   },
   {
    "key": "e_midq",
    "type": "linf",
    "min": 1,
    "max": 50,
    "steps": 50
   },
   {
    "key": "e_highf",
    "type": "linf",
    "min": 1,
    "max": 50,
    "steps": 50
   },
   {
    "key": "e_on",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "l_gin",
    "type": "linf",
    "min": 0,
    "max": 18,
    "steps": 73,
    "unit": "dB"
   },
   {
    "key": "l_gout",
    "type": "linf",
    "min": -18,
    "max": 0,
    "steps": 73,
    "unit": "dB"
   },
   {
    "key": "l_sqz",
    "type": "int",
    "min": 0,
    "max": 100
   },
   {
    "key": "l_knee",
    "type": "int",
    "min": 0,
    "max": 10
   },
   {
    "key": "l_again",
    "type": "int",
    "min": 0,
    "max": 1
   },
   {
    "key": "l_att",
    "type": "linf",
    "min": 0.05,
    "max": 1,
    "steps": 96,
    "unit": "ms"
   },
   {
    "key": "l_rel",
    "type": "logf",
    "min": 20,
    "max": 2000,
    "steps": 101,
    "unit": "ms"
   },
   {
    "key": "l_on",
    "type": "int",
    "min": 0,
    "max": 1
   }
  ]
 }
};
