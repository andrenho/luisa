import test from 'tape';

import RAM from '../emu/ram';
import MMU from '../emu/mmu';

// 
// VMEM disabled
//

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


//
// VMEM enabled
//

function mmu_vmem() {
  let m = new MMU(new RAM(256));
  m.initializeConstants(0);
  m._ram.set32(0x4ABC, 0x1F | (1 << 31));
  m._ram.set32(0x1F344, 0x2B | (1 << 31));
  m.set32(m.MMU_VMEM, 0x4 | (1 << 31));
  return m;
}


test('MMU: enabled VMEM', t => {
  let m = mmu_vmem();
  t.equal(m.get32(m.MMU_VMEM), (0x4 | (1 << 31)) >>> 0, 'VMEM register is correct');
  t.ok(m.active, 'VMEM is active');
  t.equal(m._vmem.page, 0x4, 'VMEM page is 0x4');
  t.end();
});


test('MMU: VMEM memory translation', t => {
  let m = mmu_vmem();
  t.equal(m.translate(0xABCD1234), 0x2B234, 'translation is correct');
  t.end();
});


test('MMU: VMEM page fault', t => {
  let m = mmu_vmem();
  m._ram.set32(0x4ABC, 0x1F);
  t.throws(() => m.translate(0xABCD1234), Error, 'page fault');
  t.end();
});


test('MMU: VMEM memory access', t => {
  let m = mmu_vmem();
  m.setMemory(0xABCD1234, 0x42);
  t.equal(m._ram.get(0x2B234), 0x42, 'RAM address is correctly set');
  t.equal(m.getMemory(0xABCD1234), 0x42, 'setting/fetching via VMEM works');
  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab
