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
      CPU_INTERRUPT_VECT: 0x100,
      CPU_SYSCALL_VECT:   0x500,
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
        v = this._syscallVector[Math.floor((a - 0x500) / 4)];
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
        r = Math.floor((a - 0x500) / 4);
        arr = this._syscallVector;
      }
      if (arr) {
        switch (a % 4) {
          case 0: 
            arr[r] &= ~0xFF;
            arr[r] |= v;
            break;
          case 1: 
            arr[r] &= ~0xFF00;
            arr[r] |= (v << 8);
            break;
          case 2: 
            arr[r] &= ~0xFF0000;
            arr[r] |= (v << 16);
            break;
          case 3: 
            arr[r] &= ~0xFF000000;
            arr[r] |= (v << 24);
            break;
        }
      }
    }
  }


  //
  // STEPPING THROUGH
  //
  

  step() {
    const n = this._stepFunction[this._mb.get(this.PC)](this.PC + 1);
    if (n) {
      this.PC += n + 1;
    }
  }

  
  checkInterrupts() {
    if (this.T && this._interruptsPending.length > 0) {
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


  //
  // INSTRUCTIONS
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
      mb.set(p1, this._affectFlags(r));
      return 5;
    };

    f[0x22] = pos => {  // movb [v32], v8
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get(pos + 4)];
      const r = p2;
      mb.set(p1, this._affectFlags(r));
      return 5;
    };

    f[0x23] = pos => {  // movb [v32], [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get(pos + 4)];
      const r = mb.get(reg[p2]);
      mb.set(p1, this._affectFlags(r));
      return 5;
    };

    f[0x24] = pos => {  // movb [v32], [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get32(pos + 4)];
      const r = mb.get(mb.get32(p2));
      mb.set(p1, this._affectFlags(r));
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
      mb.set16(p1, this._affectFlags(r));
      return 5;
    };

    f[0x26] = pos => {  // movw [v32], v16
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get16(pos + 4)];
      const r = p2;
      mb.set16(p1, this._affectFlags(r));
      return 6;
    };

    f[0x27] = pos => {  // movw [v32], [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get(pos + 4)];
      mb.set16(p1, mb.get16(reg[p2]));
      return 5;
    };

    f[0x28] = pos => {  // movw [v32], [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get32(pos + 4)];
      mb.set16(p1, mb.get16(mb.get32(p2)));
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
      mb.set32(p1, this._affectFlags(r));
      return 5;
    };

    f[0x2A] = pos => {  // movd [v32], v32
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get32(pos + 4)];
      const r = p2;
      debugger;
      mb.set32(p1, this._affectFlags(r));
      return 8;
    };

    f[0x2B] = pos => {  // movd [v32], [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get(pos + 4)];
      const r = mb.get32(reg[p2]);
      mb.set32(p1, this._affectFlags(r));
      return 5;
    };

    f[0x2C] = pos => {  // movd [v32], [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get32(pos + 4)];
      const r = mb.get32(mb.get32(p2));
      mb.set32(p1, this._affectFlags(r));
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

    f[0x86] = pos => {  // sret
      this.PC = this._pop32();
      // TODO - leave supervisor mode
      return 0;
    };

    f[0x78] = pos => {  // pushb R
      const p1 = this._mb.get(pos);
      this._push(this._reg[p1] & 0xFF);
      return 1;
    };

    f[0x79] = pos => {  // pushb v8
      const p1 = this._mb.get(pos);
      this._push(p1);
      return 1;
    };

    f[0x7A] = pos => {  // pushw R
      const p1 = this._mb.get(pos);
      this._push16(this._reg[p1] & 0xFFFF);
      return 1;
    };

    f[0x7B] = pos => {  // pushw v16
      const p1 = this._mb.get16(pos);
      this._push16(p1);
      return 2;
    };

    f[0x7C] = pos => {  // pushw R
      const p1 = this._mb.get(pos);
      this._push32(this._reg[p1]);
      return 1;
    };

    f[0x7D] = pos => {  // pushw v16
      const p1 = this._mb.get32(pos);
      this._push32(p1);
      return 4;
    };

    f[0x7E] = pos => {  // push.a
      for (let i = 0x0; i <= 0xB; ++i) {
        this._push32(this._reg[i]);
      }
      return 0;
    };

    f[0x7F] = pos => {  // popb R
      const p1 = this._mb.get(pos);
      this._reg[p1] = this._pop();
      return 1;
    };

    f[0x80] = pos => {  // popw R
      const p1 = this._mb.get(pos);
      this._reg[p1] = this._pop16();
      return 1;
    };

    f[0x81] = pos => {  // popw R
      const p1 = this._mb.get(pos);
      this._reg[p1] = this._pop32();
      return 1;
    };

    f[0x82] = pos => {  // pop.a
      for (let i = 0xB; i >= 0x0; --i) {
        this._reg[i] = this._pop32();
      }
      return 0;
    };

    f[0x83] = pos => {  // popx R
      const p1 = this._mb.get(pos);
      for (let i = 0; i < this._reg[p1]; ++i) {
        this._pop();
      }
      return 1;
    };
      
    f[0x84] = pos => {  // popx v8
      const p1 = this._mb.get(pos);
      for (let i = 0; i < p1; ++i) {
        this._pop();
      }
      return 1;
    };
      
    f[0x85] = pos => {  // popx v16
      const p1 = this._mb.get16(pos);
      for (let i = 0; i < p1; ++i) {
        this._pop();
      }
      return 2;
    };

    f[0x87] = pos => {  // nop
      return 0;
    };

    return f;
  }

  //
  // INSTRUCTION ENCODING
  //


  static encode(s) {

    function registerValue(r) {
      switch (r) {
        case 'a': return 0;
        case 'b': return 1;
        case 'c': return 2;
        case 'd': return 3;
        case 'e': return 4;
        case 'f': return 5;
        case 'g': return 6;
        case 'h': return 7;
        case 'i': return 8;
        case 'j': return 9;
        case 'k': return 10;
        case 'l': return 11;
        case 'fp': return 12;
        case 'sp': return 13;
        case 'pc': return 14;
        case 'fl': return 15;
        default: throw new Error('Invalid register ' + r);
      }
    }

    //
    // understand command
    //

    // TODO - not working with one single parameter
    const m = s.match(/^\s*([a-z\.]+)(?:\s+(\[?(?:[a-l]|fp|sp|pc|fl|0x[0-9a-f]+|[0-9]+)\]?))?(?:\s*,\s*(\[?(?:[a-l]|fp|sp|pc|fl|0x[0-9a-f]+|[0-9]+)\]?))?\s*$/i); // https://regex101.com/r/pV1pA9/2
    if (!m) {
      throw new Error('Invalid command `' + s + '`');
    } 

    let cmd = { opcode: m[1], pars: [] };
    for (let i = 2; i < m.length; ++i) {
      if (m[i] == undefined) {
        continue;
      }

      let type;
      let value;
      let size;
      let valArray = [];
      if (m[i][0] === '[') {
        if (m[i].slice(-1) !== ']') {
          throw new Error('Unbalanced bracket in ' + m[i]);
        }
        if (m[i][1].charCodeAt(0) > '9'.charCodeAt(0)) {
          type = 'indirect register';
          value = registerValue(m[i].slice(1, -1).toLowerCase());
          size = 8;
          valArray = [value];
        } else {
          type = 'indirect value';
          value = parseInt(m[i].slice(1, -1));  // TODO - doesn't work with binary
          size = 32;
          valArray = [value & 0xFF, (value >> 8) & 0xFF, (value >> 16) & 0xFF, (value >> 24) & 0xFF];
        }
      } else if (m[i].charCodeAt(0) > '9'.charCodeAt(0)) {
        type = 'register';
        value = registerValue(m[i].toLowerCase());
        size = 8;
        valArray = [value];
      } else {
        type = 'value';
        value = parseInt(m[i]);
        if (value <= 0xFF) {
          size = 8;
          valArray = [value];
        } else if (value <= 0xFFFF) {
          size = 16;
          valArray = [value & 0xFF, value >> 8];
        } else {
          size = 32;
          valArray = [value & 0xFF, (value >> 8) & 0xFF, (value >> 16) & 0xFF, (value >> 24) & 0xFF];
        }
      }
      cmd.pars.push({ type, value, size, valArray });
    }

    //
    // parse command (TODO)
    //
    try {
      var [t0, v0, a0, s0] = [cmd.pars[0].type, cmd.pars[0].value, cmd.pars[0].valArray, cmd.pars[0].size];
    } catch (e) {
      if (e instanceof TypeError) {
        var [t0, v0, a0, s0] = ['none', 0, [], 0];
      } else {
        throw e;
      }
    }
    try {
      var [t1, v1, a1, s1] = [cmd.pars[1].type, cmd.pars[1].value, cmd.pars[1].valArray, cmd.pars[1].size];
    } catch (e) {
      if (e instanceof TypeError) {
        var [t1, v1, a1, s1] = ['none', 0, [], 0];
      } else {
        throw e;
      }
    }

    //console.log(cmd);
    //console.log(`t0: ${t0}   v0: ${v0}   t1: ${t1}   v1: ${v1}`);

    let opcode = null;

    switch (cmd.opcode) {

      case 'mov':
        if (t0 === 'register' && t1 !== 'none') {  // only valid condition
          if (t1 === 'register') {
            opcode = 0x01;
          } else if (t1 === 'value') {
            switch (s1) {
              case 8:  opcode = 0x02; break;
              case 16: opcode = 0x03; break;
              case 32: opcode = 0x04; break;
            }
          }
          if (opcode) {
            return [opcode, v0].concat(a1);
          }
        }
        break;

      case 'movb':
        if (t0 === 'register') {
          switch (t1) {
            case 'indirect register': opcode = 0x05; break;
            case 'indirect value':    opcode = 0x06; break;
          }
        } else if (t0 === 'indirect register') {
          switch (t1) {
            case 'register':          opcode = 0x0B; break;
            case 'value':           
              if (s1 <= 8) { 
                opcode = 0x0C; 
              }
              break;
            case 'indirect register': opcode = 0x0D; break;
            case 'indirect value':    opcode = 0x0E; break;
          }
        } else if (t0 === 'indirect value') {
          switch (t1) {
            case 'register':          opcode = 0x21; break;
            case 'value':           
              if (s1 <= 8) { 
                opcode = 0x22;
              }
              break;
            case 'indirect register': opcode = 0x23; break;
            case 'indirect value':    opcode = 0x24; break;
          }
        }
        if (opcode) {
          return [opcode].concat(a0).concat(a1);
        }
        break;

      case 'movw':
        if (t0 === 'register') {
          switch (t1) {
            case 'indirect register': opcode = 0x07; break;
            case 'indirect value':    opcode = 0x08; break;
          }
        } else if (t0 === 'indirect register') {
          switch (t1) {
            case 'register':          opcode = 0x0F; break;
            case 'value':           
              if (s1 <= 16) { 
                return [0x1A].concat(a0).concat([v1 & 0xFF, v1 >> 8]);
              }
              break;
            case 'indirect register': opcode = 0x1B; break;
            case 'indirect value':    opcode = 0x1C; break;
          }
        } else if (t0 === 'indirect value') {
          switch (t1) {
            case 'register':          opcode = 0x25; break;
            case 'value':
              if (s1 <= 16) { 
                return [0x26].concat(a0).concat([v1 & 0xFF, v1 >> 8]);
              }
              break;
            case 'indirect register': opcode = 0x27; break;
            case 'indirect value':    opcode = 0x28; break;
          }
        }
        if (opcode) {
          return [opcode].concat(a0).concat(a1);
        }
        break;

      case 'movd':
        if (t0 === 'register') {
          switch (t1) {
            case 'indirect register': opcode = 0x09; break;
            case 'indirect value':    opcode = 0x0A; break;
          }
        } else if (t0 === 'indirect register') {
          switch (t1) {
            case 'register':          opcode = 0x1D; break;
            case 'value':           
              return [0x1E].concat(a0).concat([v1 & 0xFF, (v1 >> 8) & 0xFF, (v1 >> 16) & 0xFF, (v1 >> 24) & 0xFF]);
            case 'indirect register': opcode = 0x1F; break;
            case 'indirect value':    opcode = 0x20; break;
          }
        } else if (t0 === 'indirect value') {
          switch (t1) {
            case 'register':          opcode = 0x29; break;
            case 'value':           
              return [0x2A].concat(a0).concat([v1 & 0xFF, (v1 >> 8) & 0xFF, (v1 >> 16) & 0xFF, (v1 >> 24) & 0xFF]);
            case 'indirect register': opcode = 0x2B; break;
            case 'indirect value':    opcode = 0x2C; break;
          }
        }
        if (opcode) {
          return [opcode].concat(a0).concat(a1);
        }
        break;

      case 'or':
        if (t0 === 'register') {
          if (t1 === 'register') {
            return [0x2D].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 8) {
            return [0x2E].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 16) {
            return [0x2F].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 32) {
            return [0x30].concat(a0).concat(a1);
          }
        }
        break;

      case 'xor':
        if (t0 === 'register') {
          if (t1 === 'register') {
            return [0x31].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 8) {
            return [0x32].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 16) {
            return [0x33].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 32) {
            return [0x34].concat(a0).concat(a1);
          }
        }
        break;

      case 'and':
        if (t0 === 'register') {
          if (t1 === 'register') {
            return [0x35].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 8) {
            return [0x36].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 16) {
            return [0x37].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 32) {
            return [0x38].concat(a0).concat(a1);
          }
        }
        break;

      case 'shl':
        if (t0 === 'register') {
          if (t1 === 'register') {
            return [0x39].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 8) {
            return [0x3A].concat(a0).concat(a1);
          }
        }
        break;

      case 'shr':
        if (t0 === 'register') {
          if (t1 === 'register') {
            return [0x3D].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 8) {
            return [0x3E].concat(a0).concat(a1);
          }
        }
        break;

      case 'not':
        if (t0 === 'register' && t1 === 'none') {
          return [0x41].concat(a0);
        }
        break;

      case 'add':
        if (t0 === 'register') {
          if (t1 === 'register') {
            return [0x42].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 8) {
            return [0x43].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 16) {
            return [0x44].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 32) {
            return [0x45].concat(a0).concat(a1);
          }
        }
        break;

      case 'sub':
        if (t0 === 'register') {
          if (t1 === 'register') {
            return [0x46].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 8) {
            return [0x47].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 16) {
            return [0x48].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 32) {
            return [0x49].concat(a0).concat(a1);
          }
        }
        break;

      case 'cmp':
        if (t0 === 'register') {
          if (t1 === 'register') {
            return [0x4A].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 8) {
            return [0x4B].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 16) {
            return [0x4C].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 32) {
            return [0x4D].concat(a0).concat(a1);
          }
        }
        break;

      case 'mul':
        if (t0 === 'register') {
          if (t1 === 'register') {
            return [0x4E].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 8) {
            return [0x4F].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 16) {
            return [0x50].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 32) {
            return [0x51].concat(a0).concat(a1);
          }
        }
        break;

      case 'idiv':
        if (t0 === 'register') {
          if (t1 === 'register') {
            return [0x52].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 8) {
            return [0x53].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 16) {
            return [0x54].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 32) {
            return [0x55].concat(a0).concat(a1);
          }
        }
        break;

      case 'mod':
        if (t0 === 'register') {
          if (t1 === 'register') {
            return [0x56].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 8) {
            return [0x57].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 16) {
            return [0x58].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 32) {
            return [0x59].concat(a0).concat(a1);
          }
        }
        break;

      case 'inc':
        if (t0 === 'register' && t1 === 'none') {
          return [0x5A].concat(a0);
        }
        break;

      case 'dec':
        if (t0 === 'register' && t1 === 'none') {
          return [0x5B].concat(a0);
        }
        break;

      /*
      case 'fadd':
        if (t0 === 'register') {
          if (t1 === 'register') {
            return [0x7F].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 8) {
            return [0x80].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 16) {
            return [0x81].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 32) {
            return [0x82].concat(a0).concat(a1);
          }
        }
        break;

      case 'fsub':
        if (t0 === 'register') {
          if (t1 === 'register') {
            return [0x83].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 8) {
            return [0x84].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 16) {
            return [0x85].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 32) {
            return [0x86].concat(a0).concat(a1);
          }
        }
        break;

      case 'fcmp':
        if (t0 === 'register') {
          if (t1 === 'register') {
            return [0x87].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 8) {
            return [0x88].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 16) {
            return [0x89].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 32) {
            return [0x8A].concat(a0).concat(a1);
          }
        }
        break;

      case 'fmul':
        if (t0 === 'register') {
          if (t1 === 'register') {
            return [0x8B].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 8) {
            return [0x8C].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 16) {
            return [0x8D].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 32) {
            return [0x8E].concat(a0).concat(a1);
          }
        }
        break;

      case 'fdiv':
        if (t0 === 'register') {
          if (t1 === 'register') {
            return [0x8F].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 8) {
            return [0x90].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 16) {
            return [0x91].concat(a0).concat(a1);
          } else if (t1 === 'value' && s1 === 32) {
            return [0x92].concat(a0).concat(a1);
          }
        }
        break;
      */

      case 'bz':
      case 'beq':
        if (t0 === 'register' && t1 === 'none') {
          return [0x5C].concat(a0);
        } else if (t0 === 'value' && t1 === 'none') {
          return [0x5D, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
        }
        break;

      case 'bnz':
      case 'bneq':
        if (t0 === 'register' && t1 === 'none') {
          return [0x5E].concat(a0);
        } else if (t0 === 'value' && t1 === 'none') {
          return [0x5F, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
        }
        break;

      case 'bneg':
        if (t0 === 'register' && t1 === 'none') {
          return [0x60].concat(a0);
        } else if (t0 === 'value' && t1 === 'none') {
          return [0x61, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
        }
        break;

      case 'bpos':
        if (t0 === 'register' && t1 === 'none') {
          return [0x62].concat(a0);
        } else if (t0 === 'value' && t1 === 'none') {
          return [0x63, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
        }
        break;

      case 'bgt':
        if (t0 === 'register' && t1 === 'none') {
          return [0x64].concat(a0);
        } else if (t0 === 'value' && t1 === 'none') {
          return [0x65, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
        }
        break;

      case 'bgte':
        if (t0 === 'register' && t1 === 'none') {
          return [0x66].concat(a0);
        } else if (t0 === 'value' && t1 === 'none') {
          return [0x67, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
        }
        break;

      case 'blt':
        if (t0 === 'register' && t1 === 'none') {
          return [0x68].concat(a0);
        } else if (t0 === 'value' && t1 === 'none') {
          return [0x69, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
        }
        break;

      case 'blte':
        if (t0 === 'register' && t1 === 'none') {
          return [0x6A].concat(a0);
        } else if (t0 === 'value' && t1 === 'none') {
          return [0x6B, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
        }
        break;

      case 'bv':
        if (t0 === 'register' && t1 === 'none') {
          return [0x6C].concat(a0);
        } else if (t0 === 'value' && t1 === 'none') {
          return [0x6D, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
        }
        break;

      case 'bnv':
        if (t0 === 'register' && t1 === 'none') {
          return [0x6E].concat(a0);
        } else if (t0 === 'value' && t1 === 'none') {
          return [0x6F, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
        }
        break;

      case 'jmp':
        if (t0 === 'register' && t1 === 'none') {
          return [0x70].concat(a0);
        } else if (t0 === 'value' && t1 === 'none') {
          return [0x71, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
        }
        break;

      case 'jsr':
        if (t0 === 'register' && t1 === 'none') {
          return [0x72].concat(a0);
        } else if (t0 === 'value' && t1 === 'none') {
          return [0x73, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
        }
        break;

      case 'ret':
        if (t0 === 'none' && t1 === 'none') {
          return [0x74];
        }
        break;

      case 'sys':
        if (t0 === 'register' && t1 === 'none') {
          return [0x75].concat(a0);
        } else if (t0 === 'value' && s0 === 8 && t1 === 'none') {
          return [0x76, v0];
        }
        break;

      case 'iret':
        if (t0 === 'none' && t1 === 'none') {
          return [0x77];
        }
        break;

      case 'sret':
        if (t0 === 'none' && t1 === 'none') {
          return [0x86];
        }
        break;

      case 'pushb':
        if (t0 === 'register' && t1 === 'none') {
          return [0x78].concat(a0);
        } else if (t0 === 'value' && s0 <= 8 && t1 === 'none') {
          return [0x79].concat(a0);
        }
        break;

      case 'pushw':
        if (t0 === 'register' && t1 === 'none') {
          return [0x7A].concat(a0);
        } else if (t0 === value && s0 <= 16 && t1 === 'none') {
          return [0x7B].concat([v0 & 0xFF, v0 >> 8]);
        }
        break;

      case 'pushd':
        if (t0 === 'register' && t1 === 'none') {
          return [0x7C].concat(a0);
        } else if (t0 === 'value' && s0 <= 16 && t1 === 'none') {
          return [0x7D].concat([v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF]);
        }
        break;

      case 'push.a':
        if (t0 === 'none' && t1 === 'none') {
          return [0x7E];
        }
        break;

      case 'popb':
        if (t0 === 'register' && t1 === 'none') {
          return [0x7F].concat(a0);
        }
        break;

      case 'popw':
        if (t0 === 'register' && t1 === 'none') {
          return [0x80].concat(a0);
        }
        break;

      case 'popd':
        if (t0 === 'register' && t1 === 'none') {
          return [0x81].concat(a0);
        }
        break;

      case 'pop.a':
        if (t0 === 'none' && t1 === 'none') {
          return [0x82];
        }
        break;

      case 'popx':
        if (t0 === 'register' && t1 === 'none') {
          return [0x83].concat(a0);
        } else if (t0 === 'value' && s0 <= 8 && t1 === 'none') {
          return [0x84].concat(a0);
        } else if (t0 === 'value' && s0 <= 16 && t1 === 'none') {
          return [0x85].concat(a0);
        }
        break;

      case 'nop':
        if (t0 === 'none' && t1 === 'none') {
          return [0x87];
        }
        break;

    }

    throw new Error(`Invalid command '${s}'`);
  }

  // 
  // DECODING
  //
  decode(addr) {

    addr = addr || this.PC;

    function h(n, digits) {
      return (Array(digits || 0).join('0') + n.toString(16)).substr(-digits).toUpperCase();
    }

    function reg(n) {
      switch (n) {
        case 0x0: return 'A';
        case 0x1: return 'B';
        case 0x2: return 'C';
        case 0x3: return 'D';
        case 0x4: return 'E';
        case 0x5: return 'F';
        case 0x6: return 'G';
        case 0x7: return 'H';
        case 0x8: return 'I';
        case 0x9: return 'J';
        case 0xA: return 'K';
        case 0xB: return 'L';
        case 0xC: return 'FP';
        case 0xD: return 'SP';
        case 0xE: return 'PC';
        case 0xF: return 'FL';
        default: return '?';
      }
    }

    function v8(n) {
      return '0x' + h(n[0], 2);
    }
    
    function v16(n) {
      return '0x' + h(n[1],2) + h(n[0],2)
    }

    function v32(n) {
      return '0x' + h(n[3],2) + h(n[2],2) + h(n[1],2) + h(n[0],2);
    }

    let r = {
      0x01: (p) => [`mov     ${reg(p[0])}, ${reg(p[1])}`, 3],
      0x02: (p) => [`mov     ${reg(p[0])}, ${v8(p[1])}`, 3],
      0x03: (p) => [`mov     ${reg(p[0])}, ${v16(p.slice(1,3))}`, 4],
      0x04: (p) => [`mov     ${reg(p[0])}, ${v32(p.slice(1,5))}`, 6],
      0x05: (p) => [`movb    ${reg(p[0])}, [${reg(p[1])}]`, 3],
      0x06: (p) => [`movb    ${reg(p[0])}, [${v32(p.slice(1,5))}]`, 6],
      0x07: (p) => [`movw    ${reg(p[0])}, [${reg(p[1])}]`, 3],
      0x08: (p) => [`movw    ${reg(p[0])}, [${v32(p.slice(1,5))}]`, 6],
      0x09: (p) => [`movd    ${reg(p[0])}, [${reg(p[1])}]`, 3],
      0x0A: (p) => [`movd    ${reg(p[0])}, [${v32(p.slice(1,5))}]`, 6],

      0x0B: (p) => [`movb    [${reg(p[0])}], ${reg(p[1])}`, 3],
      0x0C: (p) => [`movb    [${reg(p[0])}], ${v8(p[1])}`, 3],
      0x0D: (p) => [`movb    [${reg(p[0])}], [${reg(p[1])}]`, 3],
      0x0E: (p) => [`movb    [${reg(p[0])}], [${v32(p.slice(1,5))}]`, 6],
      0x0F: (p) => [`movw    [${reg(p[0])}], ${reg(p[1])}`, 3],
      0x1A: (p) => [`movw    [${reg(p[0])}], ${v16(p.slice(1,3))}`, 4],
      0x1B: (p) => [`movw    [${reg(p[0])}], [${reg(p[1])}]`, 3],
      0x1C: (p) => [`movw    [${reg(p[0])}], [${v32(p.slice(1,5))}]`, 6],
      0x1D: (p) => [`movd    [${reg(p[0])}], ${reg(p[1])}`, 3],
      0x1E: (p) => [`movd    [${reg(p[0])}], ${v32(p.slice(1,5))}`, 6],
      0x1F: (p) => [`movd    [${reg(p[0])}], [${reg(p[1])}]`, 3],
      0x20: (p) => [`movd    [${reg(p[0])}], [${v32(p.slice(1,5))}]`, 6],

      0x21: (p) => [`movb    [${v32(p.slice(0,4))}], ${reg(p[4])}`, 6],
      0x22: (p) => [`movb    [${v32(p.slice(0,4))}], ${v8(p[4])}`, 6],
      0x23: (p) => [`movb    [${v32(p.slice(0,4))}], [${reg(p[4])}]`, 6],
      0x24: (p) => [`movb    [${v32(p.slice(0,4))}], [${v32(p.slice(4,8))}]`, 9],
      0x25: (p) => [`movw    [${v32(p.slice(0,4))}], ${reg(p[4])}`, 6],
      0x26: (p) => [`movw    [${v32(p.slice(0,4))}], ${v16(p.slice(4,6))}`, 7],
      0x27: (p) => [`movw    [${v32(p.slice(0,4))}], [${reg(p[4])}]`, 6],
      0x28: (p) => [`movw    [${v32(p.slice(0,4))}], [${v32(p.slice(4,8))}]`, 9],
      0x29: (p) => [`movd    [${v32(p.slice(0,4))}], ${reg(p[4])}`, 6],
      0x2A: (p) => [`movd    [${v32(p.slice(0,4))}], ${v32(p.slice(4,8))}`, 9],
      0x2B: (p) => [`movd    [${v32(p.slice(0,4))}], [${reg(p[4])}]`, 6],
      0x2C: (p) => [`movd    [${v32(p.slice(0,4))}], [${v32(p.slice(4,8))}]`, 9],

      0x2D: (p) => [`or      ${reg(p[0])}, ${reg(p[1])}`, 3],
      0x2E: (p) => [`or      ${reg(p[0])}, ${v8(p[1])}`, 3],
      0x2F: (p) => [`or      ${reg(p[0])}, ${v16(p.slice(1,3))}`, 4],
      0x30: (p) => [`or      ${reg(p[0])}, ${v32(p.slice(1,5))}`, 6],
      0x31: (p) => [`xor     ${reg(p[0])}, ${reg(p[1])}`, 3],
      0x32: (p) => [`xor     ${reg(p[0])}, ${v8(p[1])}`, 3],
      0x33: (p) => [`xor     ${reg(p[0])}, ${v16(p.slice(1,3))}`, 4],
      0x34: (p) => [`xor     ${reg(p[0])}, ${v32(p.slice(1,5))}`, 6],
      0x35: (p) => [`and     ${reg(p[0])}, ${reg(p[1])}`, 3],
      0x36: (p) => [`and     ${reg(p[0])}, ${v8(p[1])}`, 3],
      0x37: (p) => [`and     ${reg(p[0])}, ${v16(p.slice(1,3))}`, 4],
      0x38: (p) => [`and     ${reg(p[0])}, ${v32(p.slice(1,5))}`, 6],
      0x39: (p) => [`shl     ${reg(p[0])}, ${reg(p[1])}`, 3],
      0x3A: (p) => [`shl     ${reg(p[0])}, ${v8(p[1])}`, 3],
      0x3B: (p) => [`shr     ${reg(p[0])}, ${reg(p[1])}`, 3],
      0x3C: (p) => [`shr     ${reg(p[0])}, ${v8(p[1])}`, 3],
      0x3D: (p) => [`not     ${reg(p[0])}`, 2],

      0x42: (p) => [`add     ${reg(p[0])}, ${reg(p[1])}`, 3],
      0x43: (p) => [`add     ${reg(p[0])}, ${v8(p[1])}`, 3],
      0x44: (p) => [`add     ${reg(p[0])}, ${v16(p.slice(1,3))}`, 4],
      0x45: (p) => [`add     ${reg(p[0])}, ${v32(p.slice(1,5))}`, 6],
      0x46: (p) => [`sub     ${reg(p[0])}, ${reg(p[1])}`, 3],
      0x47: (p) => [`sub     ${reg(p[0])}, ${v8(p[1])}`, 3],
      0x48: (p) => [`sub     ${reg(p[0])}, ${v16(p.slice(1,3))}`, 4],
      0x49: (p) => [`sub     ${reg(p[0])}, ${v32(p.slice(1,5))}`, 6],
      0x4A: (p) => [`cmp     ${reg(p[0])}, ${reg(p[1])}`, 3],
      0x4B: (p) => [`cmp     ${reg(p[0])}, ${v8(p[1])}`, 3],
      0x4C: (p) => [`cmp     ${reg(p[0])}, ${v16(p.slice(1,3))}`, 4],
      0x4D: (p) => [`cmp     ${reg(p[0])}, ${v32(p.slice(1,5))}`, 6],
      0x4E: (p) => [`mul     ${reg(p[0])}, ${reg(p[1])}`, 3],
      0x4F: (p) => [`mul     ${reg(p[0])}, ${v8(p[1])}`, 3],
      0x50: (p) => [`mul     ${reg(p[0])}, ${v16(p.slice(1,3))}`, 4],
      0x51: (p) => [`mul     ${reg(p[0])}, ${v32(p.slice(1,5))}`, 6],
      0x52: (p) => [`idiv    ${reg(p[0])}, ${reg(p[1])}`, 3],
      0x53: (p) => [`idiv    ${reg(p[0])}, ${v8(p[1])}`, 3],
      0x54: (p) => [`idiv    ${reg(p[0])}, ${v16(p.slice(1,3))}`, 4],
      0x55: (p) => [`idiv    ${reg(p[0])}, ${v32(p.slice(1,5))}`, 6],
      0x56: (p) => [`mod     ${reg(p[0])}, ${reg(p[1])}`, 3],
      0x57: (p) => [`mod     ${reg(p[0])}, ${v8(p[1])}`, 3],
      0x58: (p) => [`mod     ${reg(p[0])}, ${v16(p.slice(1,3))}`, 4],
      0x59: (p) => [`mod     ${reg(p[0])}, ${v32(p.slice(1,5))}`, 6],
      0x5A: (p) => [`inc     ${reg(p[0])}`, 2],
      0x5B: (p) => [`dec     ${reg(p[0])}`, 2],

      0x5C: (p) => [`bz      ${reg(p[0])}`, 2],
      0x5D: (p) => [`bz      ${v32(p.slice(0,4))}`, 5],
      0x5E: (p) => [`bnz     ${reg(p[0])}`, 2],
      0x5F: (p) => [`bnz     ${v32(p.slice(0,4))}`, 5],
      0x60: (p) => [`bneg    ${reg(p[0])}`, 2],
      0x61: (p) => [`bneg    ${v32(p.slice(0,4))}`, 5],
      0x62: (p) => [`bpos    ${reg(p[0])}`, 2],
      0x63: (p) => [`bpos    ${v32(p.slice(0,4))}`, 5],
      0x64: (p) => [`bgt     ${reg(p[0])}`, 2],
      0x65: (p) => [`bgt     ${v32(p.slice(0,4))}`, 5],
      0x66: (p) => [`bgte    ${reg(p[0])}`, 2],
      0x67: (p) => [`bgte    ${v32(p.slice(0,4))}`, 5],
      0x68: (p) => [`blt     ${reg(p[0])}`, 2],
      0x69: (p) => [`blt     ${v32(p.slice(0,4))}`, 5],
      0x6A: (p) => [`blte    ${reg(p[0])}`, 2],
      0x6B: (p) => [`blte    ${v32(p.slice(0,4))}`, 5],
      0x6C: (p) => [`bv      ${reg(p[0])}`, 2],
      0x6D: (p) => [`bv      ${v32(p.slice(0,4))}`, 5],
      0x6E: (p) => [`bnv     ${reg(p[0])}`, 2],
      0x6F: (p) => [`bnv     ${v32(p.slice(0,4))}`, 5],
      0x70: (p) => [`jmp     ${reg(p[0])}`, 2],
      0x71: (p) => [`jmp     ${v32(p.slice(0,4))}`, 5],
      0x72: (p) => [`jsr     ${reg(p[0])}`, 2],
      0x73: (p) => [`jsr     ${v32(p.slice(0,4))}`, 5],
      0x74: (p) => ['ret', 1],
      0x75: (p) => [`sys     ${reg(p[0])}`, 2],
      0x76: (p) => [`sys     ${v8(p[0])}`, 2],
      0x77: (p) => ['iret', 1],
      0x86: (p) => ['sret', 1],

      0x78: (p) => [`pushb   ${reg(p[0])}`, 2],
      0x79: (p) => [`pushb   ${v8(p[0])}`, 2],
      0x7A: (p) => [`pushw   ${reg(p[0])}`, 2],
      0x7B: (p) => [`pushw   ${v16(p.slice(0,2))}`, 3],
      0x7C: (p) => [`pushd   ${reg(p[0])}`, 2],
      0x7D: (p) => [`pushd   ${v32(p.slice(0,4))}`, 5],
      0x7E: (p) => [`push.a`, 1],
      0x7F: (p) => [`popb    ${reg(p[0])}`, 2],
      0x80: (p) => [`popw    ${reg(p[0])}`, 2],
      0x81: (p) => [`popd    ${reg(p[0])}`, 2],
      0x82: (p) => [`pop.a`, 1],
      0x83: (p) => [`popx    ${reg(p[0])}`, 2],
      0x84: (p) => [`popx    ${v8(p[0])}`, 2],
      0x85: (p) => [`popx    ${v16(p.slice(0,2))}`, 3],

      0x87: (p) => ['nop', 1],
    };

    const op = this._mb.get(addr);
    let p = this._mb.getArray(addr+1, 8);

    if (op in r) {
      return r[op](p);
    } else {
      return [`data    0x${h(op,2)}`, 1];
    }
  }

}


// vim: ts=2:sw=2:sts=2:expandtab
