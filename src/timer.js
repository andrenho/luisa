import Device from './device';

export default class Timer extends Device {

  constructor(units) {
    super();
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
    };
  }

  get(a) {
    if (a < 0x10) {
      return super.get(a);
    }
    return 0;
  }


  set(a, v) {
    if (a < 0x10) {
      super.set(a, v);
    }
  }

}

// vim: ts=2:sw=2:sts=2:expandtab
