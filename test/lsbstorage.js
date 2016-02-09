import test from 'tape';

import LSBStorage from '../src/lsbstorage';

class MockStorage extends LSBStorage {
  constructor() { 
    super(); 
    this.z = new Uint8Array(8);
  }
  get(a) { return this.z[a]; }
  set(a, v) { this.z[a] = v; }
}

test('LSBStorage: 16 bits', t => {
  let m = new MockStorage();
  m.set16(2, 0xABCD);
  t.equal(m.z[2], 0xCD);
  t.equal(m.z[3], 0xAB);
  t.deepEqual(m.get16(2), 0xABCD);
  t.end();
});

test('LSBStorage: 32 bits', t => {
  let m = new MockStorage();
  m.set32(4, 0xABCDEF01);
  t.equal(m.z[4], 0x01);
  t.equal(m.z[5], 0xEF);
  t.equal(m.z[6], 0xCD);
  t.equal(m.z[7], 0xAB);
  t.deepEqual(m.get32(4), 0xABCDEF01);
  t.end();
});

test('LSBStorage: string', t => {
  let m = new MockStorage();
  m.setString(0, 'abcd');
  t.equal(m.z[1], 'b'.charCodeAt(0));
  t.equal(m.getString(0, 4), 'abcd');
  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab
