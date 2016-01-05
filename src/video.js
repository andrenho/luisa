import Device from './device';

export default class Video extends Device {

  constructor() {
    super();
    this._const = this.constantList();
  }

  name() { return 'TinyVideo'; }
  deviceType() { return Device.Type.VIDEO; }
  version() { return 0x0; }
  hasInterrupt() { return false; }
  memorySize() { return 0x6000000; /* 96 Mb */ }

  constantList() {
    return {
      VID_TYPE:       0x00,
      VID_VERSION:    0x01,
      VID_INTERRUPT:  0x02,
      VID_NAME:       0x03,
      VID_CODE:       0x10,
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
