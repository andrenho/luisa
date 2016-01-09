import test from 'tape';

import RAM from '../emu/ram';

test('RAM: Get/set', t => {
  let r = new RAM(4);
  t.equal(r.get(3), 0, 'get byte');
  r.set(3, 0xFF);
  t.equal(r.get(3), 0xFF, 'get changed byte');
  t.end();
});

test('RAM: Size', t => {
  let r = new RAM(4);
  t.equal(r.size, 4 * 1024, 'size ok');
  t.end()
});

test('RAM: Invalid value', t => {
  let r = new RAM(4);
  try {
    r.set(3, 257);
    t.fail('accepted an invalid value');
  } catch(_) {
    t.pass('did not accept');
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
      t.pass('out of bounds');
    } else {
      t.fail('invalid exception');
    }
  }
  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab
