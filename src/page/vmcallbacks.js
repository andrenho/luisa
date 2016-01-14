'use strict';

let charCache = {};

function executeCallbacks(cbs) {
  for (let cb of cbs) {
    if (cb.device === 'video') {
      switch (cb.cmd) {
        case 'clrscr':  videoClearScreen.apply(self, cb.pars); break;
        case 'draw_px': videoDrawPixel.apply(self, cb.pars);   break;
        case 'write':   videoWrite.apply(self, cb.pars);       break;
        default:
          console.warn(`Invalid call ${cb.device}:${cb.cmd}.`);
      }
    } else {
      console.warn(`Invalid call ${cb.device}:${cb.cmd}.`);
    }
  }
}


function videoClearScreen(r, g, b) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = `rgb(${(r >> 16) & 0xFF},${(g >> 8) & 0xFF},${b & 0xFF})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function videoDrawPixel(x, y, color) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let px = (x + (y * canvas.width)) * 4;
  data.data[px + 3] = 0xFF;
  data.data[px + 0] = (color >> 16) & 0xFF;
  data.data[px + 1] = (color >> 8) & 0xFF;
  data.data[px + 2] = color & 0xFF;
  ctx.putImageData(data, 0, 0, p[0], p[1], 1, 1);
}


function videoWrite(c, x, y, bg, fg, offx, offy) {

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  function createCharImage(c, bg, fg) {
    let img = ctx.createImageData(6, 9);
    for (let y = 0; y < 9; ++y) {
      for (let x = 0; x < 6; ++x) {
        const p = ((5 - x) + (y * 6)) * 4;
        const v = (chars[c][y] >> x) & 1;
        img.data[p + 3] = 0xFF;
        img.data[p] = ((v ? fg : bg) >> 16) & 0xFF;
        img.data[p + 1] = ((v ? fg : bg) >> 8) & 0xFF;
        img.data[p + 2] = (v ? fg : bg) & 0xFF;
      }
    }
    return img;
  }

  function charImage(c, bg, fg) {
    const idx = `${c.toString(16)}_${bg.toString(16)}${fg.toString(16)}`;
    const value = charCache[idx];
    if (value) {
      return value;
    } else {
      const chr = createCharImage(c, bg, fg);
      charCache[idx] = chr;
      return chr;
    }
  }

  const image = charImage(c, bg, fg);
  const px = 10 + (x * 6) + offx;
  const py = 10 + (y * 9) + offy;
  ctx.putImageData(image, px, py);
}


// vim: ts=2:sw=2:sts=2:expandtab
