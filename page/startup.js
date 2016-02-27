var tinyvm;

window.onload = () => {
  tinyvm = new TinyVM(256, [], document.getElementById('canvas'), new Uint8Array([0]));
};

// vim: ts=2:sw=2:sts=2:expandtab
