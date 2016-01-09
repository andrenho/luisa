import Device from './device';

export default class Timer extends Device {

  constructor() {
    super();

    this._const = this.constantList();
    this._dateDiff = new Date(2016, 1, 1).valueOf();
    this._currentTime = Date.now() - this._dateDiff;
    this._timers = new Uint32Array(10);
    this._counters = new Uint32Array(10);
    this._lastStep = Date.now();
    this._interruptCalled = 0;
  }

  name() { return 'TinyTimer'; }
  deviceType() { return Device.Type.TIMER; }
  version() { return 0x0; }
  hasInterrupt() { return true; }

  constantList() {
    return {
      TM_TYPE:       0x00,
      TM_VERSION:    0x01,
      TM_INTERRUPT:  0x02,
      TM_NAME:       0x03,
      TM_CLOCK:      0x10,
      TM_TIMER0:     0x14,
      TM_TIMER1:     0x18,
      TM_TIMER2:     0x1C,
      TM_TIMER3:     0x20,
      TM_TIMER4:     0x24,
      TM_TIMER5:     0x28,
      TM_TIMER6:     0x2C,
      TM_TIMER7:     0x30,
      TM_TIMER8:     0x34,
      TM_TIMER9:     0x38,
      TM_COUNTER0:   0x3C,
      TM_COUNTER1:   0x40,
      TM_COUNTER2:   0x44,
      TM_COUNTER3:   0x48,
      TM_COUNTER4:   0x4C,
      TM_COUNTER5:   0x50,
      TM_COUNTER6:   0x54,
      TM_COUNTER7:   0x58,
      TM_COUNTER8:   0x5C,
      TM_COUNTER9:   0x60,
      TM_CUR_INT:    0x64,
    };
  }

  get(a) {
    if (a < 0x10) {
      return super.get(a);
    } else if (a === this._const.TM_CUR_INT) {
      return this._interruptCalled;
    } else {
      let v;
      if (a >= this._const.TM_CLOCK && a < this._const.TM_CLOCK + 4) {
        v = this._currentTime;
      } else if (a >= this._const.TM_TIMER0 && a < this._const.TM_TIMER9 + 4) {
        v = this._timers[Math.floor((a - this._const.TM_TIMER0) / 4)];
      } else if (a >= this._const.TM_COUNTER0 && a < this._const.TM_COUNTER9 + 4) {
        v = this._timers[Math.floor((a - this._const.TM_COUNTER0) / 4)];
      }
      if (v !== undefined) {
        switch (a % 4) {
          case 0: return v & 0xFF;
          case 1: return (v >> 8) & 0xFF;
          case 2: return (v >> 16) & 0xFF;
          case 3: return (v >> 24) & 0xFF;
        }
      }
    }
    return 0;
  }


  set(a, v) {
    if (a < 0x10) {
      super.set(a, v);
    } else {
      let r;
      if (a >= this._const.TM_TIMER0 && a < this._const.TM_TIMER9 + 0x20) {
        r = Math.floor((a - this._const.TM_TIMER0) / 4);
      }
      if (r !== undefined) {
        switch (a % 4) {
          case 0: 
            this._timers[r] &= ~0xFF; this._timers[r] |= v;
            this._counters[r] = 0;
            break;
          case 1: 
            this._timers[r] &= ~0xFF00; this._timers[r] |= (v << 8);
            this._counters[r] = 0;
            break;
          case 2: 
            this._timers[r] &= ~0xFF0000; this._timers[r] |= (v << 16);
            this._counters[r] = 0;
            break;
          case 3: 
            this._timers[r] &= ~0xFF000000; this._timers[r] |= (v << 24);
            this._counters[r] = 0;
            break;
        }
      }
    }
  }


  step() {
    // We update the current time here. This way, the CPU can
    // do an atomic read in the register, without worring about
    // the time changing between successive reads of the 4 bytes.
    this._currentTime = Date.now() - this._dateDiff;

    // update counters
    const now = Date.now();
    for (let i = 0; i < 10; ++i) {
      if (this._timers[i] !== 0) {
        this._counters[i] += (now - this._lastStep);

        if (this._counters[i] >= this._timers[i]) {
          this._counters[i] = 0;
          this._interruptCalled = i;
          this.fireInterrupt();
        }
      }
    }
    this._lastStep = now;
  }

}

// vim: ts=2:sw=2:sts=2:expandtab
