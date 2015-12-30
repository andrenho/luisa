import test from 'tape';

import RAM from '../src/ram';
import MMU from '../src/mmu';


test('MMU: physical memory access (VMEM disabled)', t => {
  let m = new MMU(new RAM(4));
  t.equal(m.get(3), 0, 'get byte');
  m.set(3, 0xFF);
  t.equal(m.get(3), 0xFF, 'get changed byte');
  t.equal(m.get(m.MMU_ERR), m.MMU_ERR_NONE, 'no errors');
  t.end();
});


test('MMU: physical memory size', t => {
  let m = new MMU(new RAM(4));
  t.equal(m.get(m.MMU_RAM_SZ), 4 * 1024, 'memory size register');
  t.end();
});


test('MMU: physical access out of bounds', t => {
  let m = new MMU(new RAM(4));
  m.get(0xEE0000);
  t.equal(m.get(m.MMU_ERR), m.MMU_ERR_OUT_OF_BOUNDS, 'access is out of bounds');
  t.end();
});


// vim: ts=2:sw=2:sts=2:expandtab
