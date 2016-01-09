import test from 'tape';

import assemble from '../utils/assembler.js';


test.only('TinyVM assembler: valid inputs', t => {

  let file, result;

  // simplest file
  file = `
.entry  0x0

.section text
        nop       ; some comment`;
  result = {
    entry: 0,
    code: [0x87],
  };
  t.deepEquals(assemble(file), result, 'simplest file');

  
  // TODO - some useful code


  // TODO - decimal, binary, hexa, negative numbers


  // bss section
  file = `
.entry  0x0

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
  t.deepEquals(assemble(file), result, 'bss section');


  // data section
  file = `
.entry  0x0

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
  t.deepEquals(assemble(file), result, 'data section');


  // ascii data
  file = `
.entry  0x0

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
  t.deepEquals(assemble(file), result, 'ascii data');


  // TODO - resolved labels in code


  // TODO - resolved labels in data
  

  // TODO - exports
  

  // TODO - unresolved symbols
  

  // TODO - symbols
  

  // TODO - include files


  t.end();

});


test('TinyAS: multiple sections', t => {
});

// vim: ts=2:sw=2:sts=2:expandtab
