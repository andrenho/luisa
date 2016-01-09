import test from 'tape';

import LSBStorage from '../emu/lsbstorage';

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
  t.equal(m.z[2], 0xCD, '1st byte');
  t.equal(m.z[3], 0xAB, '2nd byte');
  t.deepEqual(m.get16(2), 0xABCD, 'LSB read');
  t.end();
});

test('LSBStorage: 32 bits', t => {
  let m = new MockStorage();
  m.set32(4, 0xFBCDEF01);
  t.equal(m.z[4], 0x01, '1st byte');
  t.equal(m.z[5], 0xEF, '2nd byte');
  t.equal(m.z[6], 0xCD, '3rd byte');
  t.equal(m.z[7], 0xFB, '4th byte');
  t.deepEqual(m.get32(4), 0xFBCDEF01, 'LSB read');
  t.end();
});

test('LSBStorage: string', t => {
  let m = new MockStorage();
  m.setString(0, 'abcd');
  t.equal(m.z[1], 'b'.charCodeAt(0), '1st byte');
  t.equal(m.getString(0, 4), 'abcd', 'full read');
  t.end();
});

test('LSBStorage: array', t => {
  let m = new MockStorage();
  m.setArray(2, [0x1, 0x2, 0x3]);
  t.equal(m.z[3], 0x2, '2nd byte');
  t.deepEqual(m.getArray(2, 3), [0x1, 0x2, 0x3], 'full read');
  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab
