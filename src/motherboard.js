import LSBStorage from './lsbstorage';
import Device from './device';
import RAM from './ram';

export default class Motherboard extends LSBStorage {

  constructor() {
    super();
    this._devices = [];
    this._addr = 0xF0001000;
    this._mmu = null;
    this._memory = new RAM(4);  // internal memory
  }


  addDevice(dev) {
    // add device
    this._devices.push(dev);
    dev.initializeConstants(this._addr);
    dev.addr = this._addr;
    this._memory.set32((this._devices.length - 1) * 4, this._addr);
    this._addr += dev.memorySize();

    // is it MMU?
    if (dev.deviceType() === Device.Type.MMU) {
      this._mmu = dev;
    }

    // TODO - set interrupt
  }
  

  get devices() { 
    return this._devices.slice(0);  // clone array to not allow copying
  }


  get(a) {
    if (a < 0xF0000000 && this._mmu) {
      return this._mmu.get(a);
    } else if (a >= 0xF0000000 && a < 0xF0001000) {
      return this._memory.get(a - 0xF0000000);
    } else {
      for (let d of this._devices) {
        if (a >= d.addr && a < (d.addr + d.memorySize())) {
          return d.get(a - d.addr);
        }
      }
      // TODO - fire interrupt
      return 0;
    }
  }


  set(a, v) {
    if (a < 0xF0000000 && this._mmu) {
      this._mmu.set(a, v);
    } else if (a >= 0xF0000000 && a < 0xF0001000) {
      // TODO - fire interrupt
    } else {
      for (let d of this._devices) {
        if (a >= d.addr && a < (d.addr + d.memorySize())) {
          d.set(a - d.addr, v);
          return;
        }
      }
      // TODO - fire interrupt
    }
  }


  memoryMap() {
    let map = [];
    if(this._mmu) {
      map.push({ 
        addr: 0,
        deviceType: Device.Type.RAM, 
        size: this._mmu.active() ? 0xF0000000 : this._mmu.ramSize(),
      });
    }
    if(this._mmu.ramSize() < 0xF0000000 && !this._mmu.active()) {
      map.push({ 
        addr: this._mmu.ramSize(), 
        deviceType: Device.Type.UNUSED, 
        size: 0xF0000000 - this._mmu.ramSize() 
      });
    }
    map.push({ addr: 0xF0000000, deviceType: Device.Type.MOTHERBOARD, size: 0x1000 });
    let addr = 0xF0001000;
    for(let d of this._devices) {
      map.push({ addr, deviceType: d.deviceType(), size: d.memorySize() });
      addr += d.memorySize();
    }
    map.push({ addr, deviceType: Device.Type.UNUSED, size: 0x100000000 - addr });
    return map;
  }

}

// vim: ts=2:sw=2:sts=2:expandtab
