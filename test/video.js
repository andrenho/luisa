import test from 'tape';

import Motherboard from '../src/motherboard';
import RAM from '../src/ram';
import MMU from '../src/mmu';
import CPU from '../src/cpu';

import Video from '../src/video';

var Canvas = require('canvas')


function loader_function(file) {
}


function makeVideo() {
  const mb = new Motherboard();
  mb.addDevice(new MMU(new RAM(256)));
  const cpu = new CPU(mb);
  mb.addDevice(cpu);
  const canvas = new Canvas(500,560);
  const video = new Video(loader_function, canvas);
  mb.addDevice(video);
  return [mb, cpu, video, canvas];
}


test('Video: sanity', t => {
  t.doesNotThrow(() => makeVideo(), null, "video created and added to motherboard");
  t.end();
});


test('Video: screen size', t => {
  const [mb, cpu, video, canvas] = makeVideo();
  t.equals(mb.get(video.VID_WIDTH), 500, 'video width');
  t.equals(mb.get(video.VID_HEIGHT), 560, 'video height');
  t.end();
});


test('Draw one single pixel', t => {
  const [mb, cpu, video, canvas] = makeVideo();
  let c = canvas.getContext('2d');
  
  t.deepEqual(c.getImageData(5, 5, 1, 1).data, [0, 0, 0, 0], 'pixel is black');

  // draw pixel in 5,5
  mb.set32(video.VID_P0, 5);
  mb.set32(video.VID_P1, 5);
  mb.set32(video.VID_P2, 0xFF0000);
  mb.set(video.VID_OP, video.VID_OP_DRAW_PX);
  
  t.deepEqual(c.getImageData(5, 5, 1, 1).data.slice(0, 3), [0xFF, 0, 0], 'pixel is red');

  // read pixel in 5, 5
  mb.set(video.VID_OP, video.VID_OP_GET_PX);
  t.equals(mb.get32(video.VID_R0), 0xFF0000, 'read pixel from memory');

  // clear screen
  mb.set32(video.VID_P0, 0);
  mb.set(video.VID_OP, video.VID_OP_CLRSCR);
  t.deepEqual(c.getImageData(5, 5, 1, 1).data.slice(0, 3), [0, 0, 0], 'screen cleared, pixel is black again');

  t.end();
});


test('Draw character', t => {
  const [mb, cpu, video, canvas] = makeVideo();
  let c = canvas.getContext('2d');

  mb.set32(video.VID_P0, '@'.charCodeAt(0));
  mb.set32(video.VID_P1, 5);
  mb.set32(video.VID_P2, 5);
  mb.set32(video.VID_P3, 0x0);
  mb.set32(video.VID_P4, 0xFF0000);
  mb.set32(video.VID_P5, 1);
  mb.set32(video.VID_P6, 1);
  mb.set(video.VID_OP, video.VID_OP_WRITE);

  // check if pixels were set correctly
  let px = 42; // 10 [border] + 6*5 [x=5] + 1 [offset] + 1 [first pixel]
  const py = 57; // 10 [border] + 9*5 [x=5] + 1 [offset] + 1 [first pixel]
  mb.set32(video.VID_P0, px);
  mb.set32(video.VID_P1, py);
  mb.set(video.VID_OP, video.VID_OP_GET_PX);
  t.equals(mb.get32(video.VID_R0), 0xFF0000, 'character set correctly');

  mb.set32(video.VID_P0, '@'.charCodeAt(0));
  mb.set32(video.VID_P1, 6);
  mb.set32(video.VID_P2, 5);
  mb.set32(video.VID_P3, 0x0);
  mb.set32(video.VID_P4, 0xFF0000);
  mb.set32(video.VID_P5, 1);
  mb.set32(video.VID_P6, 1);
  mb.set(video.VID_OP, video.VID_OP_WRITE);

  // check if pixels were set correctly
  px += 6;
  mb.set32(video.VID_P0, px);
  mb.set32(video.VID_P1, py);
  mb.set(video.VID_OP, video.VID_OP_GET_PX);
  t.equals(mb.get32(video.VID_R0), 0xFF0000, 'character cache working correcly');

  t.end();
});


// vim: ts=2:sw=2:sts=2:expandtab
