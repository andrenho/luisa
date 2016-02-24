import test from 'tape';

import Motherboard from '../src/motherboard';
import RAM from '../src/ram';
import MMU from '../src/mmu';
import CPU from '../src/cpu';

import Timer from '../src/timer';

function makeTimer() {
  const m = new Motherboard();
  m.addDevice(new MMU(new RAM(256)));
  const c = new CPU(m);
  m.addDevice(c);
  const t = new Timer();
  m.addDevice(t);
  return [m, c, t];
}


function convertTime(ms, sec, min) {
  return (ms | (sec << 10) | (min << 20));
}


test('Timer: sanity', t => {
  t.doesNotThrow(() => new Timer(), null, "timer created");
  t.doesNotThrow(() => makeTimer(), null, "timer created and added to motherboard");
  t.end();
});


//test('Timer: single timer', t => {


// vim: ts=2:sw=2:sts=2:expandtab
