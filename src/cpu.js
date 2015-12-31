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
 *                    bit 4 - GZ (greater than zero)
 *                    bit 5 - LZ (less than zero)
 *                    bit 6 - P (parity)
 *
 * - Instruction set:
 *     (for now, see https://github.com/andrenho/tinyvm/wiki/CPU)
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
    this._reg = new Uint32Array(16);
    this.PC = this._mb.get32(this._mb.MB_CPU_INIT);
  }

  
  name() {
    return 'TinyCPU';
  }


  hasInterrupt() {
    return true;
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
    };
  }


  get(a) {
    if (a <= 0x10) {
      return super.get(a);
    } else if (a <= 0x4F) {
      const v = this._reg[Math.floor((a - 0x10) / 4)];
      switch (a % 4) {
        case 0: return v & 0xFF;
        case 1: return (v >> 8) & 0xFF;
        case 2: return (v >> 16) & 0xFF;
        case 3: return (v >> 24) & 0xFF;
      }
    }
  }


  set(a, v) {
    if (a >= 0x10 && a <= 0x4F) {
      const r = Math.floor((a - 0x10) / 4);
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
    } else {
      super.set(a, v);
    }
  }


  //
  // STEPPING THROUGH
  //
  

  initStepFunctions() {

    // helper functions
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
      reg[mb.get(pos)] = this.affectMovFlags(r, 32);
      return 2;
    };
    f[0x02] = pos => {  // mov R, v8
      let [reg, mb] = [this._reg, this._mb];
      const r = mb.get(pos + 1);
      reg[mb.get(pos)] = this.affectMovFlags(r, 8);
      return 2;
    };
    f[0x03] = pos => {  // mov R, v16
      let [reg, mb] = [this._reg, this._mb];
      const r = mb.get16(pos + 1);
      reg[mb.get(pos)] = this.affectMovFlags(r, 16);
      return 3;
    };
    f[0x04] = pos => {  // mov R, v32
      let [reg, mb] = [this._reg, this._mb];
      const r = mb.get32(pos + 1);
      reg[mb.get(pos)] = this.affectMovFlags(r, 32);
      return 5;
    };

    //
    // MOVB
    //

    f[0x05] = pos => {  // movb R, [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = mb.get(reg[p2]);
      reg[p1] = this.affectMovFlags(r, 8);
      return 2;
    };

    f[0x06] = pos => {  // movb R, [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r = mb.get(p2);
      reg[p1] = this.affectMovFlags(r, 8);
      return 5;
    };

    f[0x0B] = pos => {  // movb [R], R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p2] & 0xFF;
      mb.set(reg[p1], this.affectMovFlags(r, 8));
      return 2;
    };

    f[0x0C] = pos => {  // movb [R], v8
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = p2;
      mb.set(reg[p1], this.affectMovFlags(r, 8));
      return 2;
    };

    f[0x0D] = pos => {  // movb [R], [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = mb.get(reg[p2]);
      mb.set(reg[p1], this.affectMovFlags(r, 8));
      return 2;
    };

    f[0x0E] = pos => {  // movb [R], [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r = mb.get(p2);
      mb.set(reg[p1], this.affectMovFlags(r, 8));
      return 5;
    };

    f[0x21] = pos => {  // movb [v32], R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get(pos + 4)];
      const r = reg[p2] & 0xFF;
      mb.set(mb.get32(p1), this.affectMovFlags(r, 8));
      return 5;
    };

    f[0x22] = pos => {  // movb [v32], v8
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get(pos + 4)];
      const r = p2;
      mb.set(mb.get32(p1), this.affectMovFlags(r, 8));
      return 5;
    };

    f[0x23] = pos => {  // movb [v32], [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get(pos + 4)];
      const r = mb.get(reg[p2]);
      mb.set(mb.get32(p1), this.affectMovFlags(r, 8));
      return 5;
    };

    f[0x24] = pos => {  // movb [v32], [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get32(pos + 4)];
      const r = mb.get(mb.get32(p2));
      mb.set(mb.get32(p1), this.affectMovFlags(r, 8));
      return 8;
    };

    //
    // MOVW
    //

    f[0x07] = pos => {  // movw R, [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = mb.get16(reg[p2]);
      reg[p1] = this.affectMovFlags(r, 16);
      return 2;
    };

    f[0x08] = pos => {  // movw R, [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r =  mb.get16(p2);
      reg[p1] = this.affectMovFlags(r, 16);
      return 5;
    };

    f[0x0F] = pos => {  // movw [R], R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p2] & 0xFFFF;
      mb.set16(reg[p1], this.affectMovFlags(r, 16));
      return 2;
    };

    f[0x1A] = pos => {  // movw [R], v16
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get16(pos + 1)];
      const r = p2;
      mb.set16(reg[p1], this.affectMovFlags(r, 16));
      return 3;
    };

    f[0x1B] = pos => {  // movw [R], [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = mb.get16(reg[p2]);
      mb.set16(reg[p1], this.affectMovFlags(r, 16));
      return 2;
    };

    f[0x1C] = pos => {  // movw [R], [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r = mb.get16(p2);
      mb.set16(reg[p1], this.affectMovFlags(r, 16));
      return 5;
    };

    f[0x25] = pos => {  // movw [v32], R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get(pos + 4)];
      const r = reg[p2] & 0xFFFF;
      mb.set16(mb.get32(p1), this.affectMovFlags(r, 16));
      return 5;
    };

    f[0x26] = pos => {  // movw [v32], v16
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get16(pos + 4)];
      const r = p2;
      mb.set16(mb.get32(p1), this.affectMovFlags(r, 16));
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
      reg[p1] = this.affectMovFlags(r, 32);
      return 2;
    };

    f[0x0A] = pos => {  // movd R, [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r =  mb.get32(p2);
      reg[p1] = this.affectMovFlags(r, 32);
      return 5;
    };

    f[0x1D] = pos => {  // movd [R], R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = reg[p2];
      mb.set32(reg[p1], this.affectMovFlags(r, 32));
      return 2;
    };

    f[0x1E] = pos => {  // movd [R], v32
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r = p2;
      mb.set32(reg[p1], this.affectMovFlags(r, 32));
      return 5;
    };

    f[0x1F] = pos => {  // movd [R], [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get(pos + 1)];
      const r = mb.get32(reg[p2]);
      mb.set32(reg[p1], this.affectMovFlags(r, 32));
      return 2;
    };

    f[0x20] = pos => {  // movd [R], [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get(pos), mb.get32(pos + 1)];
      const r = mb.get32(p2);
      mb.set32(reg[p1], this.affectMovFlags(r, 32));
      return 5;
    };

    f[0x29] = pos => {  // movd [v32], R
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get(pos + 4)];
      const r = reg[p2];
      mb.set32(mb.get32(p1), this.affectMovFlags(r, 32));
      return 5;
    };

    f[0x2A] = pos => {  // movd [v32], v32
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get32(pos + 4)];
      const r = p2;
      mb.set32(mb.get32(p1), this.affectMovFlags(r, 32));
      return 8;
    };

    f[0x2B] = pos => {  // movd [v32], [R]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get(pos + 4)];
      const r = mb.get32(reg[p2]);
      mb.set32(mb.get32(p1), this.affectMovFlags(r, 32));
      return 5;
    };

    f[0x2C] = pos => {  // movd [v32], [v32]
      let [reg, mb] = [this._reg, this._mb];
      const [p1, p2] = [mb.get32(pos), mb.get32(pos + 4)];
      const r = mb.get32(mb.get32(p2));
      mb.set32(mb.get32(p1), this.affectMovFlags(r, 32));
      return 8;
    };

    
    return f;
  }


  step() {
    this.PC += this._stepFunction[this._mb.get(this.PC)](this.PC + 1) + 1;
  }


  affectMovFlags(value, size) {
    this.Z = (value === 0);
    this.P = ((value % 2) === 0);
    this.S = ((value >> (size-1)) & 0x1 ? true : false);
    return value;
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
  set SP(v) { this._reg[13] = v; }
  set PC(v) { this._reg[14] = v; }
  set FL(v) { this._reg[15] = v; }

  get Y() { return (this._reg[15] & 0x1) ? true : false; }
  get V() { return ((this._reg[15] >> 1) & 0x1) ? true : false; }
  get Z() { return ((this._reg[15] >> 2) & 0x1) ? true : false; }
  get S() { return ((this._reg[15] >> 3) & 0x1) ? true : false; }
  get GZ() { return ((this._reg[15] >> 4) & 0x1) ? true : false; }
  get LZ() { return ((this._reg[15] >> 5) & 0x1) ? true : false; }
  get P() { return ((this._reg[15] >> 6) & 0x1) ? true : false; }

  // jscs:disable validateIndentation
  set Y(v) { if (v) this._reg[15] |= (1 << 0); else this._reg[15] &= ~(1 << 0); }
  set V(v) { if (v) this._reg[15] |= (1 << 1); else this._reg[15] &= ~(1 << 1); }
  set Z(v) { if (v) this._reg[15] |= (1 << 2); else this._reg[15] &= ~(1 << 2); }
  set S(v) { if (v) this._reg[15] |= (1 << 3); else this._reg[15] &= ~(1 << 3); }
  set GZ(v) { if (v) this._reg[15] |= (1 << 4); else this._reg[15] &= ~(1 << 4); }
  set LZ(v) { if (v) { this._reg[15] |= (1 << 5); } else { this._reg[15] &= ~(1 << 5); } }
  set P(v) { if (v) { this._reg[15] |= (1 << 6); } else { this._reg[15] &= ~(1 << 6); } }
  // jscs:enable validateIndentation

}


// vim: ts=2:sw=2:sts=2:expandtab
