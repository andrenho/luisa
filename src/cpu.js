/*
 * CPU (Central Processing Unit)
 * -----------------------------
 *
 * Execute instructions from memory.
 *
 * - Expected position: 0xF0001020
 * - Size: 64 bytes
 *
 * - Interrupt: 3 (invalid opcode)
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
 *                    bit 4 - GT (greater than zero)
 *                    bit 5 - LT (less than zero)
 *                    bit 6 - P (parity)
 *                    bit 7 - T (interrupts active)
 *     0100..04FF  Interrupt vector (256 interrupts of 4 bytes each)
 *     0500..08FF  System call vector (256 system call of 4 bytes each)
 *
 * - Instruction set:
 *     (for now, see https://github.com/andrenho/tinyvm/wiki/CPU)
 */

/*
 * TODO: 
 *   - improve overflow/carry support (arithmetic)
 *   - improve signedness
 */

import Device from '../src/device';

export default class CPU extends Device {

  // 
  // DEVICE METHODS
  //

  constructor(motherboard) {
    super();
    this._mb = motherboard;
    this.reset();
    this._stepFunction = this.initStepFunctions();
  }


  reset() {
    super.reset();
    this._reg = new Uint32Array(16);
    this._interruptVector = new Uint32Array(256);
    this._syscallVector = new Uint32Array(256);
    this._interruptsPending = [];
    this.PC = this._mb.get32(this._mb.MB_CPU_INIT);
  }

  
  name() {
    return 'TinyCPU';
  }


  hasInterrupt() {
    return true;
  }


  pushInterrupt(n) {
    this._interruptsPending.push(n);
  }


  deviceType() {
    return Device.Type.CPU;
  }


  version() {
    return 0;
  }
  

  constantList() {
    return {
      CPU_A:  0x10,
      CPU_B:  0x14,
      CPU_C:  0x18,
      CPU_D:  0x1C,
      CPU_E:  0x20,
      CPU_F:  0x24,
      CPU_G:  0x28,
      CPU_H:  0x2C,
      CPU_I:  0x30,
      CPU_J:  0x34,
      CPU_K:  0x38,
      CPU_L:  0x3C,
      CPU_FP: 0x40,
      CPU_SP: 0x44,
      CPU_PC: 0x48,
      CPU_FL: 0x4C,
      CPU_INT_VECT:     0x100,
      CPU_SYSCALL_VECT: 0x500,
    };
  }


  get(a) {
    if (a <= 0x10) {
      return super.get(a);
    } else {
      let v;
      if (a <= 0x4F) {
        v = this._reg[Math.floor((a - 0x10) / 4)];
      } else if (a >= 0x100 && a < 0x500) {
        v = this._interruptVector[Math.floor((a - 0x100) / 4)];
      } else if (a >= 0x500 && a < 0x8FF) {
        v = this._syscallVector[Math.floor((a - 0x100) / 4)];
      }
      if (v !== undefined) {
        switch (a % 4) {
          case 0: return v & 0xFF;
          case 1: return (v >> 8) & 0xFF;
          case 2: return (v >> 16) & 0xFF;
          case 3: return (v >> 24) & 0xFF;
        }
      }
    }
  }


  set(a, v) {
    if (a < 0x10) {
      super.set(a, v);
    } else {
      let r, arr;
      if (a >= 0x10 && a <= 0x4F) {
        r = Math.floor((a - 0x10) / 4);
        arr = this._reg;
      } else if (a >= 0x100 && a < 0x500) {
        r = Math.floor((a - 0x100) / 4);
        arr = this._interruptVector;
      } else if (a >= 0x500 && a < 0x8FF) {
        r = Math.floor((a - 0x100) / 4);
        arr = this._syscallVector;
      }
      if (arr) {
        switch (a % 4) {
          case 0: 
            this._reg[r] &= ~0xFF;
            this._reg[r] |= v;
            break;
          case 1: 
            this._reg[r] &= ~0xFF00;
            this._reg[r] |= (v << 8);
            break;
          case 2: 
            this._reg[r] &= ~0xFF0000;
            this._reg[r] |= (v << 16);
            break;
          case 3: 
            this._reg[r] &= ~0xFF000000;
            this._reg[r] |= (v << 24);
            break;
        }
      }
    }
  }


