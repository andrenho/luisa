import test from 'tape';

import { assemblyToLif, joinLifObjects } from '../utils/assembler.js';


test('LuisaVM assembler: valid inputs', t => {

  let file, result;

  // simplest file
  file = `
.section text
        nop       ; some comment`;
  result = {
    text: [0x87],
  };
  t.deepEquals(assemblyToLif(file), result, 'simplest file');

  // some useful code
  file = `
.section text
        mov     A, 0x4
        movb    A, [B]
        movb    A, [0x12345678]
        movd    [0xABCDEF01], [0x12345678]
        or      K, 0x4212
        not     F
        bz      0x42
        ret`;
  result = {
    text: [0x02, 0x00, 0x04,
           0x05, 0x00, 0x01,
           0x06, 0x00, 0x78, 0x56, 0x34, 0x12,
           0x2C, 0x01, 0xEF, 0xCD, 0xAB, 0x78, 0x56, 0x34, 0x12,
           0x2F, 0x0A, 0x12, 0x42,
           0x41, 0x05,
           0x5D, 0x42, 0x00, 0x00, 0x00,
           0x74],
  };
  t.deepEquals(assemblyToLif(file), result, 'useful code');


  // decimal, binary, hexa, negative numbers
  file = `
.section text
        mov     A, 42
        mov     A, 0x42
        mov     A, 0b1010_1111
        mov     A, -42`;
  result = {
    text: [0x02, 0x00, 0x2A,
           0x02, 0x00, 0x42,
           0x02, 0x00, 0xAF,
           0x04, 0x00, 0xD6, 0xFF, 0xFF, 0xFF],
  };
  t.deepEquals(assemblyToLif(file), result, 'numeric representation');


  // bss section
  file = `
.section text
        nop
.section bss
        resb      2
        resw      2
        resd      4`;
  result = {
    text: [0x87],
    bss: 22,
  };
  t.deepEquals(assemblyToLif(file), result, 'bss section');


  // data section
  file = `
.section text
        nop
.section data
        db      0x12, 0x34
        dw      0xABCD
.section rodata
        dd      0xABCDEF01`;
  result = {
    text: [0x87],
    data: [0x12, 0x34, 0xCD, 0xAB],
    rodata: [0x01, 0xEF, 0xCD, 0xAB],
  };
  t.deepEquals(assemblyToLif(file), result, 'data section');


  // ascii data
  file = `
.section text
        nop
.section data
        db      "Abc\\n"
        db      "Abc\\0"
        db      "A,A"`;
  result = {
    text: [0x87],
    data: [65, 98, 99, 13, 65, 98, 99, 0, 65, 44, 65],
  };
  t.deepEquals(assemblyToLif(file), result, 'ascii data');


  // constants
  file = `
.define TEST 0x1234
.section text
        jmp     TEST`;
  result = {
    text: [0x71, 0x34, 0x12, 0x00, 0x00],
  };
  t.deepEquals(assemblyToLif(file), result, 'local constants');


  // include files
  file = `
.import src/test/test1.ls
.section text
        jmp     TEST`;
  result = {
    text: [0x71, 0x34, 0x12, 0x00, 0x00],
  };
  t.deepEquals(assemblyToLif(file), result, 'import files');


  // private labels
  file = `
.section text
label:  nop
        jmp     label
        jmp     fwd_label
        nop
fwd_label:
        nop`;
  result = {
    text: [0x87,
           0x71, 'label', 0x00, 0x00, 0x00,
           0x71, 'fwd_label', 0x00, 0x00, 0x00,
           0x87,
           0x87],
    symbols: {
      label: { section: 'text', addr: 0x0 },
      fwd_label: { section: 'text', addr: 0xC },
    },
  };
  t.deepEquals(assemblyToLif(file), result, 'private labels');
  

  // local labels
  file = `
.section text
        nop
.test1: jmp     .test1
new:    nop
.test1: jmp     .test1`;
  result = {
    text: [0x87,
           0x71, '.test1', 0x00, 0x00, 0x00,
           0x87,
           0x71, 'new.test1', 0x00, 0x00, 0x00],
    symbols: {
      '.test1': { section: 'text', addr: 0x01 },
      'new': { section: 'text', addr: 0x6 },
      'new.test1': { section: 'text', addr: 0x07 },
    },
  };
  t.deepEquals(assemblyToLif(file), result, 'local labels');


  // labels in data
  file = `
.section text
        movb    A, [ldat]
.section data
        dw      0x1
ldat:   db      0x1`;
  result = {
    text: [0x06, 0x00, 'ldat', 0x00, 0x00, 0x00],
    data: [0x01, 0x00, 0x01],
    symbols: {
      'ldat': { section: 'data', addr: 0x02 },
    },
  };
  t.deepEquals(assemblyToLif(file), result, 'data labels');


  // labels in bss
  file = `
.section text
        movb    A, [ldat]
.section bss
        resw    0x1
ldat:   resb    0x1`;
  result = {
    text: [0x06, 0x00, 'ldat', 0x00, 0x00, 0x00],
    bss: 3,
    symbols: {
      'ldat': { section: 'bss', addr: 0x02 },
    },
  };
  t.deepEquals(assemblyToLif(file), result, 'data labels');


  // public labels
  file = `
.section text
@test:  nop`;
  result = {
    text: [0x87],
    symbols: {
      '@test': { section: 'text', addr: 0x00 },
    },
  };
  t.deepEquals(assemblyToLif(file), result, 'global labels');


  // unresolved symbols
  file = `
.section text
        jmp     @test`;
  result = {
    text: [0x71, '@test', 0x00, 0x00, 0x00],
  };
  t.deepEquals(assemblyToLif(file), result, 'unresolved symbols');
  
  
  t.end();

});


test('LuisaVM assembler: LIF joiner', t => {

  const objA = {
    text: [0x06, 0x00, '@ldat', 0x00, 0x00, 0x00],
    bss: 2,
    data: [0x00],
    symbols: {
      '@ldat': { section: 'text', addr: 0x02 },
    },
  };

  const objB = {
    text: [0x07, 'abc', 0x00, 0x00, 0x00],
    bss: 32,
    data: [0x24, 0xFF],
    symbols: {
      'abc': { section: 'text', addr: 0x0 },
      'xxx': { section: 'bss', addr: 0xA },
      'dt': { section: 'data', addr: 0x1 },
    },
  };

  const objC = { 
    text: [0x4, 0x5],
    symbols: {
      'c': { section: 'text', addr: 0x0 },
    },
  };

  const result = {
    text: [0x06, 0x00, '@ldat', 0x00, 0x00, 0x00,
           0x07, 'abc', 0x00, 0x00, 0x00,
           0x04, 0x05],
    bss: 34,
    data: [0x00, 0x24, 0xFF],
    symbols: {
      '@ldat': { section: 'text', addr: 0x02 },
      'abc': { section: 'text', addr: 0x0 },
      'c': { section: 'text', addr: 0xB },
      'xxx': { section: 'bss', addr: 0xC },
      'dt': { section: 'data', addr: 0x2 },
    },
  };
  
  t.deepEquals(joinLifObjects([objA, objB, objC]), result, 'lifs joined');
  t.end();

});


// vim: ts=2:sw=2:sts=2:expandtab
