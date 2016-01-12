export default function encode(line, acceptLabel=false, labelPrefix = '') {

  // separate operand and parameters
  let [operand, ...rest] = line.split(/[\s\t]+/);
  rest = rest.join('');

  // find parameters
  const parameters = rest.split(/[\s\t]*,[\s\t]*/).filter(s => s !== '');
  if (parameters.length > 2) {
    throw new Error('Invalid number of parameters.');
  }

  const pars = parameters.map(p => parseParameter(p, acceptLabel, labelPrefix));
  return parseOpcode(operand, pars, line);
}


// 
// OPCODES
//
let opcodes = [
  // movement
  [ 0x01, 'mov', 'reg', 'reg' ],
  [ 0x02, 'mov', 'reg', 'v8' ],
  [ 0x03, 'mov', 'reg', 'v16' ],
  [ 0x04, 'mov', 'reg', 'v32' ],
  [ 0x05, 'movb', 'reg', 'indreg' ],
  [ 0x06, 'movb', 'reg', 'indv32' ],
  [ 0x07, 'movw', 'reg', 'indreg' ],
  [ 0x08, 'movw', 'reg', 'indv32' ],
  [ 0x09, 'movd', 'reg', 'indreg' ],
  [ 0x0A, 'movd', 'reg', 'indv32' ],

  [ 0x0B, 'movb', 'indreg', 'reg' ],
  [ 0x0C, 'movb', 'indreg', 'v8' ],
  [ 0x0D, 'movb', 'indreg', 'indreg' ],
  [ 0x0E, 'movb', 'indreg', 'indv32' ],
  [ 0x0F, 'movw', 'indreg', 'reg' ],
  [ 0x1A, 'movw', 'indreg', 'v16' ],
  [ 0x1B, 'movw', 'indreg', 'indreg' ],
  [ 0x1C, 'movw', 'indreg', 'indv32' ],
  [ 0x1D, 'movd', 'indreg', 'reg' ],
  [ 0x1E, 'movd', 'indreg', 'v32' ],
  [ 0x1F, 'movd', 'indreg', 'indreg' ],
  [ 0x20, 'movd', 'indreg', 'indv32' ],

  [ 0x21, 'movb', 'indv32', 'reg' ],
  [ 0x22, 'movb', 'indv32', 'v8' ],
  [ 0x23, 'movb', 'indv32', 'indreg' ],
  [ 0x24, 'movb', 'indv32', 'indv32' ],
  [ 0x25, 'movw', 'indv32', 'reg' ],
  [ 0x26, 'movw', 'indv32', 'v16' ],
  [ 0x27, 'movw', 'indv32', 'indreg' ],
  [ 0x28, 'movw', 'indv32', 'indv32' ],
  [ 0x29, 'movd', 'indv32', 'reg' ],
  [ 0x2A, 'movd', 'indv32', 'v32' ],
  [ 0x2B, 'movd', 'indv32', 'indreg' ],
  [ 0x2C, 'movd', 'indv32', 'indv32' ],

  // logic
  [ 0x2D, 'or', 'reg', 'reg' ],
  [ 0x2E, 'or', 'reg', 'v8' ],
  [ 0x2F, 'or', 'reg', 'v16' ],
  [ 0x30, 'or', 'reg', 'v32' ],
  [ 0x31, 'xor', 'reg', 'reg' ],
  [ 0x32, 'xor', 'reg', 'v8' ],
  [ 0x33, 'xor', 'reg', 'v16' ],
  [ 0x34, 'xor', 'reg', 'v32' ],
  [ 0x35, 'and', 'reg', 'reg' ],
  [ 0x36, 'and', 'reg', 'v8' ],
  [ 0x37, 'and', 'reg', 'v16' ],
  [ 0x38, 'and', 'reg', 'v32' ],
  [ 0x39, 'shl', 'reg', 'reg' ],
  [ 0x3A, 'shl', 'reg', 'v8' ],
  [ 0x3D, 'shr', 'reg', 'reg' ],
  [ 0x3E, 'shr', 'reg', 'v8' ],
  [ 0x41, 'not', 'reg' ],

  // arithmetic
  [ 0x42, 'add', 'reg', 'reg' ],
  [ 0x43, 'add', 'reg', 'v8' ],
  [ 0x44, 'add', 'reg', 'v16' ],
  [ 0x45, 'add', 'reg', 'v32' ],
  [ 0x46, 'sub', 'reg', 'reg' ],
  [ 0x47, 'sub', 'reg', 'v8' ],
  [ 0x48, 'sub', 'reg', 'v16' ],
  [ 0x49, 'sub', 'reg', 'v32' ],
  [ 0x4A, 'cmp', 'reg', 'reg' ],
  [ 0x4B, 'cmp', 'reg', 'v8' ],
  [ 0x4C, 'cmp', 'reg', 'v16' ],
  [ 0x4D, 'cmp', 'reg', 'v32' ],
  [ 0x4E, 'mul', 'reg', 'reg' ],
  [ 0x4F, 'mul', 'reg', 'v8' ],
  [ 0x50, 'mul', 'reg', 'v16' ],
  [ 0x51, 'mul', 'reg', 'v32' ],
  [ 0x52, 'idiv', 'reg', 'reg' ],
  [ 0x53, 'idiv', 'reg', 'v8' ],
  [ 0x54, 'idiv', 'reg', 'v16' ],
  [ 0x55, 'idiv', 'reg', 'v32' ],
  [ 0x56, 'mod', 'reg', 'reg' ],
  [ 0x57, 'mod', 'reg', 'v8' ],
  [ 0x58, 'mod', 'reg', 'v16' ],
  [ 0x59, 'mod', 'reg', 'v32' ],
  [ 0x5A, 'inc', 'reg' ],
  [ 0x5B, 'dec', 'reg' ],

  // jumps
  [ 0x5C, 'bz', 'reg' ],
  [ 0x5D, 'bz', 'v32' ],
  [ 0x5C, 'beq', 'reg' ],
  [ 0x5D, 'beq', 'v32' ],
  [ 0x5E, 'bnz', 'reg' ],
  [ 0x5F, 'bnz', 'v32' ],
  [ 0x60, 'bneg', 'reg' ],
  [ 0x61, 'bneg', 'v32' ],
  [ 0x62, 'bpos', 'reg' ],
  [ 0x63, 'bpos', 'v32' ],
  [ 0x64, 'bgt', 'reg' ],
  [ 0x65, 'bgt', 'v32' ],
  [ 0x66, 'bgte', 'reg' ],
  [ 0x67, 'bgte', 'v32' ],
  [ 0x68, 'blt', 'reg' ],
  [ 0x69, 'blt', 'v32' ],
  [ 0x6A, 'blte', 'reg' ],
  [ 0x6B, 'blte', 'v32' ],
  [ 0x6C, 'bv', 'reg' ],
  [ 0x6D, 'bv', 'v32' ],
  [ 0x6E, 'bnv', 'reg' ],
  [ 0x6F, 'bnv', 'v32' ],
  [ 0x70, 'jmp', 'reg' ],
  [ 0x71, 'jmp', 'v32' ],
  [ 0x72, 'jsr', 'reg' ],
  [ 0x73, 'jsr', 'v32' ],
  [ 0x74, 'ret' ],
  [ 0x75, 'sys', 'reg' ],
  [ 0x76, 'sys', 'v8' ],
  [ 0x77, 'iret' ],
  [ 0x86, 'sret' ],

  // stack
  [ 0x78, 'pushb', 'reg' ],
  [ 0x79, 'pushb', 'v8' ],
  [ 0x7A, 'pushw', 'reg' ],
  [ 0x7B, 'pushw', 'v16' ],
  [ 0x7C, 'pushd', 'reg' ],
  [ 0x7D, 'pushd', 'v32' ],
  [ 0x7E, 'push.a' ],
  [ 0x7F, 'popb', 'reg' ],
  [ 0x80, 'popw', 'reg' ],
  [ 0x81, 'popd', 'reg' ],
  [ 0x82, 'pop.a' ],
  [ 0x83, 'popx', 'reg' ],
  [ 0x84, 'popx', 'v8' ],
  [ 0x85, 'popx', 'v9' ],

  // other
  [ 0x87, 'nop' ],
];

