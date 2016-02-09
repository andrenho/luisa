export default class RAM {

  constructor(sizeKb) {
    this.size = sizeKb * 1024;
    this._data = new Uint8Array(this.size);
  }

  get(a) {
    if (a < 0 || a >= this.size) {
      let e = new Error();
      e.name = 'out of bounds';
      throw e;
    } else {
      return this._data[a];
    }
  }

  set(a, v) {
    if (a < 0 || a >= this.size) {
      let e = new Error();
      e.name = 'out of bounds';
      throw e;
    } else if(v < 0 || v > 0xFF) {
      let e = new Error();
      e.name = 'invalid data';
      throw e;
    } else {
      this._data[a] = v;
    }
  }

}

// vim: ts=2:sw=2:sts=2:expandtab
