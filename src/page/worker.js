'use strict';

//
// EMULATOR INTERFACE
//

importScripts('tests.js',
              '../emu/bioscode.js',
              '../emu/lsbstorage.js',
              '../emu/ram.js',
              '../emu/device.js',
              '../emu/motherboard.js',
              '../emu/mmu.js',
              '../emu/cpu.js',
              '../emu/storage.js',
              '../emu/keyboard.js',
              '../emu/timer.js',
              '../emu/bios.js',
              '../emu/video.js',
              '../emu/luisavm.js',
              '../emu/debugger.js');

let luisavm, dbg;


// Temporary: StorageUnit 
class FakeDisk extends LSBStorage {
  get(a) { return 0; }
  set(a, v) { }
  get size() { return 1024 * 1024; }
}
// Temporary: StorageUnit 


self.addEventListener('message', e => {
  const pars = e.data.slice(1);
  switch (e.data[0]) {

    // initialize VM and debugger
    case 'init':
      luisavm = new LuisaVM(256, [new FakeDisk()], biosCode, pars[0], pars[1], data => self.postMessage(['callback', data]));
      console.log('Virtual machine initalized.');
      dbg = new Debugger(luisavm);
      self.postMessage(['print_debugger', '<div>Done!</div><div>&nbsp;</div>']);
      self.postMessage(['print_debugger', dbg.welcome()]);
      break;

    // run
    case 'run':
      dbg.continue();
      break;

    // message to debugger
    case 'to_debugger':
      self.postMessage(['print_debugger', dbg.parse(pars[0])]);
      break;

    // run tests
    case 'run_tests':
      testInterface.runTests();
      break;

    // other, invalid message
    default:
      console.error(`Invalid command ${e.data[0]} received by worker.`);
  }
});



// vim: ts=2:sw=2:sts=2:expandtab
