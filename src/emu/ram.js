'use strict';

class RAM extends LSBStorage {

  constructor(_sizeKb) {
    super();
    this._size = _sizeKb * 1024;
    this.reset();
  }


  reset() {
    this._data = new Uint8Array(this._size);
  }


  get size() {
    return this._size;
  }


  get(a) {
    if (a < 0 || a >= this._size) {
      let e = new Error();
      e.name = 'out of bounds';
      throw e;
    } else {
      return this._data[a];
    }
  }


  set(a, v) {
    if (a < 0 || a >= this._size) {
      let e = new Error();
      e.name = 'out of bounds';
      throw e;
    } else if (v < 0 || v > 0xFF) {
      let e = new Error();
      e.name = 'invalid data (' + v + ')';
      throw e;
    } else {
      this._data[a] = v;
    }
  }

}

// vim: ts=2:sw=2:sts=2:expandtab
