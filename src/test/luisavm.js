const _biosCode = new Uint8Array([0, 1, 2, 3, 4]);


test('LuisaVM: sanity', t => {
  t.doesNotThrow(() => new LuisaVM(256, [], _biosCode, 500, 500, null), null, "LuisaVM created");
  t.end();
});


test('LuisaVM: step', t => {
  let tm = new LuisaVM(256, [], _biosCode, 500, 500, null);
  t.doesNotThrow(() => tm.step(), null, "step");
  t.end();
});



test('LuisaVM: full example', t => {
  let b = [];
  b = b.concat(Debugger.encode('movd [0xF0016014], 64'));        // movd [VID_P0], '@'
  b = b.concat(Debugger.encode('movd [0xF0016018], 5'));         // movd [VID_P1], 5
  b = b.concat(Debugger.encode('movd [0xF001601C], 5'));         // movd [VID_P1], 5
  b = b.concat(Debugger.encode('movd [0xF0016020], 0'));         // movd [VID_P2], 0x000000
  b = b.concat(Debugger.encode('movd [0xF0016024], 0xFF0000'));  // movd [VID_P4], 0xFF0000
  b = b.concat(Debugger.encode('movb [0xF0016012], 0x5'));       // movb [VID_OP], VID_OP_WRITE

  let d = [];
  let tm = new LuisaVM(256, [], Uint8Array.from(b), 600, 500, data => d.push(data));

  t.equal(tm.cpu.PC, 0xF0006010, 'PC is initial position');
  t.equal(tm.mb.get(0xF0006010), 0x2A, 'code loaded into BIOS');
  
  for(let i=0; i<6; ++i) {
    tm.step();
  }
  t.equal(tm.cpu.PC, 0xF0006010 + b.length, 'PC is in the right place');

  // check pixel
  t.equal(d[0].cmd, 'write', 'character written');
  
  t.end();
});


// vim: ts=2:sw=2:sts=2:expandtab
