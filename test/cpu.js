import test from 'tape';

import Motherboard from '../src/motherboard';
import RAM from '../src/ram';
import MMU from '../src/mmu';
import CPU from '../src/cpu';
import cpuEncode from '../src/cpuencode';

function makeCPU() {
  const m = new Motherboard();
  m.addDevice(new MMU(new RAM(256)));
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


test('CPU: Execute valid basic commands', t => {
  let [mb, cpu] = makeCPU();

  function opc(s, pre) {
    mb.reset();
    if(pre) { 
      pre(); 
    }
    mb.setArray(0, cpuEncode(s));
    let r = `[0x${mb.get(0).toString(16)}] ` + s;
    mb.step();
    return r;
  }

  let s;

  // 
  // MOV
  //
  s = opc('mov A, B', () => cpu.B = 0x42); 
  t.equals(cpu.A, 0x42, s);
  t.equals(cpu.PC, 3, 'checking PC position');

  s = opc('mov A, 0x34'); 
  t.equals(cpu.A, 0x34, s);
  
  s = opc('mov A, 0x1234'); 
  t.equals(cpu.A, 0x1234, s);
  
  s = opc('mov A, 0xFABC1234'); 
  t.equals(cpu.A, 0xFABC1234, s);

  // 
  // MOVB
  //
  s = opc('movb A, [B]', () => { cpu.B = 0x1000; mb.set32(cpu.B, 0xABCDEF01); }); 
  t.equals(cpu.A, 0xABCDEF01, s);
  
  s = opc('movb A, [0x1000]', () => mb.set32(0x1000, 0xABCDEF01));
  t.equals(cpu.A, 0xABCDEF01, s);

  s = opc('movb [A], A', () => cpu.A = 0x64);
  t.equals(mb.get(0x64), 0x64, s);

  s = opc('movb [A], 0xFA', () => cpu.A = 0x64);
  t.equals(mb.get(0x64), 0xFA, s);

  s = opc('movb [A], [B]', () => { cpu.A = 0x32; cpu.B = 0x64; mb.set(0x64, 0xFF); });
  t.equals(mb.get(0x32), 0xFF, s);

  s = opc('movb [A], [0x6420]', () => { cpu.A = 0x32; mb.set32(0x6420, 0xFF); });
  t.equals(mb.get(0x32), 0xFF, s);

  s = opc('movb [0x64], A', () => { cpu.A = 0x32; mb.set32(0x64, 0xFF); });
  t.equals(mb.get(0xFF), 0x32, s);

  s = opc('movb [0x64], 0xF0', () => { mb.set32(0x64, 0xFF); });
  t.equals(mb.get(0xFF), 0xF0, s);
  
  s = opc('movb [0x64], [A]', () => { cpu.A = 0xF000; mb.set(0xF000, 0x42); mb.set32(0x64, 0xFFAB); });
  t.equals(mb.get(0xFFAB), 0x42, s);
  
  s = opc('movb [0x64], [0xF0]', () => { 
    mb.set32(0x64, 0xFF);
    mb.set32(0xF0, 0x1234); mb.set(0x1234, 0x3F);
  });
  t.equals(mb.get(0xFF), 0x3F, s);

  t.end();
});


// vim: ts=2:sw=2:sts=2:expandtab
