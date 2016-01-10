import test from 'tape';

import assemblyToTif from '../utils/assembler.js';


test('LuisaVM assembler: valid inputs', t => {

  let file, result;

  // simplest file
  file = `
.section text
        nop       ; some comment`;
  result = {
    text: [0x87],
  };
  t.deepEquals(assemblyToTif(file), result, 'simplest file');

  /*
  // some useful code
  file = `
.entry  0x1000
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
    entry: 0x1000,
    text: [0x02, 0x00, 0x04,
           0x05, 0x00, 0x01,
           0x06, 0x00, 0x78, 0x56, 0x34, 0x12,
           0x2C, 0x01, 0xEF, 0xCD, 0xAB, 0x78, 0x56, 0x34, 0x12,
           0x2F, 0x12, 0x42,
           0x41, 0x05,
           0x5D, 0x42,
           0x74],
  };
  t.deepEquals(assemblyToTif(file), result, 'useful code');


  // decimal, binary, hexa, negative numbers
  file = `
.section text
        mov     A, 42
        mov     A, 0x42
        mov     A, 0b1010_1111
        mov     A, -42`;
  result = {
    text: [0x02, 0x2A,
           0x02, 0x42,
           0x02, 0xAF,
           0x04, 0xD6, 0xFF, 0xFF, 0xFF],
  };
  t.deepEquals(assemblyToTif(file), result, 'numeric representation');


  // bss section
  file = `
.section text
        nop
.section bss
        resb      2
        resw      2
        resd      4`;
  result = {
    entry: 0,
    text: [0x87],
    bss: 26,
  };
  t.deepEquals(assemblyToTif(file), result, 'bss section');


  // data section
  file = `
.section text
        nop
.section data
        db      0x12, 0x34
        dw      0x1234
.section rodata
        dd      0xABCDEF01`;
  result = {
    entry: 0,
    text: [0x87],
    data: [0x12, 0x34, 0x34, 0x12],
    rodata: [0x01, 0xEF, 0xCD, 0xAB],
  };
  t.deepEquals(assemblyToTif(file), result, 'data section');


  // ascii data
  file = `
.section text
        nop
.section data
        ascii   "Abc\\n"
        asciz   "Abc"`;
  result = {
    entry: 0,
    text: [0x87],
    data: [65, 98, 99, 13, 65, 98, 99, 0],
  };
  t.deepEquals(assemblyToTif(file), result, 'ascii data');


  // resolved labels in code
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
      label: { section: 'text', addr: 0x00 },
      fwd_label: { section: 'text', addr: 0x06 },
    },
  };
  t.deepEquals(assemblyToTif(file), result, 'static labels');
  

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
      'new.test1': { section: 'text', addr: 0x07 },
    },
  };
  t.deepEquals(assemblyToTif(file), result, 'local labels');


  // resolved labels in data
  file = `
.section text
        movb    A, [ldat]
.section data
ldat:   db      0x1`;
  result = {
    text: [0x06, 0x00, 'ldata', 0x00, 0x00, 0x00],
    data: [0x01],
    symbols: {
      'ldat': { section: 'data', addr: 0x00 },
    },
  };
  t.deepEquals(assemblyToTif(file), result, 'data labels');


  // exports
  file = `
.section text
@test:  nop`;
  result = {
    text: [0x87],
    symbols: {
      '@test': { section: 'text', addr: 0x00 },
    },
    exports: ['@test'],
  };
  t.deepEquals(assemblyToTif(file), result, 'global labels');


  // unresolved symbols
  file = `
.section text
        jmp     @test`;
  result = {
    text: [0x71, '@test', 0x00, 0x00, 0x00],
    unresolved: ['@test'],
  };
  t.deepEquals(assemblyToTif(file), result, 'unresolved symbols');
  

  // constants
  file = `
.define TEST 0x1234
.section text
        jmp     TEST`;
  result = {
    text: [0x71, 0x34, 0x12, 0x00, 0x00],
  };
  t.deepEquals(assemblyToTif(file), result, 'local constants');


  // include files
  file = `
.include test/test1.ts
.section text
        jmp     TEST`;
  result = {
    text: [0x71, 0x34, 0x12, 0x00, 0x00],
  };
  t.deepEquals(assemblyToTif(file), result, 'include files');

*/

  t.end();

});


test('LuisaAS: multiple sections', t => {
  t.end(); 
});

// vim: ts=2:sw=2:sts=2:expandtab
