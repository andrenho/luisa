//
// ENCODER
//

test('Encoder: valid commands', t => {

  function ok(t, s, v) {
    t.same(encode(s), v, s);
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
  ok(t, 'movb A, [0x1000]', [0x06, 0x00, 0x00, 0x10, 0x00, 0x00]);
  t.end();

});


test('Encoder: number systems', t => {

  function ok(t, s, v) {
    t.same(encode(s), v, s);
  }

  ok(t, 'mov A, 42', [0x02, 0x00, 0x2A]);
  ok(t, 'mov A, 0x42', [0x02, 0x00, 0x42]);
  ok(t, 'mov A, 0b1010_1111', [0x02, 0x00, 0xAF]);
  ok(t, 'mov A, -42', [0x04, 0x00, 0xD6, 0xFF, 0xFF, 0xFF]);
  t.end();

});


test('Encoder: invalid commands', t => {

  function nok(t, s) {
    t.throws(() => encode(s), null, s);
  }

  nok(t, 'mov [B], 0x42');
  nok(t, 'movb A, 0x1234');
  nok(t, 'movb 0x42, A');
  nok(t, 'not 0x42');
  nok(t, 'or A, B, 0x42');
  nok(t, 'sys 0x1234');
  nok(t, 'pushb 0x1234');
  nok(t, 'movb A, [test]');
  t.end();

});


test('Encoder: labels', t => {

  function ok(t, s, v) {
    t.same(encode(s, true), v, s);
  }
  
  ok(t, 'movb A, [test]', [0x6, 0x0, 'test', 0x0, 0x0, 0x0]);
  ok(t, 'mov A, test', [0x4, 0x0, 'test', 0x0, 0x0, 0x0]);
  ok(t, 'jmp label', [0x71, 'label', 0, 0, 0]);
  t.same(encode('jmp .la', true, 'xy'), [0x71, 'xy.la', 0, 0, 0], 'jmp .la');

  t.end();
});


// vim: ts=2:sw=2:sts=2:expandtab
