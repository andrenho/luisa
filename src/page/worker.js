'use strict';

//
// EMULATOR INTERFACE
//

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

let luisavm, dbg;

self.addEventListener('message', e => {
  const pars = e.data.slice(1);
  switch (e.data[0]) {

    // initialize VM and debugger
    case 'init':
      luisavm = new LuisaVM(256, [], biosCode, pars[0], pars[1], data => self.postMessage(['callback', data]));
      console.log('Virtual machine initalized.');
      dbg = new Debugger(luisavm);
      self.postMessage(['print_debugger', '<div>Done!</div><div>&nbsp;</div>']);
      self.postMessage(['print_debugger', dbg.welcome()]);
      break;

    // run
    case 'run':
      luisavm.run();
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


//
// TEST INTERFACE
//


class TestInterface {

  constructor() {
    this._tests = [];
    this._loaded = false;
    this._t = {
      equal(result, compare, description) {
        if (result === compare) {
          self.postMessage(['test_ok', description]);
        } else {
          self.postMessage(['test_nok', description, compare, result]);
        }
      },
      notEqual(result, compare, description) {
        if (result === compare) {
          self.postMessage(['test_nok', description, compare, result]);
        } else {
          self.postMessage(['test_ok', description]);
        }
      },
      same(result, compare, description) {
        if (JSON.stringify(result) === JSON.stringify(compare)) {
          self.postMessage(['test_ok', description]);
        } else {
          self.postMessage(['test_nok', description, compare, result]);
        }
      },
      throws(f, result, description) {
        try {
          f();
        } catch(e) {
          self.postMessage(['test_ok', description]);
          return;
        } 
        self.postMessage(['test_nok', description, 'exception', 'ok']);
      },
      doesNotThrow(f, result, description) {
        try {
          f();
        } catch(e) {
          self.postMessage(['test_nok', description, 'no exception', e.message]);
          return;
        } 
        self.postMessage(['test_ok', description]);
      },
      pass(description) {
        self.postMessage(['test_ok', description]);
      },
      fail(description) {
        self.postMessage(['test_nok', description]);
      },
      comment(description) {
        self.postMessage(['test_subtitle', description]);
      },
      true(value, description) {
        if (value) {
          self.postMessage(['test_ok', description]);
        } else {
          self.postMessage(['test_nok', description, true, value]);
        }
      },
      false(value, description) {
        if (value) {
          self.postMessage(['test_nok', description, true, value]);
        } else {
          self.postMessage(['test_ok', description]);
        }
      },
      end() {
      },
    };
  }


  addTest(name, f) {
    this._tests.push({ name, f });
  }


  runTests() {
    this._loadTests();
    for (const test of this._tests) {
      self.postMessage(['test_title', test.name]);
      test.f(this._t);
    }
    // TODO - total tests
  }


  _loadTests() {
    if (!this._loaded) {
      importScripts(
        '../test/lsbstorage.js',
        '../test/ram.js',
        '../test/device.js',
        '../test/mmu.js',
        '../test/motherboard.js',
        '../test/cpu.js',
        '../test/keyboard.js',
        '../test/storage.js',
        '../test/bios.js',
        '../test/timer.js',
        '../test/video.js',
        '../test/luisavm.js',
        '../test/debugger.js'
      );
      this._loaded = true;
    }
  }

}

let testInterface = new TestInterface();

function test(name, f) {
  testInterface.addTest(name, f);
}

// vim: ts=2:sw=2:sts=2:expandtab
