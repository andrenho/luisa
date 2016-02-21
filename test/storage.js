import test from 'tape';

import LSBStorage from '../src/lsbstorage';
import Storage from '../src/storage';

class FakeDisk extends LSBStorage {
  constructor() { super(); this._data = new Uint8Array(1024); }
  get(a) { return this._data[a]; }
  set(a, v) { this._data[a] = v; }
  get size() { return 1024; }
};


test('Storage: sanity', t => {
  t.doesNotThrow(() => new Storage([new FakeDisk()]), null, "storage created");
  t.end();
});


// vim: ts=2:sw=2:sts=2:expandtab
