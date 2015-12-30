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
    return 0;
  }


}

// vim: ts=2:sw=2:sts=2:expandtab
