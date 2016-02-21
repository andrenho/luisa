import Device from './device';

export default class Storage extends Device {

  constructor(units) {
    super();

    // check sanity
    if (units === undefined || units.constructor !== Array) {
      throw new Error('`units` must be an array.');
    }
    for (const u of units) {
      if (!u.get || !u.set || !u.size) {
        throw new Error('Missing method in unit');
      }
    }

    this.units = units;

    // STG_OP commands
    this.STG_OP_READ  = 0x1;
    this.STG_OP_WRITE = 0x2;
    this.STG_OP_SIZE  = 0x3;

    // STG_MODE options
    this.STG_MODE_POLL      = 0x0;
    this.STG_MODE_INTERRUPT = 0x1;

    // STG_OP_STATUS responses
    this.STG_STATUS_DONE           = 0x0;
    this.STG_STATUS_WAITING        = 0x1;
    this.STG_STATUS_ADDRESS_ERROR  = 0x2;
    this.STG_STATUS_UNAVALIABLE    = 0x3;
    this.STG_STATUS_PHYSICAL_ERROR = 0x4;
  }

  name() { return 'TinyStorage'; }
  deviceType() { return Device.Type.STORAGE; }
  version() { return 0x0; }
  hasInterrupt() { return true; }

  constantList() {
    return {
      STG_TYPE:      0x00,
      STG_VERSION:   0x01,
      STG_INTERRUPT: 0x02,
      STG_NAME:      0x03,
      STG_MODE:      0x10,
      STG_DONE:      0x11,
      STG_UNIT_LIST: 0x12,
      STG_OP:        0x13,
      STG_P0:        0x14,
      STG_P1:        0x18,
      STG_P2:        0x1C,
      STG_P3:        0x20,
      STG_P4:        0x24,
      STG_P5:        0x28,
      STG_P6:        0x2C,
      STG_P7:        0x30,
      STG_R1:        0x34,
      STG_R2:        0x38,
    };
  }

  get(a) {
    if (a < 0x10) {
      return super.get(a);
    }
    return 0;
  }

  set(a) {
  }

};

// vim: ts=2:sw=2:sts=2:expandtab
