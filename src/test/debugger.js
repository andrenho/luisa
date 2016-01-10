import test from 'tape';

import LuisaVM from '../emu/luisavm';
import Debugger from '../utils/debugger';

var Canvas = require('canvas');

//
// DECODER
//

test('Debugger decoder', t => {

  let tm = new LuisaVM(256, [], new Canvas(500, 560), Uint8Array.from([]));
  let dbg = new Debugger(tm);

  function ok(t, a, s) {
    tm.mb.setArray(0x0, a);
    const c = dbg.decode(0x0);
    t.equals(c[0], s, s);
    t.equals(c[1], a.length, 'operation size = ' + a.length);
  }

  ok(t, [0xFF], 'data    0xFF');
  ok(t, [0x74], 'ret');
  ok(t, [0x06, 0x01, 0x78, 0x56, 0x34, 0x12], 'movb    B, [0x12345678]');
  ok(t, [0x2C, 0x78, 0x56, 0x34, 0x12, 0x01, 0xEF, 0xCD, 0xAB], 'movd    [0x12345678], [0xABCDEF01]');
  ok(t, [0x2F, 0x02, 0x34, 0x12], 'or      C, 0x1234');
  t.end();

});


// vim: ts=2:sw=2:sts=2:expandtab
