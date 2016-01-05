import test from 'tape';

import Motherboard from '../src/motherboard';
import RAM from '../src/ram';
import MMU from '../src/mmu';
import CPU from '../src/cpu';

import Video from '../src/video';


function makeVideo() {
  const mb = new Motherboard();
  mb.addDevice(new MMU(new RAM(256)));
  const cpu = new CPU(mb);
  mb.addDevice(cpu);
  const video = new Video();
  mb.addDevice(video);
  return [mb, cpu, video];
}


test('Video: sanity', t => {
  t.doesNotThrow(() => makeVideo(), null, "video created and added to motherboard");
  t.end();
});


// vim: ts=2:sw=2:sts=2:expandtab
