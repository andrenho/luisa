var luisavm;
var dbg;

window.onload = () => {

  //
  // initialize LuisaVM and debugger
  //
  luisavm = new LuisaVM(256, [], document.getElementById('canvas'), window.biosCode);
  dbg = new Debugger(luisavm);

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

  setTimeout(() => {}, 16);

};



// vim: ts=2:sw=2:sts=2:expandtab
