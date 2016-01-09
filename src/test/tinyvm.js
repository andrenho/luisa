import test from 'tape';

import TinyVM from '../emu/tinyvm';
import Debugger from '../emu/debugger';

var Canvas = require('canvas');

const biosCode = new Uint8Array([0, 1, 2, 3, 4]);


test('TinyVM: sanity', t => {
  t.doesNotThrow(() => new TinyVM(256, [], new Canvas(500, 560), biosCode), null, "TinyVM created");
  t.end();
});


test('TinyVM: step', t => {
  let tm = new TinyVM(256, [], new Canvas(500, 560), biosCode);
  t.doesNotThrow(() => tm.step(), null, "step");
  t.end();
});


test('TinyVM: full example', t => {
  let b = [];
  b = b.concat(Debugger.encode('movd [0xF0016014], 64'));        // movd [VID_P0], '@'
  b = b.concat(Debugger.encode('movd [0xF0016018], 5'));         // movd [VID_P1], 5
  b = b.concat(Debugger.encode('movd [0xF001601C], 5'));         // movd [VID_P1], 5
  b = b.concat(Debugger.encode('movd [0xF0016020], 0'));         // movd [VID_P2], 0x000000
  b = b.concat(Debugger.encode('movd [0xF0016024], 0xFF0000'));  // movd [VID_P4], 0xFF0000
  b = b.concat(Debugger.encode('movb [0xF0016012], 0x5'));       // movb [VID_OP], VID_OP_WRITE

  let canvas = new Canvas(500, 560);
  let tm = new TinyVM(256, [], canvas, Uint8Array.from(b));

  t.equals(tm.cpu.PC, 0xF0006010, 'PC is initial position');
  t.equals(tm.mb.get(0xF0006010), 0x2A, 'code loaded into BIOS');
  
  for(let i=0; i<6; ++i) {
    tm.step();
  }
  t.equals(tm.cpu.PC, 0xF0006010 + b.length, 'PC is in the right place');

  // check pixel
  t.deepEqual(canvas.getContext('2d').getImageData(41, 56, 1, 1).data.slice(0, 3), [0xFF, 0, 0], 'character was set on the screen');

  t.end();
});


// vim: ts=2:sw=2:sts=2:expandtab
