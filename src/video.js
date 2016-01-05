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
      VID_WIDTH:      0x10,
      VID_HEIGHT:     0x11,
      VID_OP:         0x12,
      VID_P0:         0x14,
      VID_P1:         0x18,
      VID_P2:         0x1C,
      VID_P3:         0x20,
      VID_P4:         0x24,
      VID_P5:         0x28,
      VID_P6:         0x2C,
      VID_P7:         0x30,
      VID_R0:         0x34,
      VID_R1:         0x38,
      VID_PALETTE:   0x100,
      VID_PIXELS:  0x10000,
      VID_DATA:   0x210000,
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
