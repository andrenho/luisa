import test from 'tape';

import Motherboard from '../src/motherboard';
import RAM from '../src/ram';
import MMU from '../src/mmu';
import CPU from '../src/cpu';
import LSBStorage from '../src/lsbstorage';
import Storage from '../src/storage';

class FakeDisk extends LSBStorage {
  constructor() { super(); this._data = new Uint8Array(1024); }
  get(a) { return this._data[a]; }
  set(a, v) { this._data[a] = v; }
  get size() { return 1024; }
};


function makeStorage(units) {
  const m = new Motherboard();
  m.addDevice(new MMU(new RAM(256)));
  const c = new CPU(m);
  m.addDevice(c);
  const s = new Storage(units);
  m.addDevice(s);
  return [m, c, s];
}


test('Storage: sanity', t => {
  t.doesNotThrow(() => new Storage([new FakeDisk()]), null, "storage created");
  t.doesNotThrow(() => makeStorage([new FakeDisk()]), null, "storage created and added to motherboard");
  t.end();
});


test('Storage: unit list', t => {
  const [mb1, cpu1, stg1] = makeStorage([]);
  t.equals(mb1.get(stg1.STG_UNIT_LIST), 0, 'no storage units');

  const [mb2, cpu2, stg2] = makeStorage([new FakeDisk()]);
  t.equals(mb2.get(stg2.STG_UNIT_LIST), 0b1, 'one storage unit');

  const [mb3, cpu3, stg3] = makeStorage([new FakeDisk()]);
  t.equals(mb3.get(stg3.STG_UNIT_LIST), 0b11, 'two storage units');

  t.end();
});


test('Storage: read/write (poll)', t => {
  const [mb, cpu, stg] = makeStorage([new FakeDisk()]);


  
  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab
