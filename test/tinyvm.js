import test from 'tape';

import TinyVM from '../src/tinyvm';
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
  t.fail('implement this test');
  t.end();
});


// vim: ts=2:sw=2:sts=2:expandtab
