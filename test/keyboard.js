import test from 'tape';

import Motherboard from '../src/motherboard';
import RAM from '../src/ram';
import MMU from '../src/mmu';
import CPU from '../src/cpu';

import Keyboard from '../src/keyboard';

function makeKeyboard() {
  const m = new Motherboard();
  m.addDevice(new MMU(new RAM(256)));
  const c = new CPU(m);
  m.addDevice(c);
  const k = new Keyboard();
  m.addDevice(k);
  return [m, c, k];
}


test('Keyboard: sanity', t => {
  t.doesNotThrow(() => new Keyboard(), null, "keyboard created");
  t.doesNotThrow(() => makeKeyboard(), null, "keyboard created and added to motherboard");
  t.end();
});


test('Keyboard: invalid event', t => {
  const kbd = new Keyboard();
  t.throws(() => kbd.addEvent('event'), null, 'invalid event causes error');
  t.throws(() => kbd.addEvent({ event:'aaa' }), null, 'invalid event causes error');
  t.end();
});


test('Keyboard: keypresses (poll)', t => {
  const [mb, cpu, kbd] = makeKeyboard();

  kbd.addEvent({ event: 'press', shift: false, control: false, alt: true, key: 0x20 });
  kbd.addEvent({ event: 'release', shift: false, control: false, alt: true, key: 0x20 });

  t.equals(mb.get(kbd.KBD_QUEUE_FULL), 0, 'queue is not full');
  t.equals(mb.get32(kbd.KBD_EOQ), (1 << 0x1C) | 0x20, 'event #1');
  mb.set(mb.get(kbd.KBD_DEQUEUE));
  t.equals(mb.get32(kbd.KBD_EOQ), ((1 << 0x1F) | (1 << 0x1C) | 0x20) >>> 0, 'event #2');
  mb.set(mb.get(kbd.KBD_DEQUEUE));
  t.equals(mb.get32(kbd.KBD_EOQ), 0, 'all events dequeued');

  t.end();
});


test('Keyboard: keypresses (interrupt)', t => {
  const [mb, cpu, kbd] = makeKeyboard();

  // prepare
  mb.set(0x0, 0x86);  // nop
  mb.set(kbd.KBD_MODE, kbd.KBD_MODE_INTERRUPT);
  mb.set32(cpu.CPU_INTERRUPT_VECT + (4 * mb.get(kbd.KBD_INTERRUPT)), 0x1000);
  cpu.T = true;

  kbd.addEvent({ event: 'press', shift: false, control: false, alt: true, key: 0x20 });
  mb.step();

  t.equals(cpu.PC, 0x1000, 'interrupt was called');
  t.equals(mb.get(kbd.KBD_QUEUE_FULL), 0, 'queue is not full');
  t.equals(mb.get32(kbd.KBD_EOQ), (1 << 0x1C) | 0x20, 'event #1');

  t.end();
});


test('Keyboard: queue full', t => {
  const [mb, cpu, kbd] = makeKeyboard();
  
  for(let i=0; i < Keyboard.QUEUE_SIZE; ++i) {
    kbd.addEvent({ event: 'press', shift: false, control: false, alt: true, key: 0x20 });
  }

  t.equals(mb.get(kbd.KBD_QUEUE_FULL), 1, 'queue is full');

  t.end();
});


// vim: ts=2:sw=2:sts=2:expandtab
