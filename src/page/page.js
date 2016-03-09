'use strict';

let videoCanvas;

//
// ON LOAD WINDOW
//

window.onload = () => {

  videoCanvas = new VideoCanvas(document.getElementById('canvas'));
  videoCanvas.initCanvas();

  //
  // initialize main web worker
  //
  let worker = new Worker('src/page/worker.js');
  worker.addEventListener('message', e => message(e.data));
  worker.postMessage(['init', canvas.width, canvas.height]);  // initialize VM and debugger

  //
  // read callbacks each 16ms
  //
  let callbacks = [];
  function update(time) {
    executeCallbacks(callbacks);
    callbacks = [];
    window.requestAnimationFrame(update);
  }
  window.requestAnimationFrame(update);


  //
  // receive and parse information from worker
  // 

  function message(a) {
    const pars = a.slice(1);
    switch (a[0]) {
      
      // print info on the debugger
      case 'print_debugger':
        document.getElementById('debugger_input').disabled = false;
        const output = document.getElementById('debugger_output');
        output.innerHTML = `<div>${pars[0].replace(/ /g, '&nbsp;').split('\n').join('<br>')}</div>` + output.innerHTML;
        document.getElementById('debugger_input').focus();
        break;

      // a callback was called
      case 'callback':
        callbacks.push(pars[0]);
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
      document.getElementById('debugger_input').disabled = true;

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


  //
  // Settings
  //
  document.getElementById('settings').onclick = (e) => {
    alert('Not implemented yet.');
  };


  //
  // Run tests
  //
  document.getElementById('tests').onclick = (e) => {
    worker.postMessage(['run_tests']);
  };

};


// 
// CALLBACK MANAGEMENT
//

function executeCallbacks(cbs) {
  for (let cb of cbs) {
    if (cb.device === 'video') {
      switch (cb.cmd) {
        case 'clrscr':  videoCanvas.clearScreen.apply(videoCanvas, cb.pars); break;
        case 'draw_px': videoCanvas.drawPixel.apply(videoCanvas, cb.pars);   break;
        case 'write':   videoCanvas.write.apply(videoCanvas, cb.pars);       break;
        default:
          console.warn(`Invalid call ${cb.device}:${cb.cmd}.`);
      }
    } else {
      console.warn(`Invalid call ${cb.device}:${cb.cmd}.`);
    }
  }
}


// vim: ts=2:sw=2:sts=2:expandtab
