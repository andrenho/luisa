import LSBStorage from './lsbstorage';

export default class Device extends LSBStorage {

  constructor() {
    super();

    this.interruptNumber = 0;   // set externally
    this.mb = null;

    // abstract class
    if (this.constructor === LSBStorage) {
      throw new TypeError('Abstact class cannot be instantiated.');
    }

    // a few assertions
    if (this.name().length > 13) {
      throw new Error('Name must not be longer than 13 bytes');
    }
    let found = false;
    for (let d in Device.Type) {
      if (Device.Type[d] === this.deviceType()) {
        found = true;
      }
    }
    if (!found) {
      throw new Error('Invalid device type "' + this.deviceType() + '"');
    }
    if (this.version() > 0xFF) {
      throw new Error('Maximum version is 0xFF');
    }
    if (this.memorySize() < 0x1000) {
      throw new Error('Memory must be at least 0x1000 bytes.');
    }
  }


  initializeConstants(addr) {
    const ks = this.constantList();
    for (let k in ks) {
      this[k] = ks[k] + addr;
    }
  }


  name() {
    throw new Error('Implement this method');
  }


  deviceType() {
    throw new Error('Implement this method');
  }


  version() {
    throw new Error('Implement this method');
  }


  memorySize() {
    return 0x1000;   // this method can be implement by the children
  }


  hasInterrupt() {
    return false;   // this method can be implement by the children
  }


  constantList() {
    return {};   // this method can be implement by the children
  }


  fireInterrupt() {
    if (this.mb) {
      this.mb.pushInterrupt(this.interruptNumber);
    }
  }


  step(cycles) {
    // this method can be implement by the children
  }


  reset() {
    // this method can be implement by the children
  }


  get(a) {
    switch (a) {
      case 0x0:
        return this.deviceType();
      case 0x1:
        return this.version();
      case 0x2:
        return this.interruptNumber;
    }
    if (a >= 0x3 && a <= 0xF) {
      return this.name().charCodeAt(a - 0x3);
    }
    return 0;
    // this method can be completed by the children
  }


  set(a) {
    // this method can be implement by the children
  }


}


Device.Type = {
  MOTHERBOARD:  0x00,
  MMU:          0x01,
  CPU:          0x02,
  STORAGE:      0x03,
  KEYBOARD:     0x04,
  VIDEO:        0x05,
  // other
  OTHER_INPUT:  0x80,
  OTHER_OUTPUT: 0x81,
  // special devices
  RAM:          0xFD,
  MOTHERBOARD:  0xFE,
  UNUSED:       0xFF,
};


// vim: ts=2:sw=2:sts=2:expandtab
