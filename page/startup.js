var tinyvm;
var dbg;

window.onload = () => {

  //
  // initialize TinyVM and debugger
  //
  let b = [];
  b = b.concat(Debugger.encode('movd [0xF0016014], 65'));        // movd [VID_P0], '@'
  b = b.concat(Debugger.encode('movd [0xF0016018], 5'));         // movd [VID_P1], 5
  b = b.concat(Debugger.encode('movd [0xF001601C], 5'));         // movd [VID_P1], 5
  b = b.concat(Debugger.encode('movd [0xF0016020], 0'));         // movd [VID_P2], 0x000000
  b = b.concat(Debugger.encode('movd [0xF0016024], 0x00FFFF'));  // movd [VID_P4], 0xFF0000
  b = b.concat(Debugger.encode('movb [0xF0016012], 0x5'));       // movb [VID_OP], VID_OP_WRITE
  tinyvm = new TinyVM(256, [], document.getElementById('canvas'), new Uint8Array(b));
  dbg = new Debugger(tinyvm);

  const welcome = dbg.welcome().replace(/ /g, '&nbsp;').split('\n').join('<br>');
  document.getElementById('debugger_output').innerHTML = `<div>${welcome}</div>`;


  // 
  // on pressing AltGr+D, go to debugger
  //
  document.onkeypress = (e) => {
    if (e.code === 'KeyD') {
      document.getElementById('debugger_input').focus();
      return false;
    }
    return true;
  };


  //
  // parse debugger input
  //
  document.getElementById('debugger_input').onkeypress = (e) => {
    if (!e) {
      e = window.event;
    }
    let keyCode = e.keyCode || e.which;
    if (keyCode == 13) {
      
      const txt = document.getElementById('debugger_input').value;
      const output = document.getElementById('debugger_output');
      const pr = dbg.parse(txt).replace(/ /g, '&nbsp;').split('\n').join('<br>');

      output.innerHTML = `<div>${pr}</div><div>- <b>${txt}</b></div>` + output.innerHTML;

      document.getElementById('debugger_input').value = '';

      return false;
    }
  };


  // 
  // C button (clear debugger)
  //
  document.getElementById('clear_debugger').onclick = (e) => {
    document.getElementById('debugger_output').innerHTML = '';
  };

};



// vim: ts=2:sw=2:sts=2:expandtab
