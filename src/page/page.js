//
// run when the window is loaded
//

window.onload = () => {

  //
  // initialize main web worker
  //
  let worker = new Worker('web/luisavm.js');
  worker.addEventListener('message', e => message(e.data));
  worker.postMessage(['init', biosCode]);  // initialize VM and debugger


  //
  // receive and parse information from worker
  // 

  function message(a) {
    const pars = a.slice(1);
    switch (a[0]) {
      
      // print info on the debugger
      case 'print_debugger':
        const output = document.getElementById('debugger_output');
        output.innerHTML = `<div>${pars[0].replace(/ /g, '&nbsp;').split('\n').join('<br>')}</div>` + output.innerHTML;
        break;

      // other, invalid message
      default:
        console.error(`Invalid command ${e.data[0]} received from worker.`);
    }
  }


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
      output.innerHTML = `<div>- <b>${txt}</b></div>` + output.innerHTML;
      document.getElementById('debugger_input').value = '';

      worker.postMessage(['to_debugger', txt]);

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

/*
  //
  // update video
  //
  function videoUpdate(time) {
    luisavm.video.update();
    window.requestAnimationFrame(videoUpdate);
  }
  window.requestAnimationFrame(videoUpdate);
  */

// vim: ts=2:sw=2:sts=2:expandtab
