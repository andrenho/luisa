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
  t.equal(mb1.get(stg1.STG_UNIT_LIST), 0, 'no storage units');

  const [mb2, cpu2, stg2] = makeStorage([new FakeDisk()]);
  t.equal(mb2.get(stg2.STG_UNIT_LIST), 0b1, 'one storage unit');

  const [mb3, cpu3, stg3] = makeStorage([new FakeDisk(), new FakeDisk()]);
  t.equal(mb3.get(stg3.STG_UNIT_LIST), 0b11, 'two storage units');

  t.end();
});


test('Get storage unit size', t => {
  const [mb, cpu, stg] = makeStorage([new FakeDisk()]);

  mb.set(0x0, 0x86);  // nop

  mb.set32(stg.STG_P0, 0x0);     // unit 0
  mb.set(stg.STG_OP, stg.STG_OP_SIZE);

  mb.step();

  t.equal(mb.get32(stg.STG_R0), 1024, 'lower 4 bytes == 1024');
  t.equal(mb.get32(stg.STG_R1), 0, 'upper 4 bytes == 0');

  t.end();
});


test('Storage: read (poll)', t => {
  const [mb, cpu, stg] = makeStorage([new FakeDisk()]);

  t.equal(mb.get(stg.STG_OP_STATUS), stg.STG_STATUS_OK, 'initial status = done');

  mb.set(0x0, 0x86);  // nop
  stg._units[0].setString(0x100, 'abcdefghijklm');  // 13 bytes

  // read data

  mb.set32(stg.STG_P0, 0x0);     // unit 0
  mb.set32(stg.STG_P1, 0x100);   // position in stg: 0x100
  mb.set32(stg.STG_P2, 0x0);
  mb.set32(stg.STG_P3, 0x20);    // memory position: 0x20
  mb.set32(stg.STG_P4, 13);      // size: 13 bytes
  mb.set(stg.STG_OP, stg.STG_OP_READ);

  mb.step();

  while (mb.get(stg.STG_OP_STATUS) === stg.STG_STATUS_WAITING) {}

  t.equal(mb.get(stg.STG_OP_STATUS), stg.STG_STATUS_OK, 'writing successful');
  t.equal(mb.get(0x20), 'a'.charCodeAt(0), 'stored correctly - first byte');
  t.equal(mb.get(0x2C), 'm'.charCodeAt(0), 'stored correctly - last byte');

  t.end();
});


test('Storage: write (poll)', t => {
  const [mb, cpu, stg] = makeStorage([new FakeDisk()]);

  t.equal(mb.get(stg.STG_OP_STATUS), stg.STG_STATUS_OK, 'initial status = done');

  mb.set(0x0, 0x86);  // nop
  mb.setString(0x20, 'abcdefghijklm');  // 13 bytes

  // write data

  mb.set32(stg.STG_P0, 0x0);     // unit 0
  mb.set32(stg.STG_P1, 0x20);    // memory position: 0x20
  mb.set32(stg.STG_P2, 0x100);   // position in stg: 0x100
  mb.set32(stg.STG_P3, 0x0);
  mb.set32(stg.STG_P4, 13);      // size: 13 bytes
  mb.set(stg.STG_OP, stg.STG_OP_WRITE);

  mb.step();

  while (mb.get(stg.STG_OP_STATUS) === stg.STG_STATUS_WAITING) {}

  t.equal(mb.get(stg.STG_OP_STATUS), stg.STG_STATUS_OK, 'writing successful');
  t.equal(stg._units[0].get(0x100), 'a'.charCodeAt(0), 'stored correctly - first byte');
  t.equal(stg._units[0].get(0x10C), 'm'.charCodeAt(0), 'stored correctly - last byte');

  t.end();
});


test('Storage: read (interrupt)', t => {
  const [mb, cpu, stg] = makeStorage([new FakeDisk()]);

  t.equal(mb.get(stg.STG_OP_STATUS), stg.STG_STATUS_OK, 'initial status = done');

  mb.set(0x0, 0x86);  // nop
  stg._units[0].setString(0x100, 'abcdefghijklm');  // 13 bytes

  // preapre interrupt
  mb.set(stg.STG_MODE, stg.STG_MODE_INTERRUPT);
  mb.set32(cpu.CPU_INTERRUPT_VECT + (4 * mb.get(stg.STG_INTERRUPT)), 0x1000);
  cpu.T = true;

  // read data
  mb.set32(stg.STG_P0, 0x0);     // unit 0
  mb.set32(stg.STG_P1, 0x100);   // position in stg: 0x100
  mb.set32(stg.STG_P2, 0x0);
  mb.set32(stg.STG_P3, 0x20);    // memory position: 0x20
  mb.set32(stg.STG_P4, 13);      // size: 13 bytes
  mb.set(stg.STG_OP, stg.STG_OP_READ);

  mb.step();

  t.equal(cpu.PC, 0x1000, 'interrupt was called');
  t.equal(mb.get(stg.STG_OP_STATUS), stg.STG_STATUS_OK, 'writing successful');
  t.equal(mb.get(0x20), 'a'.charCodeAt(0), 'stored correctly - first byte');
  t.equal(mb.get(0x2C), 'm'.charCodeAt(0), 'stored correctly - last byte');

  t.end();
});


test('Storage: invalid read (above size)', t => {
  const [mb, cpu, stg] = makeStorage([new FakeDisk()]);

  t.equal(mb.get(stg.STG_OP_STATUS), stg.STG_STATUS_OK, 'initial status = ok');

  mb.set(0x0, 0x86);  // nop

  // read data

  mb.set32(stg.STG_P0, 0x0);         // unit 0
  mb.set32(stg.STG_P1, 0xFFFF0000);  // position in stg: 0x100
  mb.set32(stg.STG_P2, 0x0);
  mb.set32(stg.STG_P3, 0x20);        // memory position: 0x20
  mb.set32(stg.STG_P4, 1);           // size: 13 bytes
  mb.set(stg.STG_OP, stg.STG_OP_READ);

  mb.step();

  while (mb.get(stg.STG_OP_STATUS) === stg.STG_STATUS_WAITING) {}

  t.equal(mb.get(stg.STG_OP_STATUS), stg.STG_STATUS_ADDRESS_ERROR, 'invalid read caused error');

  t.end();
});


test('Storage: invalid read (unit unavaliable)', t => {
  const [mb, cpu, stg] = makeStorage([]);

  mb.set(0x0, 0x86);  // nop

  mb.set32(stg.STG_P0, 0x0);     // unit 0
  mb.set(stg.STG_OP, stg.STG_OP_SIZE);

  mb.step();

  t.equal(mb.get(stg.STG_OP_STATUS), stg.STG_STATUS_UNAVALIABLE, 'unit unavaliable caused error');

  t.end();
});


// vim: ts=2:sw=2:sts=2:expandtab
