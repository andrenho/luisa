import Device from './device';

export default class Keyboard extends Device {

  constructor(units) {
    super();
    
    this.KBD_MODE_POLL = 0x0;
    this.KBD_MODE_INTERRUPT = 0x1;

    this.KBD_OP_POP = 0x1;
  }

  name() { return 'TinyKeyboard'; }
  deviceType() { return Device.Type.KEYBOARD; }
  version() { return 0x0; }
  hasInterrupt() { return true; }

  constantList() {
    return {
      KBD_TYPE:      0x00,
      KBD_VERSION:   0x01,
      KBD_INTERRUPT: 0x02,
      KDB_NAME:      0x03,
      KBD_MODE:      0x10,
      KBD_OP:        0x11,
      KBD_P0:        0x14,
      KBD_R0:        0x18,
    };
  }
      

  addEvent(event) {
    if (typeof event !== 'object') {
      throw new Error('Hash expected');
    } else if(event.event === undefined || event.shift === undefined || event.control === undefined || event.alt === undefined || event.key === undefined) {
      throw new Error('Expected format: { event, shift, control, alt, key }');
    }
    // TODO
  }


  get(a) {
    if (a < 0x10) {
      return super.get(a);
    }
  }


  set(a, v) {
    if (a < 0x10) {
      super.set(a, v);
    }
    return 0;
  }
  
}


Keyboard.QUEUE_SIZE = 16;


// vim: ts=2:sw=2:sts=2:expandtab
