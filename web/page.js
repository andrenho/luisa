'use strict';

//
// run when the window is loaded
//

window.onload = function () {

  //
  // initialize main web worker
  //
  var worker = new Worker('web/luisavm.js');
  worker.addEventListener('message', function (e) {
    return message(e.data);
  });
  worker.postMessage(['init', biosCode]); // initialize VM and debugger

  //
  // receive and parse information from worker
  //

  function message(a) {
    var pars = a.slice(1);
    switch (a[0]) {

      // print info on the debugger
      case 'print_debugger':
        var output = document.getElementById('debugger_output');
        output.innerHTML = '<div>' + pars[0].replace(/ /g, '&nbsp;').split('\n').join('<br>') + '</div>' + output.innerHTML;
        break;

      // other, invalid message
      default:
        console.error('Invalid command ' + e.data[0] + ' received from worker.');
    }
  }

  //
  // on pressing AltGr+D, go to debugger
  //
  document.onkeypress = function (e) {
    if (e.code === 'KeyD') {
      document.getElementById('debugger_input').focus();
      return false;
    }
    return true;
  };

  //
  // parse debugger input
  //
  document.getElementById('debugger_input').onkeypress = function (e) {
    if (!e) {
      e = window.event;
    }
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13) {

      var txt = document.getElementById('debugger_input').value;
      var output = document.getElementById('debugger_output');
      output.innerHTML = '<div>- <b>' + txt + '</b></div>' + output.innerHTML;
      document.getElementById('debugger_input').value = '';

      worker.postMessage(['to_debugger', txt]);

      return false;
    }
  };

  //
  // C button (clear debugger)
  //
  document.getElementById('clear_debugger').onclick = function (e) {
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

