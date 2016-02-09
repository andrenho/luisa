import test from 'tape';

import RAM from '../src/ram';

test('RAM: Get/set', t => {
  let r = new RAM(4);
  t.equal(r.get(3), 0);
  r.set(3, 0xFF);
  t.equal(r.get(3), 0xFF);
  t.end();
});

test('RAM: Invalid value', t => {
  let r = new RAM(4);
  try {
    r.set(3, 257);
    t.fail('accepted an invalid value');
  } catch(_) {
    t.pass();
  }
  t.end();
});

test('RAM: Out of bounds', t => {
  let r = new RAM(4);
  try {
    r.set(0xFFFFFFFF, 1);
    t.fail('accepted an invalid value');
  } catch(e) {
    if (e.name === 'out of bounds') {
      t.pass();
    } else {
      t.fail('invalid exception');
    }
  }
  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab
