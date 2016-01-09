/* 
 * MMU (Memory management unit)
 * ----------------------------
 *
 * Coordinate virtual memory management and translate memory access addresses.
 *
 * - Expected position: 0xF0001000
 * - Size: 32 bytes
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
 * 
 * VIRTUAL MEMORY
 * --------------
 *
 * Virtual memory is activated by setting the 31th bit of VMEM. If the virtual 
 * memory is enabled, the process for finding the physical address is this:
 *
 * 1. Divide the accessed address and find the directory index, the page table
 *    index and the page offset:
 *       00..0B - Page offset (12 bits, max value 0xFFF)
 *       0C..15 - Page table offset (10 bits, max value 0x3FF)
 *       16..1F - Page directory offset (10 bits, max value 0x3FF)
 *
 * 2. Go to the page directory set in the VMEM register. Each page is 0x1000
 *    (4096 bytes) in size, so to find the starting address of the page, the
 *    value is multiplied by 0x1000.
 *
 * 3. Find the address offset in the page directory. Since each record is 4
 *    bytes long, the offset is the beginning of the page directory + (offset * 4).
 *    This address will contain a 4-byte value, which is the the page that 
 *    contains the page table.
 *
 * 4. The page table page value is multipled by 0x1000 to find the beginning 
 *    of the page. To that value is added the page table offset * 4. This contain
 *    the memory page that contains the information.
 *
 * 5. The final data is found in page beginning + page offset.
 *
 *
 * PAGE INDEX FORMAT
 * -----------------
 *
 *     11111111111111110000000000000000
 *     FEDCBA9876543210FEDCBA9876543210
 *
 *     AxxxxxxxxxPPPPPPPPPPPPPPPPPPPPPP
 *     
 *     A = active
 *     x = doesn't matter
 *     P = page index (24 bits)
 */

import Device from './device';

export default class MMU extends Device {

  constructor(ram) {
    super();
    this._ram = ram;
    this.reset();

    this.MMU_ERR_NONE          = 0x0;
    this.MMU_ERR_OUT_OF_BOUNDS = 0x1;
    this.MMU_PAGE_FAULT        = 0x2;
  }

  reset() {
    this._active = false;
    this._lastError = 0;
    this._vmem = {
      active: false,
      page: 0,
    };
  }

  name() { return 'TinyMMU'; }

  deviceType() { return Device.Type.MMU; }

  version() { return 0; }

  hasInterrupt() { return true; }

  constantList() {
    return {
      MMU_TYPE:      0x00,
      MMU_VERSION:   0x01,
      MMU_INTERRUPT: 0x02,
      MMU_NAME:      0x03,
      MMU_RAM_SZ:    0x10,
      MMU_VMEM:      0x14,
      MMU_ERR:       0x18,
    };
  }

  get active() {
    return this._vmem.active;
  }


  translate(a) {
    if (this._vmem.active) {
      const pageOffset = (a & 0xFFF);
      const pageTableOffset = (a >> 12) & 0x3FF;
      const pageDirectoryOffset = (a >> 22) & 0x3FF;
      
      const pageDirectoryAddress = (this._vmem.page * 0x1000) + (pageDirectoryOffset * 4);
      const pageTableData = this._ram.get32(pageDirectoryAddress);
      const pageTable = {
        page:   pageTableData & 0xFFFF,
        active: (pageTableData >> 31) ? true : false,
      };
      if (!pageTable.active) {
        let e = new Error();
        e.name = 'page fault';
        throw e;
      }
      const pageTableAddress = (pageTable.page * 0x1000) + (pageTableOffset * 4);
      const pageData = this._ram.get32(pageTableAddress);
      const page = {
        page: pageData & 0xFFFF,
        active: (pageData >> 31) ? true : false,
      };
      if (!page.active) {
        let e = new Error();
        e.name = 'page fault';
        throw e;
      }

      const location = (page.page * 0x1000) + pageOffset;
      return location;
    } else {
      return a;
    }
  }


  get(a) {
    switch (a) {
      // MMU_RAM_SZ
      case 0x10: return this._ram.size & 0xFF;
      case 0x11: return (this._ram.size >> 8) & 0xFF;
      case 0x12: return (this._ram.size >> 16) & 0xFF;
      case 0x13: return (this._ram.size >> 24) & 0xFF;
      // MMU_VMEM
      case 0x14: return this._vmem.page & 0xFF;
      case 0x15: return (this._vmem.page >> 8) & 0xFF;
      case 0x16: return 0;
      case 0x17: return this._vmem.active ? 0x80 : 0x0;
      // MMU_ERR
      case 0x18: return this._lastError & 0xFF;
      case 0x19: return (this._lastError >> 8) & 0xFF;
      case 0x1A: return (this._lastError >> 16) & 0xFF;
      case 0x1B: return (this._lastError >> 24) & 0xFF;
      // others
      default:
        return super.get(a);
    }
  }


  set(a, v) {
    switch (a) {
      // MMU_VMEM
      case 0x14: 
        this._vmem.page &= ~0xFF;
        this._vmem.page |= (v & 0xFF);
        break;
      case 0x15:
        this._vmem.page &= ~0xFF00;
        this._vmem.page |= (v << 8) & 0x7F;
        break;
      case 0x17:
        this._vmem.active = (v >> 7) ? true : false;
        break;
      // MMU_ERR
      case 0x18: 
        this._lastError &= ~0xFF;
        this._lastError |= (v & 0xFF);
        break;
      case 0x19:
        this._lastError &= ~0xFF00;
        this._lastError |= (v << 8);
        break;
      case 0x1A:
        this._lastError &= ~0xFF0000;
        this._lastError |= (v << 16);
        break;
      case 0x1B:
        this._lastError &= ~0xFF000000;
        this._lastError |= (v << 24);
        break;
      default:
        super.set(a, v);
    }
  }


  getMemory(a) {
    try {
      return this._ram.get(this.translate(a));
    } catch (e) {
      if (e.name === 'out of bounds') {
        this.fireInterrupt(this.MMU_ERR_OUT_OF_BOUNDS);
        return 0;
      } else {
        throw e;
      }
    }
  }


  setMemory(a, v) {
    try {
      this._ram.set(this.translate(a), v);
    } catch (e) {
      if (e.name === 'out of bounds') {
        this.fireInterrupt(this.MMU_ERR_OUT_OF_BOUNDS);
      } else {
        throw e;
      }
    }
  }


  fireInterrupt(err) {
    this._lastError |= err;
    super.fireInterrupt();
  }


}

// vim: ts=2:sw=2:sts=2:expandtab
