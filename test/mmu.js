import test from 'tape';

import RAM from '../src/ram';
import MMU from '../src/mmu';


test('MMU: translation (VMEM disabled)', t => {
  let m = new MMU(new RAM(4));
  t.equal(m.translate(8), 8, 'translation');
  t.end();
});


test('MMU: physical memory access (VMEM disabled)', t => {
  let m = new MMU(new RAM(4));
  m.initializeConstants(0);
  t.equal(m.getMemory(3), 0, 'get byte');
  m.setMemory(3, 0xFF);
  t.equal(m.getMemory(3), 0xFF, 'get changed byte');
  t.equal(m.get(m.MMU_ERR), m.MMU_ERR_NONE, 'no errors');
  t.end();
});


test('MMU: physical memory size', t => {
  let m = new MMU(new RAM(4));
  m.initializeConstants(0);
  t.equal(m.get32(m.MMU_RAM_SZ), 4 * 1024, 'memory size register');
  t.end();
});


test('MMU: physical access out of bounds', t => {
  let m = new MMU(new RAM(4));
  m.initializeConstants(0);
  m.getMemory(0xEE0000);
  t.equal(m.get(m.MMU_ERR), m.MMU_ERR_OUT_OF_BOUNDS, 'access is out of bounds');
  t.end();
});


test('MMU: clear error', t => { 
  let m = new MMU(new RAM(4));
  m.initializeConstants(0);
  m.getMemory(0xEE0000);
  t.equal(m.get(m.MMU_ERR), m.MMU_ERR_OUT_OF_BOUNDS, 'error as expected');
  m.set32(m.MMU_ERR, m.MMU_ERR_NONE);
  t.equal(m.get(m.MMU_ERR), m.MMU_ERR_NONE, 'error is cleared');
  t.end();
});


// vim: ts=2:sw=2:sts=2:expandtab
