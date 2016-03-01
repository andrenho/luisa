import test from 'tape';

import assemblyToTif from '../utils/assemblyToTifr.js';


test.only('TinyVM assemblyToTifr: valid inputs', t => {

  let file, result;

  // simplest file
  file = `
.section text
        nop       ; some comment`;
  result = {
    entry: 0,
    code: [0x87],
  };
  t.deepEquals(assemblyToTif(file), result, 'simplest file');

  
  // TODO - some useful code
  file = `
.entry  0x1000
.section text
        mov     A, 0x4
        movb    A, [B]
        movb    A, [0x12345678]
        movd    [0xABCDEF01], [0x12345678]
        or      K, 0x42
        not     F
        bz      0x42
        ret`;

  // TODO - decimal, binary, hexa, negative numbers
  file = `
.section text
        mov     A, 42
        mov     A, 0x42
        mov     A, 0b1010_1111
        mov     A, -42`;

  // bss section
  file = `
.section text
        nop
.section bss
        .resb     2
        .resw     2
        .resd     4`;
  result = {
    entry: 0,
    code: [0x87],
    bss: 26,
  };
  t.deepEquals(assemblyToTif(file), result, 'bss section');


  // data section
  file = `
.section text
        nop
.section data
        .db     0x12, 0x34
        .dw     0x1234
.section rodata
        .dd     0xABCDEF01`;
  result = {
    entry: 0,
    code: [0x87],
    data: [0x12, 0x34, 0x34, 0x12],
    rodata: [0x01, 0xEF, 0xCD, 0xAB],
  };
  t.deepEquals(assemblyToTif(file), result, 'data section');


  // ascii data
  file = `
.section text
        nop
.section data
        .ascii  "Abc\\n"
        .asciz  "Abc"`;
  result = {
    entry: 0,
    code: [0x87],
    data: [65, 98, 99, 13, 65, 98, 99, 0],
  };
  t.deepEquals(assemblyToTif(file), result, 'ascii data');


  // TODO - resolved labels in code
  file = `
.section text
label:  nop
        jmp     label
        jmp     fwd_label
        nop
fwd_label:
        nop`;

  // TODO - local labels
  file = `
.section text
        nop
.test1: jmp     .test1
new:    nop
.test1: jmp     .test1`;

  // TODO - resolved labels in data
  file = `
.section text
        movb    A, [ldat]
.section data
ldat:   db      0x1`;

  // TODO - exports
  file = `
.section text
@test:  nop`;

  // TODO - unresolved symbols
  file = `
.section text
        jmp     test`;
  

  // TODO - symbols
  

  // TODO - include files


  t.end();

});


test('TinyAS: multiple sections', t => {
});

// vim: ts=2:sw=2:sts=2:expandtab
