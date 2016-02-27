var tinyvm;

window.onload = () => {
  let b = [];
  b = b.concat(cpuEncode('movd [0xF0016014], 65'));        // movd [VID_P0], '@'
  b = b.concat(cpuEncode('movd [0xF0016018], 5'));         // movd [VID_P1], 5
  b = b.concat(cpuEncode('movd [0xF001601C], 5'));         // movd [VID_P1], 5
  b = b.concat(cpuEncode('movd [0xF0016020], 0'));         // movd [VID_P2], 0x000000
  b = b.concat(cpuEncode('movd [0xF0016024], 0xFF0000'));  // movd [VID_P4], 0xFF0000
  b = b.concat(cpuEncode('movb [0xF0016012], 0x5'));       // movb [VID_OP], VID_OP_WRITE
  tinyvm = new TinyVM(256, [], document.getElementById('canvas'), new Uint8Array(b));
};

// vim: ts=2:sw=2:sts=2:expandtab
