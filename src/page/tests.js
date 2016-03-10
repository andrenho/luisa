'use strict';

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