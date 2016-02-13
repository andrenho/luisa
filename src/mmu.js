/* 
 * MMU (Memory management unit)
 * ----------------------------
 *
 * Coordinate virtual memory management and translate memory access addresses.
 *
 * - Expected position: 0xF0001000
 * - Size: ?
 *
 * - Interrupt: 2
 *     Fired on the following memory errors:
 *       - MMU_ERR_NONE (0x0)
 *       - MMU_ERR_OUT_OF_BOUNDS (0x1)
 *       - MMU_PAGE_FAULT (0x2)
 *
 * - Registers:
 *           0000  Device type
 *           0001  Device version
 *     0003..000F  Device name
 *     0010..0013  MMU_RAM_SZ:  Physical memory size
 *     0014..0017  MMU_ERR:     Last error (see Interrupt for values)
 *           0018  MMU_VMEM:    Virtual memory activation
 *
 */

import Device from '../src/device';

export default class MMU extends Device {

  constructor(ram) {
    super();
    this._ram = ram;
    this._active = false;

    this._last_error = 0;
    this._vmem = {
      active: false,
      page: 0,
    };

    this.MMU_ERR_NONE =          0x0;
    this.MMU_ERR_OUT_OF_BOUNDS = 0x1;
    this.MMU_PAGE_FAULT        = 0x2;
  }

  name() { return 'TinyMMU'; }

  deviceType() { return Device.Type.MMU; }

  version() { return 0; }

  memorySize() { return 16; }

  hasInterrupt() { return true; }

  constantList() {
    return {
      MMU_RAM_SZ: 0x10,
      MMU_VMEM:   0x14,
      MMU_ERR:    0x18,
    };
  }

  get active() {
    return this._active;
  }


  translate(a) {
    if(this._active) {
      // TODO
      throw new Error('TODO');
    } else {
      return a;
    }
  }


  get(a) {
    switch(a) {
      // MMU_RAM_SZ
      case 0x10: return this._ram.size & 0xFF;
      case 0x11: return (this._ram.size >> 8) & 0xFF;
      case 0x12: return (this._ram.size >> 16) & 0xFF;
      case 0x13: return (this._ram.size >> 24) & 0xFF;
      // MMU_VMEM
      // TODO
      // MMU_ERR
      case 0x18: return this._last_error & 0xFF;
      case 0x19: return (this._last_error >> 8) & 0xFF;
      case 0x1A: return (this._last_error >> 16) & 0xFF;
      case 0x1B: return (this._last_error >> 24) & 0xFF;
      // others
      default:
        return super.get(a);
    } 
  }


  set(a, v) {
    switch(a) {
      case 0x18: 
        this._last_error &= ~0xFF;
        this._last_error |= (v & 0xFF);
        break;
      case 0x19:
        this._last_error &= ~0xFF00;
        this._last_error |= (v << 8);
        break;
      case 0x1A:
        this._last_error &= ~0xFF0000;
        this._last_error |= (v << 16);
        break;
      case 0x1B:
        this._last_error &= ~0xFF000000;
        this._last_error |= (v << 24);
        break;
      default:
        super.set(a, v);
    }
  }


  getMemory(a) {
    if(this._active) {
      // TODO
      throw new Error('TODO');
    } else {
      try {
        return this._ram.get(a);
      } catch(e) {
        if (e.name === 'out of bounds') {
          this.fireInterrupt(this.MMU_ERR_OUT_OF_BOUNDS);
        } else {
          throw e;
        }
      }
    }
  }


  setMemory(a, v) {
    if(this._active) {
      // TODO
      throw new Error('TODO');
    } else {
      try {
        this._ram.set(a, v);
      } catch(e) {
        if (e.name === 'out of bounds') {
          this.fireInterrupt(this.MMU_ERR_OUT_OF_BOUNDS);
        } else {
          throw e;
        }
      }
    }
  }


  fireInterrupt(err) {
    this._last_error |= err;
    super.fireInterrupt();
  }


}

// vim: ts=2:sw=2:sts=2:expandtab