  //
  // STEPPING THROUGH
  //
  

  initStepFunctions() {

    // add invalid opcodes
    let f = [];
    for (let i = 0; i < 256; ++i) {
      f.push((pos) => {
        this.fireInterrupt();
        return 0;
      });
    }

    //
    // MOV
    //
    f[0x01] = pos => {  // mov R, R
      let [reg, mb] = [this._reg, this._mb];
      const r = reg[mb.get(pos + 1)];
      reg[mb.get(pos)] = this._affectFlags(r);
      return 2;
    };
    f[0x02] = pos => {  // mov R, v8
      let [reg, mb] = [this._reg, this._mb];
      const r = mb.get(pos + 1);
      reg[mb.get(pos)] = this._affectFlags(r);
      return 2;
    };
    f[0x03] = pos => {  // mov R, v16
      let [reg, mb] = [this._reg, this._mb];
      const r = mb.get16(pos + 1);
      reg[mb.get(pos)] = this._affectFlags(r);
      return 3;
    };
    f[0x04] = pos => {  // mov R, v32
      let [reg, mb] = [this._reg, this._mb];
      const r = mb.get32(pos + 1);
      reg[mb.get(pos)] = this._affectFlags(r);
      return 5;
    };

    //
    // MOVB
    //

    f[0x05] = pos => {  // movb R, [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = mb.get(reg[p2]);
      reg[p1] = this._affectFlags(r);
      return 2;
    };

    f[0x06] = pos => {  // movb R, [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r = mb.get(p2);
      reg[p1] = this._affectFlags(r);
      return 5;
    };

    f[0x0B] = pos => {  // movb [R], R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p2] & 0xFF;
      mb.set(reg[p1], this._affectFlags(r));
      return 2;
    };

    f[0x0C] = pos => {  // movb [R], v8
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = p2;
      mb.set(reg[p1], this._affectFlags(r));
      return 2;
    };

    f[0x0D] = pos => {  // movb [R], [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = mb.get(reg[p2]);
      mb.set(reg[p1], this._affectFlags(r));
      return 2;
    };

    f[0x0E] = pos => {  // movb [R], [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r = mb.get(p2);
      mb.set(reg[p1], this._affectFlags(r));
      return 5;
    };

    f[0x21] = pos => {  // movb [v32], R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get(pos + 4)];
      const r = reg[p2] & 0xFF;
      mb.set(mb.get32(p1), this._affectFlags(r));
      return 5;
    };

    f[0x22] = pos => {  // movb [v32], v8
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get(pos + 4)];
      const r = p2;
      mb.set(mb.get32(p1), this._affectFlags(r));
      return 5;
    };

    f[0x23] = pos => {  // movb [v32], [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get(pos + 4)];
      const r = mb.get(reg[p2]);
      mb.set(mb.get32(p1), this._affectFlags(r));
      return 5;
    };

    f[0x24] = pos => {  // movb [v32], [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get32(pos + 4)];
      const r = mb.get(mb.get32(p2));
      mb.set(mb.get32(p1), this._affectFlags(r));
      return 8;
    };

    //
    // MOVW
    //

    f[0x07] = pos => {  // movw R, [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = mb.get16(reg[p2]);
      reg[p1] = this._affectFlags(r);
      return 2;
    };

    f[0x08] = pos => {  // movw R, [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r =  mb.get16(p2);
      reg[p1] = this._affectFlags(r);
      return 5;
    };

    f[0x0F] = pos => {  // movw [R], R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p2] & 0xFFFF;
      mb.set16(reg[p1], this._affectFlags(r));
      return 2;
    };

