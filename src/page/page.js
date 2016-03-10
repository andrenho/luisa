'use strict';

let videoCanvas;
let debuggerVisible = false;

//
// ON LOAD WINDOW
//

window.onload = () => {

  // 
  // initialize video canvas
  //
  let messageAppears = true;
  videoCanvas = new VideoCanvas(document.getElementById('canvas'));
  videoCanvas.initCanvas();
  document.getElementById('canvas').ondblclick = (e) => {
    window.getSelection().removeAllRanges();  // unselect all text
    videoCanvas.clearScreen(0, 0, 0);
    messageAppears = false;
    worker.postMessage(['run']);
  };

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

      // tests
      case 'test_title':
        document.getElementById('tests_list').innerHTML += `<h3>${pars[0]}</h3>`;
        break;
      case 'test_subtitle':
        document.getElementById('tests_list').innerHTML += `<h4>${pars[0]}</h4>`;
        break;
      case 'test_ok':
        document.getElementById('tests_list').innerHTML += `<span class="ok">${pars[0]}</span><br>`;
        break;
      case 'test_nok':
        document.getElementById('tests_list').innerHTML += `<span class="nok">${pars[0]}</span> (expected: ${pars[1]}, got: ${pars[2]})<br>`;
        break;
      case 'test_summary':
        if (pars[0].length === 0) {
          document.getElementById('tests_list').innerHTML = `<p><span class="ok" style="font-size: 18pt;">All tests successful.</span></p>` + document.getElementById('tests_list').innerHTML;
        } else {
          document.getElementById('tests_list').innerHTML = `<p><span class="nok" style="font-size: 18pt;">${pars[0].length} test(s) failed.</span></p>` + document.getElementById('tests_list').innerHTML;
        }
        break;

      // other, invalid message
      default:
        console.error(`Invalid command ${a[0]} received from worker.`);
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
    return false;
  };


  // 
  // Show debugger
  //
  document.getElementById('show_debugger').onclick = (e) => {
    if (!debuggerVisible) {
      document.getElementById('debugger').style.display = 'block';
      document.getElementById('show_debugger').innerHTML = 'Hide debugger';
      if (messageAppears) {
        videoCanvas.clearScreen(0, 0, 0);
        messageAppears = false;
      }
      debuggerVisible = true;
    } else {
      document.getElementById('debugger').style.display = 'none';
      document.getElementById('show_debugger').innerHTML = 'Show debugger';
      debuggerVisible = false;
    }
    return false;
  };


  //
  // Run tests
  //
  document.getElementById('tests').onclick = (e) => {
    worker.postMessage(['run_tests']);
    document.getElementById('tests_display').style.display = 'block';
    return false;
  };
  document.getElementById('hide_tests').onclick = (e) => {
    document.getElementById('tests_list').innerHTML = '';
    document.getElementById('tests_display').style.display = 'none';
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
