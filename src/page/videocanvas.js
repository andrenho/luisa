'use strict';

class VideoCanvas {

  constructor(canvas) {
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
    this._data = this._ctx.getImageData(0, 0, canvas.width, canvas.height);
    this._charCache = {};
  }


  initCanvas() {
    this._ctx.fillStyle = 'black';
    this._ctx.fillRect(0, 0, canvas.width, canvas.height);
    this._ctx.font = "11px Sudo";
    this._ctx.fillStyle = 'white';
    this._ctx.textAlign = 'center';
    this._ctx.fillText('Click to run', this._canvas.width / 2, this._canvas.height / 2);
  }


  clearScreen(r, g, b) {
    this._ctx.fillStyle = `rgb(${(r >> 16) & 0xFF},${(g >> 8) & 0xFF},${b & 0xFF})`;
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
  }


  drawPixel(x, y, color) {
    let px = (x + (y * this._canvas.width)) * 4;
    this._data.data[px + 3] = 0xFF;
    this._data.data[px + 0] = (color >> 16) & 0xFF;
    this._data.data[px + 1] = (color >> 8) & 0xFF;
    this._data.data[px + 2] = color & 0xFF;
    this._ctx.putImageData(this._data, 0, 0, p[0], p[1], 1, 1);
  }


  write(c, x, y, bg, fg, offx, offy) {

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


};

// vim: ts=2:sw=2:sts=2:expandtab
