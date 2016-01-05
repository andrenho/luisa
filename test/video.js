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
  
  // set color 1 = red
  mb.set32(video.VID_PALETTE + (0x1 * 4), 0xFF000000);

  // draw pixel in 5,5
  mb.set(video.VID_PIXELS + (5 * 560) + 5, 0x1);
  t.deepEqual(c.getImageData(5, 5, 1, 1).data, [0, 0, 0, 0], 'pixel is black');

  // update screen
  mb.set(video.VID_OP, video.VID_OP_UPDATE);
  t.deepEqual(c.getImageData(5, 5, 1, 1).data, [0xFF, 0, 0, 0], 'pixel is red');

  t.end();
});


test('Draw character', t => {
  t.fail('test not implemented yet');
  t.end();
});


// vim: ts=2:sw=2:sts=2:expandtab
