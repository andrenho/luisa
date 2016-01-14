'use strict';

importScripts('../emu/bioscode.js',
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
              '../utils/debugger.js');

var luisavm, dbg;

self.addEventListener('message', e => {
  const pars = e.data.slice(1);
  switch (e.data[0]) {

    // initialize VM and debugger
    case 'init':
      luisavm = new LuisaVM(256, [], biosCode, pars[0], pars[1], callback);
      console.log('Virtual machine initalized.');
      dbg = new Debugger(luisavm);
      self.postMessage(['print_debugger', dbg.welcome()]);
      break;

    // message to debugger
    case 'to_debugger':
      self.postMessage(['print_debugger', dbg.parse(pars[0])]);
      break;

    // other, invalid message
    default:
      console.error(`Invalid command ${e.data[0]} received by worker.`);
  }
});


function callback(data) {
  self.postMessage(['callback', data]);
}


// vim: ts=2:sw=2:sts=2:expandtab
