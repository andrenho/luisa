'use strict';

class Keyboard extends Device {

  constructor() {
    super();
    
    // initialize constants
    this.KBD_MODE_POLL = 0x0;
    this.KBD_MODE_INTERRUPT = 0x1;
    this.KBD_OP_POP = 0x1;

    // initialize keyboard
    this._const = this.constantList();
    this._queue = [];
    this._mode = this.KBD_MODE_POLL;
  }

  name() { return 'LuisaKeyboard'; }
  deviceType() { return Device.Type.KEYBOARD; }
  version() { return 0x0; }
  hasInterrupt() { return true; }

  constantList() {
    return {
      KBD_TYPE:       0x00,
      KBD_VERSION:    0x01,
      KBD_INTERRUPT:  0x02,
      KDB_NAME:       0x03,
      KBD_MODE:       0x10,
      KBD_QUEUE_FULL: 0x11,
      KBD_DEQUEUE:    0x12,
      KBD_FRONT:        0x14,
    };
  }
  
  get queue() {
    return this._queue.slice();
  }
      

  addEvent(event) {
    if (typeof event !== 'object') {
      throw new Error('Hash expected');
    } else if (event.event === undefined || event.shift === undefined || event.control === undefined || event.alt === undefined || event.key === undefined) {
      throw new Error('Expected format: { event, shift, control, alt, key }');
    } else if (event.event !== 'press' && event.event !== 'release') {
      throw new Error('Event must be one of press/release');
    }
    if (this._queue.length < Keyboard.QUEUE_SIZE) {
      this._queue.push(
        ((event.event === 'release' ? 1 : 0) << 0x1F) |
        ((event.shift ? 1 : 0) << 0x1E) |
        ((event.control ? 1 : 0) << 0x1D) |
        ((event.alt ? 1 : 0) << 0x1C) |
        (event.key & 0xFFFFFF));
      if (this._mode == this.KBD_MODE_INTERRUPT) {
        this.fireInterrupt();
      }
    }
  }


  get(a) {
    if (a < 0x10) {
      return super.get(a);
    } else if (a === this._const.KBD_MODE) {
      return this._mode;
    } else if (a === this._const.KBD_QUEUE_FULL) {
      return (this._queue.length === Keyboard.QUEUE_SIZE ? 1 : 0);
    } else if (a === this._const.KBD_DEQUEUE) {
      this._queue.shift();
    } else if (a >= this._const.KBD_FRONT || a < (this._const.KBD_FRONT + 4)) {
      const v = (this._queue.length === 0 ? 0 : this._queue[0]);
      switch (a % 4) {
        case 0: return v & 0xFF;
        case 1: return (v >> 8) & 0xFF;
        case 2: return (v >> 16) & 0xFF;
        case 3: return (v >> 24) & 0xFF;
      }
    }
    return 0;
  }


  set(a, v) {
    if (a < 0x10) {
      super.set(a, v);
    } else if (a === this._const.KBD_MODE) {
      this._mode = v;
    }
  }
  
}


Keyboard.QUEUE_SIZE = 16;


// vim: ts=2:sw=2:sts=2:expandtab
