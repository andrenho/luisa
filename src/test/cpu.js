function encode(line, acceptLabel=false, labelPrefix = '') {

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

  [ 0x8A, 'swap', 'reg', 'reg' ],

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
  [ 0x88, 'halt' ],
  [ 0x89, 'dbg' ],
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

function makeCPU() {
  const m = new Motherboard();
  m.addDevice(new MMU(new RAM(256)));
  const c = new CPU(m);
  m.addDevice(c);
  return [m, c];
}


test('CPU: Sanity check', t => {
  let m, c;
  t.doesNotThrow(() => [m, c] = makeCPU(), null, 'CPU is created without errors');
  c.A = 24;
  c.FL = 0b10;
  t.equal(c.A, 24, 'register setter/getter');
  t.pass(c.V, 'flag bits set correctly');
  t.equal(c.PC, 0, 'CPU init address');
  t.end();
});


test('CPU: Get register contents from memory', t => {
  const [mb, cpu] = makeCPU();
  cpu.K = 0xABCDEF01;
  t.equal(cpu.CPU_K, 0xF0002038, 'CPU_K == 0xF0002038');
  t.equal(mb.get32(cpu.CPU_K), 0xABCDEF01, 'read register from memory');
  mb.set32(cpu.CPU_K, 0x12345678);
  t.equal(cpu.K, 0x12345678, 'set register from memory');
  t.equal(mb.get32(cpu.CPU_K), 0x12345678, 'set and then read register from memory');
  t.end();
});


test('CPU: Execute valid basic commands', t => {
  let [mb, cpu] = makeCPU();

  function opc(s, pre) {
    mb.reset();
    if(pre) { 
      pre(); 
    }
    mb.setArray(0, Debugger.encode(s));
    let r = `[0x${mb.get(0) < 0x10 ? '0' : ''}${mb.get(0).toString(16)}] ` + s;
    mb.step();
    return r;
  }

  let s;

  // 
  // MOV
  //
  t.comment('Register movement (mov)');

  s = opc('mov A, B', () => cpu.B = 0x42); 
  t.equal(cpu.A, 0x42, s);
  t.equal(cpu.PC, 3, 'checking PC position');

  s = opc('mov A, 0x34'); 
  t.equal(cpu.A, 0x34, s);
  
  s = opc('mov A, 0x1234'); 
  t.equal(cpu.A, 0x1234, s);
  
  s = opc('mov A, 0xFABC1234'); 
  t.equal(cpu.A, 0xFABC1234, s);

  t.comment('Test movement flags');
  
  s = opc('mov A, 0');
  t.true(cpu.Z, 'cpu.Z = 1');
  t.true(cpu.P, 'cpu.P = 1');
  t.false(cpu.S, 'cpu.S = 0');

  s = opc('mov A, 0xF0000001');
  t.false(cpu.Z, 'cpu.Z = 0');
  t.false(cpu.P, 'cpu.P = 0');
  t.true(cpu.S, 'cpu.S = 1');

  // 
  // MOVB
  //
  
  t.comment('8-bit movement (movb)');

  s = opc('movb A, [B]', () => { cpu.B = 0x1000; mb.set(cpu.B, 0xAB); }); 
  t.equal(cpu.A, 0xAB, s);
  
  s = opc('movb A, [0x1000]', () => mb.set(0x1000, 0xAB));
  t.equal(cpu.A, 0xAB, s);

  s = opc('movb [A], A', () => cpu.A = 0x64);
  t.equal(mb.get(0x64), 0x64, s);

  s = opc('movb [A], 0xFA', () => cpu.A = 0x64);
  t.equal(mb.get(0x64), 0xFA, s);

  s = opc('movb [A], [B]', () => { cpu.A = 0x32; cpu.B = 0x64; mb.set(0x64, 0xFF); });
  t.equal(mb.get(0x32), 0xFF, s);

  s = opc('movb [A], [0x6420]', () => { cpu.A = 0x32; mb.set(0x6420, 0xFF); });
  t.equal(mb.get(0x32), 0xFF, s);

  s = opc('movb [0x64], A', () => cpu.A = 0xAC32);
  t.equal(mb.get(0x64), 0x32, s);

  s = opc('movb [0x64], 0xF0');
  t.equal(mb.get(0x64), 0xF0, s);
  
  s = opc('movb [0xCC64], [A]', () => { 
    cpu.A = 0xF000; mb.set(0xF000, 0x42); 
  });
  t.equal(mb.get(0xCC64), 0x42, s);
  
  s = opc('movb [0x64], [0xABF0]', () => { 
    mb.set32(0xABF0, 0x1234); mb.set(0x1234, 0x3F);
  });
  t.equal(mb.get(0x64), 0x3F, s);

  // 
  // MOVW
  //
  
  t.comment('16-bit movement (movw)');
  
  s = opc('movw A, [B]', () => { cpu.B = 0x1000; mb.set16(cpu.B, 0xABCD); }); 
  t.equal(cpu.A, 0xABCD, s);
  
  s = opc('movw A, [0x1000]', () => mb.set16(0x1000, 0xABCD));
  t.equal(cpu.A, 0xABCD, s);

  s = opc('movw [A], A', () => cpu.A = 0x6402);
  t.equal(mb.get16(0x6402), 0x6402, s);

  s = opc('movw [A], 0xFABA', () => cpu.A = 0x64);
  t.equal(mb.get16(0x64), 0xFABA, s);

  s = opc('movw [A], [B]', () => { cpu.A = 0x32CC; cpu.B = 0x64; mb.set16(0x64, 0xFFAB); });
  t.equal(mb.get16(0x32CC), 0xFFAB, s);

  s = opc('movw [A], [0x6420]', () => { cpu.A = 0x32; mb.set16(0x6420, 0xFFAC); });
  t.equal(mb.get16(0x32), 0xFFAC, s);

  s = opc('movw [0x64], A', () => cpu.A = 0xAB32AC);
  t.equal(mb.get16(0x64), 0x32AC, s);

  s = opc('movw [0x64], 0xF0FA');
  t.equal(mb.get16(0x64), 0xF0FA, s);
  
  s = opc('movw [0xCC64], [A]', () => { 
    cpu.A = 0xF000; mb.set16(0xF000, 0x4245); 
  });
  t.equal(mb.get16(0xCC64), 0x4245, s);
  
  s = opc('movw [0x64], [0xABF0]', () => { 
    mb.set32(0xABF0, 0x1234); mb.set16(0x1234, 0x3F54);
  });
  t.equal(mb.get16(0x64), 0x3F54, s);

  // 
  // MOVD
  //

  t.comment('32-bit movement (movd)');
  
  s = opc('movd A, [B]', () => { cpu.B = 0x1000; mb.set32(cpu.B, 0xABCDEF01); }); 
  t.equal(cpu.A, 0xABCDEF01, s);
  
  s = opc('movd A, [0x1000]', () => mb.set32(0x1000, 0xABCDEF01));
  t.equal(cpu.A, 0xABCDEF01, s);

  s = opc('movd [A], A', () => cpu.A = 0x16402);
  t.equal(mb.get32(0x16402), 0x16402, s);

  s = opc('movd [A], 0xFABA1122', () => cpu.A = 0x64);
  t.equal(mb.get32(0x64), 0xFABA1122, s);

  s = opc('movd [A], [B]', () => { cpu.A = 0x32CC; cpu.B = 0x64; mb.set32(0x64, 0xFFAB5678); });
  t.equal(mb.get32(0x32CC), 0xFFAB5678, s);

  s = opc('movd [A], [0x6420]', () => { cpu.A = 0x32; mb.set32(0x6420, 0xFFAC9876); });
  t.equal(mb.get32(0x32), 0xFFAC9876, s);

  s = opc('movd [0x64], A', () => cpu.A = 0xAB32AC44);
  t.equal(mb.get32(0x64), 0xAB32AC44, s);

  s = opc('movd [0x64], 0xF0FA1234');
  t.equal(mb.get32(0x64), 0xF0FA1234, s);
  
  s = opc('movd [0xCC64], [A]', () => { 
    cpu.A = 0xF000; mb.set32(0xF000, 0x4245AABB); 
  });
  t.equal(mb.get32(0xCC64), 0x4245AABB, s);
  
  s = opc('movd [0x64], [0xABF0]', () => { 
    mb.set32(0xABF0, 0x1234); mb.set32(0x1234, 0x3F54FABC);
  });
  t.equal(mb.get32(0x64), 0x3F54FABC, s);

  //
  // LOGIC OPERATIONS
  //

  t.comment('Logic operations');

  s = opc('or A, B', () => { cpu.A = 0b1010; cpu.B = 0b1100; });
  t.equal(cpu.A, 0b1110, s);
  t.false(cpu.S, "cpu.S == 0");
  t.true(cpu.P, "cpu.P == 1");
  t.false(cpu.Z, "cpu.Z == 0");
  t.false(cpu.Y, "cpu.Y == 0");
  t.false(cpu.V, "cpu.V == 0");

  s = opc('or A, 0x4', () => { cpu.A = 0b11; });
  t.equal(cpu.A, 0b111, s);

  s = opc('or A, 0x4000', () => { cpu.A = 0b111; });
  t.equal(cpu.A, 0x4007, s);

  s = opc('or A, 0x2A426653', () => { cpu.A = 0x10800000; });
  t.equal(cpu.A, 0x3AC26653, s);

  s = opc('xor A, B', () => { cpu.A = 0b1010; cpu.B = 0b1100; });
  t.equal(cpu.A, 0b110, s);

  s = opc('xor A, 0x4', () => { cpu.A = 0b11; });
  t.equal(cpu.A, 0b111, s);

  s = opc('xor A, 0xFF00', () => { cpu.A = 0xFF0; });
  t.equal(cpu.A, 0xF0F0, s);

  s = opc('xor A, 0x2A426653', () => { cpu.A = 0x148ABD12; });
  t.equal(cpu.A, 0x3EC8DB41, s);

  s = opc('and A, B', () => { cpu.A = 0b11; cpu.B = 0b1100; });
  t.equal(cpu.A, 0, s);
  t.true(cpu.Z, "cpu.Z == 1");

  s = opc('and A, 0x7', () => { cpu.A = 0b11; });
  t.equal(cpu.A, 0b11, s);

  s = opc('and A, 0xFF00', () => { cpu.A = 0xFF0; });
  t.equal(cpu.A, 0xF00, s);

  s = opc('and A, 0x2A426653', () => { cpu.A = 0x148ABD12; });
  t.equal(cpu.A, 0x22412, s);

  s = opc('shl A, B', () => { cpu.A = 0b10101010; cpu.B = 4; });
  t.equal(cpu.A, 0b101010100000, s);

  s = opc('shl A, 4', () => { cpu.A = 0b10101010;});
  t.equal(cpu.A, 0b101010100000, s);

  s = opc('shr A, B', () => { cpu.A = 0b10101010; cpu.B = 4; });
  t.equal(cpu.A, 0b1010, s);

  s = opc('shr A, 4', () => { cpu.A = 0b10101010; });
  t.equal(cpu.A, 0b1010, s);

  s = opc('not A', () => { cpu.A = 0b11001010; });
  t.equal(cpu.A, 0b11111111111111111111111100110101, s);

  //
  // integer math
  //

  t.comment('Integer arithmetic');
  
  s = opc('add A, B', () => { cpu.A = 0x12; cpu.B = 0x20; });
  t.equal(cpu.A, 0x32, s);
  
  s = opc('add A, 0x20', () => cpu.A = 0x12);
  t.equal(cpu.A, 0x32, s);

  s = opc('add A, 0x20', () => { cpu.A = 0x12, cpu.Y = true; });
  t.equal(cpu.A, 0x33, 'add A, 0x20 (with carry)');

  s = opc('add A, 0x2000', () => cpu.A = 0x12);
  t.equal(cpu.A, 0x2012, s);

  s = opc('add A, 0xF0000000', () => cpu.A = 0x10000012);
  t.equal(cpu.A, 0x12, s);
  t.true(cpu.Y, "cpu.Y == 1");

  s = opc('sub A, B', () => { cpu.A = 0x30; cpu.B = 0x20; });
  t.equal(cpu.A, 0x10, s);
  t.false(cpu.S, 'cpu.S == 0');

  s = opc('sub A, B', () => { cpu.A = 0x20; cpu.B = 0x30; });
  t.equal(cpu.A, 0xFFFFFFF0, 'sub A, B (negative)');
  t.true(cpu.S, 'cpu.S == 1');

  s = opc('sub A, 0x20', () => cpu.A = 0x22);
  t.equal(cpu.A, 0x2, s);

  s = opc('sub A, 0x20', () => { cpu.A = 0x22; cpu.Y = true; });
  t.equal(cpu.A, 0x1, 'sub A, 0x20 (with carry)');

  s = opc('sub A, 0x2000', () => cpu.A = 0x12);
  t.equal(cpu.A, 0xFFFFE012, s);
  t.true(cpu.S, 'cpu.S == 1');
  t.true(cpu.Y, 'cpu.Y == 1');

  s = opc('sub A, 0xF0000000', () => cpu.A = 0x10000012);
  t.equal(cpu.A, 0x20000012, s);
  t.true(cpu.Y, 'cpu.Y == 1');

  s = opc('cmp A, B');
  t.true(cpu.Z, s);

  s = opc('cmp A, 0x12');
  t.true(cpu.LT && !cpu.GT, s);

  s = opc('cmp A, 0x1234', () => cpu.A = 0x6000);
  t.true(!cpu.LT && cpu.GT, s);

  s = opc('cmp A, 0x12345678', () => cpu.A = 0xF0000000);
  t.true(!cpu.LT && cpu.GT, s);  // because of the signal!

  s = opc('mul A, B', () => { cpu.A = 0xF0; cpu.B = 0xF000; });
  t.equal(cpu.A, 0xE10000, s);

  s = opc('mul A, 0x12', () => cpu.A = 0x1234);
  t.equal(cpu.A, 0x147A8, s);

  s = opc('mul A, 0x12AF', () => cpu.A = 0x1234);
  t.equal(cpu.A, 0x154198C, s);
  t.false(cpu.V, 'cpu.V == 0');

  s = opc('mul A, 0x12AF87AB', () => cpu.A = 0x1234);
  t.equal(cpu.A, 0x233194BC, s);
  t.true(cpu.V, 'cpu.V == 1');

  s = opc('idiv A, B', () => { cpu.A = 0xF000; cpu.B = 0xF0; });
  t.equal(cpu.A, 0x100, s);

  s = opc('idiv A, 0x12', () => cpu.A = 0x1234);
  t.equal(cpu.A, 0x102, s);

  s = opc('idiv A, 0x2AF', () => cpu.A = 0x1234);
  t.equal(cpu.A, 0x6, s);

  s = opc('idiv A, 0x12AF', () => cpu.A = 0x123487AB);
  t.equal(cpu.A, 0xF971, s);

  s = opc('mod A, B', () => { cpu.A = 0xF000; cpu.B = 0xF0; });
  t.equal(cpu.A, 0x0, s);
  t.true(cpu.Z, 'cpu.Z == 1');

  s = opc('mod A, 0x12', () => cpu.A = 0x1234);
  t.equal(cpu.A, 0x10, s);

  s = opc('mod A, 0x2AF', () => cpu.A = 0x1234);
  t.equal(cpu.A, 0x21A, s);

  s = opc('mod A, 0x12AF', () => cpu.A = 0x123487AB);
  t.equal(cpu.A, 0x116C, s);

  s = opc('inc A', () => cpu.A = 0x42);
  t.equal(cpu.A, 0x43, s);

  s = opc('inc A', () => cpu.A = 0xFFFFFFFF);
  t.equal(cpu.A, 0x0, 'inc A (overflow)');
  t.true(cpu.Y, 'cpu.Y == 1');
  t.true(cpu.Z, 'cpu.Z == 1');

  s = opc('dec A', () => cpu.A = 0x42);
  t.equal(cpu.A, 0x41, s);

  s = opc('dec A', () => cpu.A = 0x0);
  t.equal(cpu.A, 0xFFFFFFFF, 'dec A (underflow)');
  t.false(cpu.Z, 'cpu.Z == 0');

  // 
  // branches
  //

  t.comment('Branch operations');

  s = opc('bz A', () => { cpu.Z = true; cpu.A = 0x1000; });
  t.equal(cpu.PC, 0x1000, s);

  s = opc('bz A', () => { cpu.A = 0x1000; });
  t.equal(cpu.PC, 0x2, 'bz A (false)');

  s = opc('bz 0x1000', () => cpu.Z = true);
  t.equal(cpu.PC, 0x1000, s);

  s = opc('bnz A', () => cpu.A = 0x1000);
  t.equal(cpu.PC, 0x1000, s);

  s = opc('bnz 0x1000');
  t.equal(cpu.PC, 0x1000, s);

  s = opc('bneg A', () => { cpu.S = true; cpu.A = 0x1000; });
  t.equal(cpu.PC, 0x1000, s);

  s = opc('bneg A', () => { cpu.A = 0x1000; });
  t.equal(cpu.PC, 0x2, 'bneg A (false)');

  s = opc('bneg 0x1000', () => cpu.S = true);
  t.equal(cpu.PC, 0x1000, s);

  s = opc('bpos A', () => cpu.A = 0x1000);
  t.equal(cpu.PC, 0x1000, s);

  s = opc('bpos 0x1000');
  t.equal(cpu.PC, 0x1000, s);

  s = opc('jmp 0x12345678');
  t.equal(cpu.PC, 0x12345678, s);
  

  // 
  // stack
  //

  t.comment('Stack operations');

  mb.reset();
  cpu.SP = 0xFFF; 
  cpu.A = 0xABCDEF12;

  mb.setArray(0x0, Debugger.encode('pushb A'));
  mb.setArray(0x2, Debugger.encode('pushb 0x12'));
  mb.setArray(0x4, Debugger.encode('pushw A'));
  mb.setArray(0x6, Debugger.encode('pushd A'));

  mb.setArray(0x8, Debugger.encode('popd B'));
  mb.setArray(0xA, Debugger.encode('popw B'));
  mb.setArray(0xC, Debugger.encode('popb B'));

  mb.setArray(0xE, Debugger.encode('popx 1'));

  mb.step();
  t.equal(mb.get(0xFFF), 0x12, 'pushb A');
  t.equal(cpu.SP, 0xFFE, 'SP = 0xFFE');

  mb.step();
  t.equal(mb.get(0xFFE), 0x12, 'pushb 0x12');
  t.equal(cpu.SP, 0xFFD, 'SP = 0xFFD');

  mb.step();
  t.equal(mb.get16(0xFFC), 0xEF12, s);
  t.equal(mb.get(0xFFD), 0xEF, s);
  t.equal(mb.get(0xFFC), 0x12, s);
  t.equal(cpu.SP, 0xFFB, 'SP = 0xFFB');

  mb.step();
  t.equal(mb.get32(0xFF8), 0xABCDEF12);
  t.equal(cpu.SP, 0xFF7, 'SP = 0xFF7');

  mb.step();
  t.equal(cpu.B, 0xABCDEF12, 'popd B');

  mb.step();
  t.equal(cpu.B, 0xEF12, 'popw B');

  mb.step();
  t.equal(cpu.B, 0x12, 'popb B');

  mb.step();
  t.equal(cpu.SP, 0xFFF, 'popx 1');

  // all registers
  s = opc('push.a', () => {
    cpu.SP = 0xFFF;
    cpu.A = 0xA1B2C3E4;
    cpu.B = 0xFFFFFFFF;
  });
  t.equal(cpu.SP, 0xFCF, s);
  t.equal(mb.get32(0xFFC), 0xA1B2C3E4, 'A is saved');
  t.equal(mb.get32(0xFF8), 0xFFFFFFFF, 'B is saved');
  
  s = opc('pop.a', () => {
    cpu.SP = 0xFCF;
    mb.set32(0xFFC, 0xA1B2C3E4);
    mb.set32(0xFF8, 0xFFFFFFFF);
  });
  t.equal(cpu.SP, 0xFFF, s);
  t.equal(cpu.A, 0xA1B2C3E4, 'A is restored');
  t.equal(cpu.B, 0xFFFFFFFF, 'B is restored');

  // others
  t.comment('Others');

  opc('nop');
  
  s = opc('dbg');
  t.true(cpu.activateDebugger, s);

  s = opc('halt');
  t.true(cpu.systemHalted, s);

  s = opc('swap A, B', () => {
    cpu.A = 0xA;
    cpu.B = 0xB;
  });
  t.true(cpu.A == 0xB && cpu.B == 0xA, s);

  t.end();

});


test('CPU: subroutines and system calls', t => {

  let [mb, cpu] = makeCPU();

  // jsr
  mb.reset();
  mb.setArray(0x200, Debugger.encode('jsr 0x1234'));
  mb.setArray(0x1234, Debugger.encode('ret'));
  cpu.PC = 0x200;
  cpu.SP = 0xFFF;
  mb.step();
  t.equal(cpu.PC, 0x1234, 'jsr 0x1234');
  t.equal(mb.get(0xFFC), 0x5, '[FFC] = 0x5');
  t.equal(mb.get(0xFFD), 0x2, '[FFD] = 0x2');
  t.equal(cpu.SP, 0xFFB, 'SP = 0xFFB');
  t.equal(mb.get32(0xFFC), 0x200 + 5, 'address in stack'); 

  mb.step();
  t.equal(cpu.PC, 0x205, 'ret');
  t.equal(cpu.SP, 0xFFF, 'SP = 0xFFF');

  // sys
  mb.reset();
  cpu.SP = 0xFFF;
  mb.setArray(0, Debugger.encode('sys 2'));
  mb.set32(cpu.CPU_SYSCALL_VECT + 8, 0x1000);
  t.equal(cpu._syscallVector[2], 0x1000, 'syscall vector');
  mb.setArray(0x1000, Debugger.encode('sret'));

  mb.step();
  t.equal(cpu.PC, 0x1000, 'sys 2');
  t.equal(cpu.SP, 0xFFB, 'SP = 0xFFD');
  mb.step();
  t.equal(cpu.PC, 0x2, 'sret');
  t.equal(cpu.SP, 0xFFF, 'SP = 0xFFF');

  t.end();

});


test('CPU: interrupts', t => {

  let [mb, cpu] = makeCPU();
  cpu.T = true;
  cpu.SP = 0x800;
  mb.set32(cpu.CPU_INTERRUPT_VECT + 8, 0x1000);
  mb.setArray(0x0, Debugger.encode('movb A, [0xE0000000]'));
  mb.setArray(0x1000, Debugger.encode('iret'));

  mb.step();  // cause the exception
  t.equal(cpu.PC, 0x1000, 'interrupt called');
  t.true(cpu.T, 'interrupts disabled');

  mb.step();  // iret
  t.equal(cpu.PC, 0x6, 'iret');
  t.true(cpu.T, 'interrupts enabled');

  t.end();

});


test('CPU: invalid opcode', t => {

  let [mb, cpu] = makeCPU();
  cpu.T = true;
  mb.set32(cpu.CPU_INTERRUPT_VECT + 12, 0x1000);
  mb.set(0x0, 0xFF);
  mb.step();
  t.equal(cpu.PC, 0x1000, 'interrupt called');

  t.end();

});



// vim: ts=2:sw=2:sts=2:expandtab
