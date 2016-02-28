import test from 'tape';

import TinyVM from '../src/tinyvm';
import Debugger from '../src/debugger';

var Canvas = require('canvas');

//
// ENCODER
//

test('Debugger encoder: valid commands', t => {

  function ok(t, s, v) {
    t.same(Debugger.encode(s), v, s);
  }

  ok(t, 'mov A, 0xABCD', [0x03, 0x00, 0xCD, 0xAB]);
  ok(t, 'mov A, B', [0x01, 0x00, 0x01]);
  ok(t, 'movb [A], 0x42', [0x0C, 0x00, 0x42]);
  ok(t, 'movw [0x42], K', [0x25, 0x42, 0x00, 0x00, 0x00, 0x0A]);
  ok(t, 'movd [A], 0x1', [0x1E, 0x00, 0x01, 0x00, 0x00, 0x00]);
  ok(t, 'or C, 0x1234', [0x2F, 0x02, 0x34, 0x12]);
  ok(t, 'not B', [0x41, 0x1]);
  ok(t, 'bz 0x12', [0x5D, 0x12, 0x00, 0x00, 0x00]);
  ok(t, 'ret', [0x74]);
  ok(t, 'push.a', [0x7E]);
  t.end();

});


test('Debugger encoder: invalid commands', t => {

  function nok(t, s) {
    t.throws(() => Debugger.encode(s), null, s);
  }

  nok(t, 'mov [B], 0x42');
  nok(t, 'movb A, 0x1234');
  nok(t, 'movb 0x42, A');
  nok(t, 'not 0x42');
  nok(t, 'or A, B, 0x42');
  nok(t, 'sys 0x1234');
  nok(t, 'pushb 0x1234');
  t.end();

});


//
// DECODER
//

test('Debugger decoder', t => {

  let tm = new TinyVM(256, [], new Canvas(500, 560), Uint8Array.from([]));
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
