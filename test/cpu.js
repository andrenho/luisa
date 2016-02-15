import test from 'tape';

import Motherboard from '../src/motherboard';
import RAM from '../src/ram';
import MMU from '../src/mmu';
import CPU from '../src/cpu';

function makeCPU() {
  const m = new Motherboard();
  m.addDevice(new MMU(new RAM(16)));
  const c = new CPU(m);
  m.addDevice(c);
  return [m, c];
}


test('CPU: Sanity check', t => {
  let m, c;
  t.doesNotThrow(() => [m, c] = makeCPU(), null, 'CPU is created without errors');
  c.A = 24;
  c.FL = 0b10;
  t.equals(c.A, 24, 'register setter/getter');
  t.ok(c.V, 'flag bits set correctly');
  t.equals(c.PC, 0, 'CPU init address');
  t.end();
});


test('CPU: Get register contents from memory', t => {
  const [mb, cpu] = makeCPU();
  cpu.K = 0xABCDEF01;
  t.equals(cpu.CPU_K, 0xF0002038, 'CPU_K == 0xF0002038');
  t.equals(mb.get32(cpu.CPU_K), 0xABCDEF01, 'read register from memory');
  mb.set32(cpu.CPU_K, 0x12345678);
  t.equals(cpu.K, 0x12345678, 'set register from memory');
  t.equals(mb.get32(cpu.CPU_K), 0x12345678, 'set and then read register from memory');
  t.end();
});


test('CPU: encoder', t => {
  t.same(CPU.encode('mov A, 0xABCD'), [0x03, 0x00, 0xCD, 0xAB]);
  t.end();
});


// vim: ts=2:sw=2:sts=2:expandtab
