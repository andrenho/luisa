import test from 'tape';

import Device from '../src/device';

class MockDevice extends Device {
  name() { return 'MockDevice'; }
  deviceType() { return Device.Type.OTHER_OUTPUT; }
  version() { return 0; }
  constantList() { return { 'CONST': 0x123 }; }
}


test('Device: registers', t => {
  let d = new MockDevice();
  t.equal(d.get(0), Device.Type.OTHER_OUTPUT);
  t.equal(d.get(1), 0);  // version
  t.equal(d.get(3), 'M'.charCodeAt(0));
  t.end();
});


test('Device: constants', t => {
  let d = new MockDevice();
  d.initializeConstants(0xF0000000);
  t.equal(d.CONST, 0xF0000123);
  t.end();
});


// vim: ts=2:sw=2:sts=2:expandtab
