/*
 * CPU (Central Processing Unit)
 * -----------------------------
 *
 * Execute instructions from memory.
 *
 * - Expected position: 0xF0001020
 * - Size: 64 bytes
 *
 * - Interrupt: no
 *
 * - Registers:
 *           0000  Device type
 *           0001  Device version
 *     0003..000F  Device name
 *     0010..0013  Register A
 *     0014..0017  Register B
 *     0018..001B  Register C
 *     001C..001F  Register D
 *     0020..0023  Register E
 *     0024..0027  Register F
 *     0028..002B  Register G
 *     002C..002F  Register H
 *     0030..0033  Register I
 *     0034..0037  Register J
 *     0038..003B  Register K
 *     003C..003F  Register L
 *     0040..0043  Register FP (frame pointer)
 *     0044..0047  Register SP (stack pointer)
 *     0048..004B  Register PC (program counter)
 *     004C..004F  Register FL (flags)
 *                    bit 0 - Y (carry)
 *                    bit 1 - V (overflow)
 *                    bit 2 - Z (zero)
 *                    bit 3 - S (sign)
 *                    bit 4 - GZ (greater than zero)
 *                    bit 5 - LZ (less than zero)
 *
 * - Instruction set:
 *     (for now, see https://github.com/andrenho/tinyvm/wiki/CPU)
 */


import Device from '../src/device';

export default class CPU extends Device {

  constructor(motherboard) {
    super();
    this._mb = motherboard;
    this._reg = new Uint32Array(16);
  }

  
  name() {
    return "TinyCPU";
  }

}


// vim: ts=2:sw=2:sts=2:expandtab
