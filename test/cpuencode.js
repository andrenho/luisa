import test from 'tape';

import cpuEncode from '../src/cpuencode';

test('CPU encoder: valid commands', t => {

  function ok(t, s, v) {
    t.same(cpuEncode(s), v, s);
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


test('CPU encoder: invalid commands', t => {

  function nok(t, s) {
    t.throws(() => cpuEncode(s), null, s);
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


// vim: ts=2:sw=2:sts=2:expandtab