function parseOpcode(operand, pars, line) {
  // find opcode
  for(let op of opcodes) {
    let ptype = pars.map(p => (p ? p.type : undefined));
    if (operand.toLowerCase() === op[1] && ptype[0] === op[2] && ptype[1] === op[3]) {
      let a = [op[0]];
      if (pars[0]) a = a.concat(pars[0].array);
      if (pars[1]) a = a.concat(pars[1].array);
      return a;
    }
  }

  // if opcode wasn't found, and par is < v32, try to find higher value
  let increasePar = (p) => p.type === 'v16' ? { type: 'v32', array: p.array.concat([0,0]) } : { type: 'v16', array: p.array.concat([0]) };
  let canIncrease = (p) => p && (p.type === 'v8' || p.type === 'v16');

  if (canIncrease(pars[0])) {
    try { return parseOpcode(operand, [increasePar(pars[0]), pars[1]]); } catch(e) {}
  } else if (canIncrease(pars[1])) {
    try { return parseOpcode(operand, [pars[0], increasePar(pars[1])]); } catch(e) {}
  }
  if (canIncrease(pars[0]) && canIncrease(pars[1])) {
    try { return parseOpcode(operand, [increasePar(pars[0]), increasePar(pars[1])]); } catch(e) {}
  }

  throw new Error(`Invalid command ${line}.`);
}


