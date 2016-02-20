import test from 'tape-catch';

import Motherboard from '../src/motherboard';
import Device from '../src/device';

class MockMMU extends Device {
  constructor() { super(); this.x = {}; this.y = {}; }
  name() { return 'MockMMU'; }
  deviceType() { return Device.Type.MMU; }
  version() { return 0; }
  ramSize() { return 0x10000; }
  active() { return false; }
  get(a) { return this.x[a]; }
  set(a, v) { this.x[a] = v; }
  getMemory(a) { return this.y[a]; }
  setMemory(a, v) { this.y[a] = v; }
}

class MockDevice extends Device {
  name() { return 'MockDevice'; }
  deviceType() { return Device.Type.OTHER_OUTPUT; }
  version() { return 1; }
  memorySize() { return 0x2000; }
  constantList() { return { 'CONST': 0x123 }; }
}


test('Motherboard: add devices', t => {
  let m = new Motherboard();
  m.addDevice(new MockDevice());
  t.equals(m.devices.length, 1, 'one device added');
  t.equals(m.devices[0].CONST, 0xF0001123, 'device constant set');
  t.equals(m.get(0xF0001001), 1, 'device version is ok');
  t.end();
});


test('Motherboard: devices addresses', t => {
  let m = new Motherboard();
  m.addDevice(new MockDevice());
  m.addDevice(new MockDevice());
  t.equals(m.get32(0xF0000000), 0xF0001000, 'device 0 address');
  t.equals(m.get32(0xF0000004), 0xF0003000, 'device 1 address');
  t.end();
});


test('Motherboard: mmu access', t => {
  let m = new Motherboard();
  m.addDevice(new MockMMU());
  t.ok(m._mmu, '_mmu is set');
  m.set(0x5, 0x42);
  t.equals(m.get(0x5), 0x42, 'mmu is working');
  t.end();
});


test('Motherboard: memory map', t => {
  let m = new Motherboard();
  m.addDevice(new MockMMU());
  m.addDevice(new MockDevice());
  const expectedMemoryMap = [
    { addr: 0x0,        deviceType: Device.Type.RAM,          size: 0x10000    },
    { addr: 0x10000,    deviceType: Device.Type.UNUSED,       size: 0xEFFF0000 },
    { addr: 0xF0000000, deviceType: Device.Type.MOTHERBOARD,  size: 0x1000     },
    { addr: 0xF0001000, deviceType: Device.Type.MMU,          size: 0x1000     },
    { addr: 0xF0002000, deviceType: Device.Type.OTHER_OUTPUT, size: 0x2000     },
    { addr: 0xF0004000, deviceType: Device.Type.UNUSED,       size: 0xFFFC000  }
  ];
  const memoryMap = m.memoryMap();
  t.equals(memoryMap.length, expectedMemoryMap.length, '# of entries in memoryMap is correct');
  for(let i = 0; i < memoryMap.length; ++i) {
    t.equals(memoryMap[i].addr, expectedMemoryMap[i].addr, 'memoryMap.address is correct (record ' + i + ')');
    t.equals(memoryMap[i].deviceType, expectedMemoryMap[i].deviceType, 'memoryMap.deviceType is correct (record ' + i + ')');
    t.equals(memoryMap[i].size, expectedMemoryMap[i].size, 'memoryMap.size is correct (record ' + i + ')');
  }
  t.end();
});


test('Motherboard: step', t => {
  let m = new Motherboard();
  m.addDevice(new MockMMU());
  m.addDevice(new MockDevice());
  try {
    m.step();
    t.pass('step has succeded');
  } catch(e) {
    t.fail('step has failed');
  }
  t.end();
});


test('Motherboard: unauthorized read', t => {
  let m = new Motherboard();
  m.addDevice(new MockMMU());
  m.get(0xFF000000);
  t.equals(m.get(m.MB_ERR), m.MB_ERR_UNAUTH_READ, 'MB_ERR_UNAUTH_WRITE is set');
  t.end();
});


test('Motherboard: unauthorized write', t => {
  let m = new Motherboard();
  m.addDevice(new MockMMU());
  m.set(0xFF000000, 1);
  t.equals(m.get(m.MB_ERR), m.MB_ERR_UNAUTH_WRITE, 'MB_ERR_UNAUTH_WRITE is set');
  t.end();
});


// vim: ts=2:sw=2:sts=2:expandtab
