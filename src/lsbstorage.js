export default class LSBStorage {

  constructor() {
    if (this.constructor === LSBStorage) {
      throw new TypeError('Abstact class cannot be instantiated.');
    }
  }


  get16(a) {
    return (this.get(a + 1) << 8)  |
            this.get(a);
  }


  set16(a, v) {
    this.set(a, v & 0xff);
    this.set(a + 1, (v >> 8) & 0xff);
  }


  get32(a) {
    let v = (this.get(a + 3) << 24) |
            (this.get(a + 2) << 16) |
            (this.get(a + 1) << 8)  |
             this.get(a);
    return v >>> 0;   // HACK: convert to Uint32 (see http://goo.gl/8c4IxT)
  }


  set32(a, v) {
    this.set(a, v & 0xff);
    this.set(a + 1, (v >> 8) & 0xff);
    this.set(a + 2, (v >> 16) & 0xff);
    this.set(a + 3, v >> 24);
  }


  getString(a, sz) {
    let str = [];
    for (let i = 0; i < sz; ++i) {
      str.push(String.fromCharCode(this.get(a + i)));
    }
    return str.join('');
  }


  setString(a, v) {
    for (let i = 0; i < v.length; ++i) {
      this.set(a + i, v.charCodeAt(i));
    }
  }

}

// vim: ts=2:sw=2:sts=2:expandtab