// 
// PARSE PARAMETERS
// 
function parseParameter(p, acceptLabel, labelPrefix) {

  function registerValue(r) {
    switch (r) {
      case 'a': return 0;
      case 'b': return 1;
      case 'c': return 2;
      case 'd': return 3;
      case 'e': return 4;
      case 'f': return 5;
      case 'g': return 6;
      case 'h': return 7;
      case 'i': return 8;
      case 'j': return 9;
      case 'k': return 10;
      case 'l': return 11;
      case 'fp': return 12;
      case 'sp': return 13;
      case 'pc': return 14;
      case 'fl': return 15;
      default: 
        return -1;
    }
  }

  let [type, array] = [0, 'none', []];

  // if indirect, add indirection and return
  if (p.startsWith('[') && p.endsWith(']')) {
    let pp = parseParameter(p.slice(1, p.length - 1), acceptLabel, labelPrefix);
    if (pp.type === 'v8') {
      pp.array = pp.array.concat([0, 0, 0]);
      pp.type = 'v32';
    } else if (pp.type === 'v16') {
      pp.array = pp.array.concat([0, 0]);
      pp.type = 'v32';
    }
    pp.type = 'ind' + pp.type;
    return pp;
  }

  // if binary, convert to number
  if (/0b[01_]+/.test(p)) {
    p = parseInt(p.slice(2).replace('_', ''), 2).toString();
  }

  // is it a number?
  if (/^-?\d+$/.test(p) || /^0[Xx][\dA-Fa-f]+$/.test(p)) {
    let value = parseInt(p);
    if (value < 0) {
      value = value >>> 0;
    }
    if (value <= 0xFF) {
      type = 'v8';
      array = [value];
    } else if (value <= 0xFFFF) {
      type = 'v16';
      array = [value & 0xFF, value >> 8];
    } else if (value <= 0xFFFFFFFF) {
      type = 'v32';
      array = [value & 0xFF, (value >> 8) & 0xFF, (value >> 16) & 0xFF, (value >> 24) & 0xFF];
    } else {
      throw new Error('Values higher than 32-bit are unsupported.');
    }
  
  // is a register or label
  } else {
    const value = registerValue(p.toLowerCase());

    // is a register
    if (value >= 0) {
      type = 'reg';
      array = [value];

    // is a label
    } else if (acceptLabel) {
      type = 'v32';
      array = [p.startsWith('.') ? (labelPrefix + p) : p, 0, 0, 0];

    // its niether
    } else {
      throw new Error(`Could not understand expression '${p}'.`);
    }

  }

  return { type, array };
}

// vim: ts=2:sw=2:sts=2:expandtab
