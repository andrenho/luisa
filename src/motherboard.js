/* 
 * MOTHERBOARD
 * -----------
 *
 * Controls all the other devices.
 *
 * - Max number of devices: 256
 * - Expected position: 0xF0000000
 * - Size: 0x1000 bytes
 *
 * - Interrupt: 1
 *     Fired when invalid memory address (> 0xF0000000) is accessed,
 *     or tried to be written.
 *
 * - Registers:
 *     0000..03FF  Device address (one device each 4 bytes)
 *           0400  Interrupt reason: (MB_ERR_UNAUTH_READ, MB_ERR_UNAUTH_WRITE)
 */

import LSBStorage from './lsbstorage';
import Device from './device';
import RAM from './ram';

export default class Motherboard extends LSBStorage {

  constructor() {
    super();
    this._devices = [];
    this._addr = 0xF0001000;
    this._interruptCount = 1;
    this._mmu = null;
    this._cpu = null;
    this._memory = new RAM(4);  // internal memory
    this._interruptActive = false;
  }


  addDevice(dev) {
    // add device
    this._devices.push(dev);
    dev.initializeConstants(this._addr);
    dev.addr = this._addr;
    this._memory.set32((this._devices.length - 1) * 4, this._addr);
    this._addr += dev.memorySize();

    // add interrupt
    if (dev.hasInterrupt()) {
      dev.interruptNumber = ++this._interruptCount;
    }

    // is it MMU?
    if (dev.deviceType() === Device.Type.MMU) {
      this._mmu = dev;
    } else if (dev.deviceType() === Device.Type.CPU) {
      this._cpu = dev;
    }
  }


  step() {
    // fire own interrupt, if aplicable
    if (this._interruptActive) {
      this._cpu.pushInterrupt(0x1);
      this._interruptActive = false;
    }
    
    // fire devices interrupts, and step
    for (let d of this._devices) {
      if (d.deviceType() !== Device.Type.CPU) {
        d.step();
        if (d.interruptActive) {
          if (this._cpu) {
            this._cpu.pushInterrupt(d.interruptNumber);
          }
          d.interruptActive = false;
        }
      }
    }

    // step CPU
    if (this._cpu) {
      this._cpu.step();
    }
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
      this._interruptActive = true;  // fire interrupt
      return 0;
    }
  }


  set(a, v) {
    if (a < 0xF0000000 && this._mmu) {
      this._mmu.set(a, v);
    } else if (a >= 0xF0000000 && a < 0xF0001000) {
      this._interruptActive = true;  // fire interrupt
    } else {
      for (let d of this._devices) {
        if (a >= d.addr && a < (d.addr + d.memorySize())) {
          d.set(a - d.addr, v);
          return;
        }
      }
      this._interruptActive = true;  // fire interrupt
    }
  }


  memoryMap() {
    let map = [];
    if (this._mmu) {
      map.push({ 
        addr: 0,
        deviceType: Device.Type.RAM, 
        size: this._mmu.active() ? 0xF0000000 : this._mmu.ramSize(),
      });
    }
    if (this._mmu.ramSize() < 0xF0000000 && !this._mmu.active()) {
      map.push({ 
        addr: this._mmu.ramSize(), 
        deviceType: Device.Type.UNUSED, 
        size: 0xF0000000 - this._mmu.ramSize(),
      });
    }
    map.push({ addr: 0xF0000000, deviceType: Device.Type.MOTHERBOARD, size: 0x1000 });
    let addr = 0xF0001000;
    for (let d of this._devices) {
      map.push({ addr, deviceType: d.deviceType(), size: d.memorySize() });
      addr += d.memorySize();
    }
    map.push({ addr, deviceType: Device.Type.UNUSED, size: 0x100000000 - addr });
    return map;
  }

}

// vim: ts=2:sw=2:sts=2:expandtab
