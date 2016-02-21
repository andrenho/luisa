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
  }

  name() { return "TinyStorage"; }
  deviceType() { return Device.Type.STORAGE; }
  version() { return 0x0; }
  hasInterrupt() { return true; }

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
