'use strict';

class Video extends Device {

  constructor(width, height) {
    super();

    // constants
    this.VID_OP_CLRSCR  = 0x2;
    this.VID_OP_DRAW_PX = 0x3;
    this.VID_OP_GET_PX  = 0x4;
    this.VID_OP_WRITE   = 0x5;

    // initialize
    this._const = this.constantList();
    this._width = width;
    this._height = height;
    //this._canvas = canvas;
    //this._ctx = canvas.getContext('2d');
    //this._data = this._ctx.getImageData(0, 0, this._width, this._height);
    this._p = new Uint32Array(8);
    this._r = new Uint32Array(2);
    this._charCache = {};
    this._pending = [];

    //this._ctx.fillStyle = 'black';
    //this._ctx.fillRect(0, 0, this._width, this._height);
  }

  name() { return 'LuisaVideo'; }
  deviceType() { return Device.Type.VIDEO; }
  version() { return 0x0; }
  hasInterrupt() { return false; }
  memorySize() { return 0x6000000; /* 96 Mb */ }

  constantList() {
    return {
      VID_TYPE:       0x00,
      VID_VERSION:    0x01,
      VID_INTERRUPT:  0x02,
      VID_NAME:       0x03,
      VID_WIDTH:      0x10,
      VID_HEIGHT:     0x11,
      VID_OP:         0x12,
      VID_P0:         0x14,
      VID_P1:         0x18,
      VID_P2:         0x1C,
      VID_P3:         0x20,
      VID_P4:         0x24,
      VID_P5:         0x28,
      VID_P6:         0x2C,
      VID_P7:         0x30,
      VID_R0:         0x34,
      VID_R1:         0x38,
      VID_DATA:    0x10000,
    };
  }


  get(a) {
    if (a < 0x10) {
      return super.get(a);
    } else if (a === this._const.VID_WIDTH) {
      return this._width;
    } else if (a === this._const.VID_HEIGHT) {
      return this._height;
    } else {
      let v;
      if (a >= this._const.VID_P0 && a < (this._const.VID_P7 + 4)) {
        v = this._p[Math.floor((a - this._const.VID_P0) / 4)];
      } else if (a >= this._const.VID_R0 && (a < this._const.VID_R1 + 4)) {
        v = this._r[Math.floor((a - this._const.VID_R0) / 4)];
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
    return 0;
  }


  set(a, v) {
    if (a < 0x10) {
      super.set(a, v);
    } else if (a === this._const.VID_OP) {
      this._r = this._execute(v);
    } else {
      let r, arr;
      if (a >= this._const.VID_P0 && a < (this._const.VID_P7 + 4)) {
        r = Math.floor((a - this._const.VID_P0) / 4);
        arr = this._p;
      } else if (a >= this._const.VID_R0 && a < (this._const.VID_R1 + 4)) {
        r = Math.floor((a - this._const.VID_R0) / 4);
        arr = this._p;
      }
      if (arr) {
        switch (a % 4) {
          case 0: 
            arr[r] &= ~0xFF; arr[r] |= v;
            break;
          case 1: 
            arr[r] &= ~0xFF00; arr[r] |= (v << 8);
            break;
          case 2: 
            arr[r] &= ~0xFF0000; arr[r] |= (v << 16);
            break;
          case 3: 
            arr[r] &= ~0xFF000000; arr[r] |= (v << 24);
            break;
        }
      }
    }
  }


  update() {
    for (const p of this._pending) {
      switch(p.cmd) {
        case this.VID_OP_CLRSCR:
          this._ctx.fillStyle = `rgb(${(p.pars[0] >> 16) & 0xFF},${(p.pars[0] >> 8) & 0xFF},${p.pars[0] & 0xFF})`;
          this._ctx.fillRect(0, 0, this._width, this._height);
          break;
        case this.VID_OP_DRAW_PX:
          let px = (p.pars[0] + (p.pars[1] * this._width)) * 4;
          this._data.data[px + 3] = 0xFF;
          this._data.data[px + 0] = (p.pars[2] >> 16) & 0xFF;
          this._data.data[px + 1] = (p.pars[2] >> 8) & 0xFF;
          this._data.data[px + 2] = p.pars[2] & 0xFF;
          this._ctx.putImageData(this._data, 0, 0, p.pars[0], p.pars[1], 1, 1);
          break;
        case this.VID_OP_WRITE:
          this._drawChar.apply(this, p.pars);
          break;
      }
    }
    this._pending = [];
  }


  _execute(op) {
    switch (op) {
      case this.VID_OP_GET_PX:
        const d = this._ctx.getImageData(this._p[0], this._p[1], 1, 1).data;
        return [(d[0] << 16) | (d[1] << 8) | d[2], 0];
      case this.VID_OP_CLRSCR:
      case this.VID_OP_DRAW_PX:
      case this.VID_OP_WRITE:
        this._pending.push({ cmd: op, pars: this._p.slice(0, 7) });
        break;
    }
    return [0, 0];
  }


  _drawChar(c, x, y, bg, fg, offx, offy) {
    const image = this._charImage(c, bg, fg);
    const px = 10 + (x * 6) + offx;
    const py = 10 + (y * 9) + offy;
    this._ctx.putImageData(image, px, py);
  }
  

  _charImage(c, bg, fg) {
    const idx = `${c.toString(16)}_${bg.toString(16)}${fg.toString(16)}`;
    const value = this._charCache[idx];
    if (value) {
      return value;
    } else {
      const chr = this._createCharImage(c, bg, fg);
      this._charCache[idx] = chr;
      return chr;
    }
  }


  _createCharImage(c, bg, fg) {
    let img = this._ctx.createImageData(6, 9);
    for (let y = 0; y < 9; ++y) {
      for (let x = 0; x < 6; ++x) {
        const p = ((5 - x) + (y * 6)) * 4;
        const v = (chars[c][y] >> x) & 1;
        img.data[p + 3] = 0xFF;
        img.data[p] = ((v ? fg : bg) >> 16) & 0xFF;
        img.data[p + 1] = ((v ? fg : bg) >> 8) & 0xFF;
        img.data[p + 2] = (v ? fg : bg) & 0xFF;
      }
    }
    return img;
  }


}

// vim: ts=2:sw=2:sts=2:expandtab
