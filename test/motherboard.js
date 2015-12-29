import test from 'tape-catch';

import Motherboard from '../src/motherboard';
import Device from '../src/device';

class MockMMU extends Device {
  constructor() { super(); this.x = {}; }
  name() { return 'MockMMU'; }
  deviceType() { return Device.Type.MMU; }
  version() { return 0; }
  ramSize() { return 0x10000; }
  active() { return false; }
  get(a) { return this.x[a]; }
  set(a, v) { this.x[a] = v; }
}

class MockDevice extends Device {
  name() { return 'MockDevice'; }
  deviceType() { return Device.Type.OTHER_OUTPUT; }
  version() { return 1; }
  memorySize() { return 1024; }
  constantList() { return { 'CONST': 0x123 }; }
}


test('Motherboard: add devices', t => {
  let m = new Motherboard();
  m.addDevice(new MockDevice());
  t.equals(m.devices.length, 1);
  t.equals(m.devices[0].CONST, 0xF0001123);
  t.equals(m.get(0xF0001001), 1);  // get version
  t.end();
});


test('Motherboard: devices addresses', t => {
  let m = new Motherboard();
  m.addDevice(new MockDevice());
  m.addDevice(new MockDevice());
  t.equals(m.get32(0xF0000000), 0xF0001000);  // get device 0 address
  t.equals(m.get32(0xF0000004), 0xF0001400);  // get device 1 address
  t.end();
});


test('Motherboard: mmu access', t => {
  let m = new Motherboard();
  m.addDevice(new MockMMU());
  t.ok(m._mmu);
  m.set(0x5, 0x42);
  t.equals(m.get(0x5), 0x42);
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
    { addr: 0xF0001000, deviceType: Device.Type.MMU,          size: 16         },
    { addr: 0xF0001010, deviceType: Device.Type.OTHER_OUTPUT, size: 1024       },
    { addr: 0xF0001410, deviceType: Device.Type.UNUSED,       size: 0xFFFEBF0  }
  ];
  const memoryMap = m.memoryMap();
  t.equals(memoryMap.length, expectedMemoryMap.length);
  for(let i = 0; i < memoryMap.length; ++i) {
    t.equals(memoryMap[i].addr, expectedMemoryMap[i].addr);
    t.equals(memoryMap[i].deviceType, expectedMemoryMap[i].deviceType);
    t.equals(memoryMap[i].size, expectedMemoryMap[i].size);
  }
  t.end();
});


test('Motherboard: interrupts', t => {
  t.skip();
  t.end();
});


// vim: ts=2:sw=2:sts=2:expandtab