    f[0x1A] = pos => {  // movw [R], v16
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get16(pos + 1)];
      const r = p2;
      mb.set16(reg[p1], this._affectFlags(r));
      return 3;
    };

    f[0x1B] = pos => {  // movw [R], [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = mb.get16(reg[p2]);
      mb.set16(reg[p1], this._affectFlags(r));
      return 2;
    };

    f[0x1C] = pos => {  // movw [R], [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r = mb.get16(p2);
      mb.set16(reg[p1], this._affectFlags(r));
      return 5;
    };

    f[0x25] = pos => {  // movw [v32], R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get(pos + 4)];
      const r = reg[p2] & 0xFFFF;
      mb.set16(mb.get32(p1), this._affectFlags(r));
      return 5;
    };

    f[0x26] = pos => {  // movw [v32], v16
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get16(pos + 4)];
      const r = p2;
      mb.set16(mb.get32(p1), this._affectFlags(r));
      return 6;
    };

    f[0x27] = pos => {  // movw [v32], [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get(pos + 4)];
      mb.set16(mb.get32(p1), mb.get16(reg[p2]));
      return 5;
    };

    f[0x28] = pos => {  // movw [v32], [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get32(pos + 4)];
      mb.set16(mb.get32(p1), mb.get16(mb.get32(p2)));
      return 8;
    };


    //
    // MOVD
    //

    f[0x09] = pos => {  // movd R, [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r =  mb.get32(reg[p2]);
      reg[p1] = this._affectFlags(r);
      return 2;
    };

    f[0x0A] = pos => {  // movd R, [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r =  mb.get32(p2);
      reg[p1] = this._affectFlags(r);
      return 5;
    };

    f[0x1D] = pos => {  // movd [R], R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p2];
      mb.set32(reg[p1], this._affectFlags(r));
      return 2;
    };

    f[0x1E] = pos => {  // movd [R], v32
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r = p2;
      mb.set32(reg[p1], this._affectFlags(r));
      return 5;
    };

    f[0x1F] = pos => {  // movd [R], [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = mb.get32(reg[p2]);
      mb.set32(reg[p1], this._affectFlags(r));
      return 2;
    };

    f[0x20] = pos => {  // movd [R], [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r = mb.get32(p2);
      mb.set32(reg[p1], this._affectFlags(r));
      return 5;
    };

    f[0x29] = pos => {  // movd [v32], R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get(pos + 4)];
      const r = reg[p2];
      mb.set32(mb.get32(p1), this._affectFlags(r));
      return 5;
    };

    f[0x2A] = pos => {  // movd [v32], v32
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get32(pos + 4)];
      const r = p2;
      mb.set32(mb.get32(p1), this._affectFlags(r));
      return 8;
    };

    f[0x2B] = pos => {  // movd [v32], [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get(pos + 4)];
      const r = mb.get32(reg[p2]);
      mb.set32(mb.get32(p1), this._affectFlags(r));
      return 5;
    };

    f[0x2C] = pos => {  // movd [v32], [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get32(pos + 4)];
      const r = mb.get32(mb.get32(p2));
      mb.set32(mb.get32(p1), this._affectFlags(r));
      return 8;
    };

    //
    // OR
    //

    f[0x2D] = pos => {  // or R, R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p1] | reg[p2];
      reg[p1] = this._affectFlags(r);
      return 2;
    };
    
    f[0x2E] = pos => {  // or R, v8
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p1] | p2;
      reg[p1] = this._affectFlags(r);
      return 2;
    };
    
    f[0x2F] = pos => {  // or R, v16
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get16(pos + 1)];
      const r = reg[p1] | p2;
      reg[p1] = this._affectFlags(r);
      return 3;
    };
    
    f[0x30] = pos => {  // or R, v32
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r = reg[p1] | p2;
      reg[p1] = this._affectFlags(r);
      return 5;
    };
    
    //
    // XOR
    //

    f[0x31] = pos => {  // xor R, R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p1] ^ reg[p2];
      reg[p1] = this._affectFlags(r);
      return 2;
    };
    
    f[0x32] = pos => {  // xor R, v8
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p1] ^ p2;
      reg[p1] = this._affectFlags(r);
      return 2;
    };
    
    f[0x33] = pos => {  // xor R, v16
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get16(pos + 1)];
      const r = reg[p1] ^ p2;
      reg[p1] = this._affectFlags(r);
      return 3;
    };
    
    f[0x34] = pos => {  // xor R, v32
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r = reg[p1] ^ p2;
      reg[p1] = this._affectFlags(r);
      return 5;
    };
    
    //
    // AND
    //

    f[0x35] = pos => {  // and R, R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p1] & reg[p2];
      reg[p1] = this._affectFlags(r);
      return 2;
    };
    
    f[0x36] = pos => {  // and R, v8
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p1] & p2;
      reg[p1] = this._affectFlags(r);
      return 2;
    };
    
    f[0x37] = pos => {  // and R, v16
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get16(pos + 1)];
      const r = reg[p1] & p2;
      reg[p1] = this._affectFlags(r);
      return 3;
    };
    
    f[0x38] = pos => {  // and R, v32
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r = reg[p1] & p2;
      reg[p1] = this._affectFlags(r);
      return 5;
    };

    //
    // SHIFT
    //

    f[0x39] = pos => {  // shl R, R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p1] << reg[p2];
      reg[p1] = this._affectFlags(r);
      this.Y = ((reg[p1] >> 31) & 1) == 1;
      return 2;
    };

    f[0x3A] = pos => {  // shl R, v8
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p1] << p2;
      reg[p1] = this._affectFlags(r);
      this.Y = ((reg[p1] >> 31) & 1) == 1;
      return 2;
    };

    f[0x3D] = pos => {  // shr R, R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p1] >> reg[p2];
      reg[p1] = this._affectFlags(r);
      this.Y = (reg[p1] & 1) == 1;
      return 2;
    };

    f[0x3E] = pos => {  // shr R, v8
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p1] >> p2;
      reg[p1] = this._affectFlags(r);
      this.Y = (reg[p1] & 1) == 1;
      return 2;
    };

    //
    // NOT
    //

    f[0x41] = pos => {  // not
      let [reg, mb] = [this._reg, this._mb];
      const [p1] = [mb.get(pos)];
      const r = ~reg[p1];
      reg[p1] = this._affectFlags(r);
      return 1;
    };

    // 
    // ARITHMETIC
    //

    f[0x42] = pos => {  // add R, R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p1] + reg[p2] + (this.Y ? 1 : 0);
      reg[p1] = this._affectFlags(r);
      return 2;
    };
    
    f[0x43] = pos => {  // add R, v8
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p1] + p2 + (this.Y ? 1 : 0);
      reg[p1] = this._affectFlags(r);
      this.Y = (r > 0xFFFFFFFF);
      return 2;
    };
    
    f[0x44] = pos => {  // add R, v16
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get16(pos + 1)];
      const r = reg[p1] + p2 + (this.Y ? 1 : 0);
      reg[p1] = this._affectFlags(r);
      this.Y = (r > 0xFFFFFFFF);
      return 3;
    };
    
    f[0x45] = pos => {  // add R, v32
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r = reg[p1] + p2 + (this.Y ? 1 : 0);
      reg[p1] = this._affectFlags(r);
      this.Y = (r > 0xFFFFFFFF);
      return 5;
    };
    
    f[0x46] = pos => {  // sub R, R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p1] - reg[p2] - (this.Y ? 1 : 0);
      reg[p1] = this._affectFlags(r);
      this.Y = (r < 0);
      return 2;
    };
    
    f[0x47] = pos => {  // sub R, v8
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p1] - p2 - (this.Y ? 1 : 0);
      reg[p1] = this._affectFlags(r);
      this.Y = (r < 0);
      return 2;
    };
    
    f[0x48] = pos => {  // sub R, v16
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get16(pos + 1)];
      const r = reg[p1] - p2 - (this.Y ? 1 : 0);
      reg[p1] = this._affectFlags(r);
      this.Y = (r < 0);
      return 3;
    };
    
    f[0x49] = pos => {  // sub R, v32
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r = reg[p1] - p2 - (this.Y ? 1 : 0);
      reg[p1] = this._affectFlags(r);
      this.Y = (r < 0);
      return 5;
    };
    
    f[0x4A] = pos => {  // cmp R, R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      this._affectFlags(reg[p1] - reg[p2], 32);
      this.LT = reg[p1] < reg[p2];
      this.GT = reg[p1] > reg[p2];
      this.Y = (reg[p1] - reg[p2]) < 0;
      return 2;
    };
    
    f[0x4B] = pos => {  // cmp R, v8
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      this._affectFlags(reg[p1] - p2, 8);
      this.LT = reg[p1] < p2;
      this.GT = reg[p1] > p2;
      this.Y = (reg[p1] - p2) < 0;
      return 2;
    };
    
    f[0x4C] = pos => {  // cmp R, v16
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get16(pos + 1)];
      this._affectFlags(reg[p1] - p2, 16);
      this.LT = reg[p1] < p2;
      this.GT = reg[p1] > p2;
      this.Y = (reg[p1] - p2) < 0;
      return 3;
    };
    
    f[0x4D] = pos => {  // cmp R, v32
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      this._affectFlags(reg[p1] - p2, 32);
      this.LT = reg[p1] < p2;
      this.GT = reg[p1] > p2;
      this.Y = (reg[p1] - p2) < 0;
      return 5;
    };

    f[0x4E] = pos => {  // mul R, R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p1] * reg[p2];
      reg[p1] = this._affectFlags(r);
      this.V = (r > 0xFFFFFFFF);
      return 2;
    };
    
    f[0x4F] = pos => {  // mul R, v8
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p1] * p2;
      reg[p1] = this._affectFlags(r);
      this.V = (r > 0xFFFFFFFF);
      return 2;
    };
    
    f[0x50] = pos => {  // mul R, v16
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get16(pos + 1)];
      const r = reg[p1] * p2;
      reg[p1] = this._affectFlags(r);
      this.V = (r > 0xFFFFFFFF);
      return 3;
    };
    
    f[0x51] = pos => {  // mul R, v32
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r = reg[p1] * p2;
      reg[p1] = this._affectFlags(r);
      this.V = (r > 0xFFFFFFFF);
      return 5;
    };
    
    f[0x52] = pos => {  // idiv R, R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = Math.floor(reg[p1] / reg[p2]);
      reg[p1] = this._affectFlags(r);
      return 2;
    };
    
    f[0x53] = pos => {  // idiv R, v8
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = Math.floor(reg[p1] / p2);
      reg[p1] = this._affectFlags(r);
      return 2;
    };
    
    f[0x54] = pos => {  // idiv R, v16
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get16(pos + 1)];
      const r = Math.floor(reg[p1] / p2);
      reg[p1] = this._affectFlags(r);
      return 3;
    };
    
    f[0x55] = pos => {  // idiv R, v32
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r = Math.floor(reg[p1] / p2);
      reg[p1] = this._affectFlags(r);
      return 5;
    };
    
    f[0x56] = pos => {  // mod R, R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p1] % reg[p2];
      reg[p1] = this._affectFlags(r);
      return 2;
    };
    
    f[0x57] = pos => {  // mod R, v8
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p1] % p2;
      reg[p1] = this._affectFlags(r);
      return 2;
    };
    
    f[0x58] = pos => {  // mod R, v16
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get16(pos + 1)];
      const r = reg[p1] % p2;
      reg[p1] = this._affectFlags(r);
      return 3;
    };
    
    f[0x59] = pos => {  // mod R, v32
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r = reg[p1] % p2;
      reg[p1] = this._affectFlags(r);
      return 5;
    };

    f[0x5A] = pos => {  // inc R
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get(pos);
      const r = reg[p1] + 1;
      reg[p1] = this._affectFlags(r);
      this.Y = (r > 0xFFFFFFFF);
      return 1;
    };
    
    f[0x5B] = pos => {  // dec R
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get(pos);
      const r = reg[p1] - 1;
      reg[p1] = this._affectFlags(r);
      this.Y = (r < 0);
      return 1;
    };

    //
    // BRANCHES
    //

    f[0x5C] = pos => {  // bz A
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get(pos);
      if (this.Z) {
        this.PC = reg[p1];
        return 0;
      }
      return 1;
    };


    f[0x5D] = pos => {  // bz v32
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get32(pos);
      if (this.Z) {
        this.PC = p1;
        return 0;
      }
      return 4;
    };


    f[0x5E] = pos => {  // bz A
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get(pos);
      if (!this.Z) {
        this.PC = reg[p1];
        return 0;
      }
      return 1;
    };


    f[0x5F] = pos => {  // bz v32
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get32(pos);
      if (!this.Z) {
        this.PC = p1;
        return 0;
      }
      return 4;
    };


    f[0x60] = pos => {  // bneg A
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get(pos);
      if (this.S) {
        this.PC = reg[p1];
        return 0;
      }
      return 1;
    };


    f[0x61] = pos => {  // bneg v32
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get32(pos);
      if (this.S) {
        this.PC = p1;
        return 0;
      }
      return 4;
    };


    f[0x62] = pos => {  // bpos A
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get(pos);
      if (!this.S) {
        this.PC = reg[p1];
        return 0;
      }
      return 1;
    };


    f[0x63] = pos => {  // bpos v32
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get32(pos);
      if (!this.S) {
        this.PC = p1;
        return 0;
      }
      return 4;
    };


    f[0x64] = pos => {  // bgt A
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get(pos);
      if (this.GT) {
        this.PC = reg[p1];
        return 0;
      }
      return 1;
    };


    f[0x65] = pos => {  // bgt v32
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get32(pos);
      if (this.GT) {
        this.PC = p1;
        return 0;
      }
      return 4;
    };


    f[0x66] = pos => {  // bgte A
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get(pos);
      if (this.GT && this.Z) {
        this.PC = reg[p1];
        return 0;
      }
      return 1;
    };


    f[0x67] = pos => {  // bgte v32
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get32(pos);
      if (this.GT && this.Z) {
        this.PC = p1;
        return 0;
      }
      return 4;
    };


    f[0x68] = pos => {  // blt A
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get(pos);
      if (this.LT) {
        this.PC = reg[p1];
        return 0;
      }
      return 1;
    };


    f[0x69] = pos => {  // blt v32
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get32(pos);
      if (this.LT) {
        this.PC = p1;
        return 0;
      }
      return 4;
    };


    f[0x6A] = pos => {  // blte A
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get(pos);
      if (this.LT && this.Z) {
        this.PC = reg[p1];
        return 0;
      }
      return 1;
    };


    f[0x6B] = pos => {  // blte v32
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get32(pos);
      if (this.LT && this.Z) {
        this.PC = p1;
        return 0;
      }
      return 4;
    };


    f[0x6C] = pos => {  // bv A
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get(pos);
      if (this.V) {
        this.PC = reg[p1];
        return 0;
      }
      return 1;
    };


    f[0x6D] = pos => {  // bv v32
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get32(pos);
      if (this.V) {
        this.PC = p1;
        return 0;
      }
      return 4;
    };


    f[0x6E] = pos => {  // bv A
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get(pos);
      if (!this.V) {
        this.PC = reg[p1];
        return 0;
      }
      return 1;
    };


    f[0x6F] = pos => {  // bv v32
      let [reg, mb] = [this._reg, this._mb];
      const p1 = mb.get32(pos);
      if (!this.V) {
        this.PC = p1;
        return 0;
      }
      return 4;
    };


    f[0x70] = pos => {  // jmp A
      let [reg, mb] = [this._reg, this._mb];
      const p1 = this._mb.get(pos);
      this.PC = this._reg[p1];
      return 0;
    };


    f[0x71] = pos => {  // jmp v32
      const p1 = this._mb.get32(pos);
      this.PC = p1;
      return 0;
    };


    f[0x72] = pos => {  // jsr A
      const p1 = this._mb.get(pos);
      this._push32(this.PC + 2);
      this.PC = this._reg[p1];
      return 0;
    };


    f[0x73] = pos => {  // jsr v32
      const p1 = this._mb.get32(pos);
      this._push32(this.PC + 5);
      this.PC = p1;
      return 0;
    };

    f[0x74] = pos => {  // ret
      this.PC = this._pop32();
      return 0;
    };

    f[0x75] = pos => {  // sys R
      const p1 = this._mb.get(pos);
      // TODO - enter supervisor mode
      this._push32(this.PC + 2);
      this.PC = this._syscallVector[this._reg[p1] & 0xFF];
      return 0;
    };
      
    f[0x76] = pos => {  // sys v8
      const p1 = this._mb.get(pos);
      // TODO - enter supervisor mode
      this._push32(this.PC + 2);
      this.PC = this._syscallVector[p1];
      return 0;
    };
      
    f[0x77] = pos => {  // iret
      this.PC = this._pop32();
      this.T = true;
      return 0;
    };



    return f;
  }


  step() {
    // execute
    const n = this._stepFunction[this._mb.get(this.PC)](this.PC + 1);
    if (n) {
      this.PC += n + 1;
    }

    // check for interrupts
    if (this.I && this._interruptsPending.length > 0) {
      let n = this._interruptsPending.shift();
      this._push32(this.PC);
      this.T = false;
      this.PC = this._interruptVector[n];
    }
  }


  _affectFlags(value) {
    this.Z = ((value & 0xFFFFFFFF) === 0);
    this.P = ((value % 2) === 0);
    this.S = ((value >> 31) & 0x1 ? true : false);
    this.V = false;
    this.Y = false;
    this.GT = false;
    this.LT = false;
    return value & 0xFFFFFFFF;
  }


  // 
  // STACK
  //

  _push(value) {
    this._mb.set(this.SP, value);
    this.SP -= 1;
  }


  _push16(value) {
    this.SP -= 1;
    this._mb.set16(this.SP, value);
    this.SP -= 1;
  }


  _push32(value) {
    this.SP -= 3;
    this._mb.set32(this.SP, value);
    this.SP -= 1;
  }
  

  _pop() {
    this.SP += 1;
    return this._mb.get(this.SP);
  }


  _pop16() {
    this.SP += 1;
    const r = this._mb.get16(this.SP);
    this.SP += 1;
    return r;
  }


  _pop32() {
    this.SP += 1;
    const r = this._mb.get32(this.SP);
    this.SP += 3;
    return r;
  }


  //
  // GETTERS / SETTERS
  //

  get A() { return this._reg[0]; }
  get B() { return this._reg[1]; }
  get C() { return this._reg[2]; }
  get D() { return this._reg[3]; }
  get E() { return this._reg[4]; }
  get F() { return this._reg[5]; }
  get G() { return this._reg[6]; }
  get H() { return this._reg[7]; }
  get I() { return this._reg[8]; }
  get J() { return this._reg[9]; }
  get K() { return this._reg[10]; }
  get L() { return this._reg[11]; }
  get FP() { return this._reg[12]; }
  get SP() { return this._reg[13]; }
  get PC() { return this._reg[14]; }
  get FL() { return this._reg[15]; }

  set A(v) { this._reg[0] = v; }
  set B(v) { this._reg[1] = v; }
  set C(v) { this._reg[2] = v; }
  set D(v) { this._reg[3] = v; }
  set E(v) { this._reg[4] = v; }
  set F(v) { this._reg[5] = v; }
  set G(v) { this._reg[6] = v; }
  set H(v) { this._reg[7] = v; }
  set I(v) { this._reg[8] = v; }
  set J(v) { this._reg[9] = v; }
  set K(v) { this._reg[10] = v; }
  set L(v) { this._reg[11] = v; }
  set FP(v) { this._reg[12] = v; }
  set SP(v) { this._reg[13] = v & 0xFFFFFFFF; }
  set PC(v) { this._reg[14] = v; }
  set FL(v) { this._reg[15] = v; }

  get Y() { return (this._reg[15] & 0x1) ? true : false; }
  get V() { return ((this._reg[15] >> 1) & 0x1) ? true : false; }
  get Z() { return ((this._reg[15] >> 2) & 0x1) ? true : false; }
  get S() { return ((this._reg[15] >> 3) & 0x1) ? true : false; }
  get GT() { return ((this._reg[15] >> 4) & 0x1) ? true : false; }
  get LT() { return ((this._reg[15] >> 5) & 0x1) ? true : false; }
  get P() { return ((this._reg[15] >> 6) & 0x1) ? true : false; }
  get T() { return ((this._reg[15] >> 7) & 0x1) ? true : false; }

  // jscs:disable validateIndentation
  set Y(v) { if (v) this._reg[15] |= (1 << 0); else this._reg[15] &= ~(1 << 0); }
  set V(v) { if (v) this._reg[15] |= (1 << 1); else this._reg[15] &= ~(1 << 1); }
  set Z(v) { if (v) this._reg[15] |= (1 << 2); else this._reg[15] &= ~(1 << 2); }
  set S(v) { if (v) this._reg[15] |= (1 << 3); else this._reg[15] &= ~(1 << 3); }
  set GT(v) { if (v) this._reg[15] |= (1 << 4); else this._reg[15] &= ~(1 << 4); }
  set LT(v) { if (v) { this._reg[15] |= (1 << 5); } else { this._reg[15] &= ~(1 << 5); } }
  set P(v) { if (v) { this._reg[15] |= (1 << 6); } else { this._reg[15] &= ~(1 << 6); } }
  set T(v) { if (v) { this._reg[15] |= (1 << 7); } else { this._reg[15] &= ~(1 << 6); } }
  // jscs:enable validateIndentation

}


// vim: ts=2:sw=2:sts=2:expandtab
