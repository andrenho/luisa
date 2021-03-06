test('BIOS: code', t => {
  const mb = new Motherboard();
  mb.addDevice(new MMU(new RAM(256)));
  const cpu = new CPU(mb);
  mb.addDevice(cpu);
  const bios = new BIOS(new Uint8Array([0, 1, 2, 3, 4]));
  mb.addDevice(bios);

  t.equal(mb.get(bios.BIOS_CODE + 2), 2, 'BIOS code loaded');
  t.equal(cpu.PC, bios.BIOS_CODE, 'CPU pointing to BIOS code');

  t.end();
});


// vim: ts=2:sw=2:sts=2:expandtab
