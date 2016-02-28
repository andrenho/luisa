/* Functionalities:
 *   - [?] help
 *     Memory
 *       - [d]ump memory block
 *       - [e]nter memory data
 *       - [f]ill memory with data
 *       - [c]opy memory block
 *       - search for [p]attern
 *     CPU
 *       - [r]egisters
 *       - [s]tep through
 *       - step [o]ver
 *       - [r]un
 *       - [s]et/[u]nset breakpoint
 *     Video
 *       - dump [t]ext
 *     Code
 *       - [a]ssemble
 *       - [d]isassemble
 *     File operations (?)
 *     Other
 *       - [h]ex calculator
 */


function h(n, digits) {
  return (Array(digits || 0).join('0') + n.toString(16)).substr(-digits).toUpperCase();
}


export default class Debugger {

  constructor(tinyvm) {
    this._vm = tinyvm;
  }


  parse(s) {
    let [cmd, ...pars] = s.split(' ');
    switch (cmd) {
      case '?': return this._help();
      case 'r': return this._registers();
      case 's': return this._step();
      default: return 'syntax error (use [?] for help)';
    }
  }


  _help() {
    return `CPU:
  [r] Registers
  [s] step through
  [o] step over
  [c] continue execution
  [s]/[u] set/unset breakpoint ([address=PC])
  [l] disassemly ([address=PC])

Memory:
  [d] dump memory block     (address [size=0x100])
  [e] enter memory data     (address value)
  [f] fill memory with data (address size value)
  [c] copy memory block     (origin destination size)
  [p] search for pattern    (pattern [beginning [end]])
  [v] virtual memory info

Other:
  [t] dump video text`;
  }


  _registers() {
    const c = this._vm.cpu;
    return `A: ${h(c.A,8)}    E: ${h(c.E,8)}    I: ${h(c.I,8)}    FP: ${h(c.FP,8)}
B: ${h(c.A,8)}    F: ${h(c.E,8)}    J: ${h(c.I,8)}    SP: ${h(c.FP,8)}
D: ${h(c.A,8)}    G: ${h(c.E,8)}    K: ${h(c.I,8)}    PC: ${h(c.FP,8)}
C: ${h(c.A,8)}    H: ${h(c.E,8)}    L: ${h(c.I,8)}    FL: ${h(c.FP,8)}`;
    // TODO - add flags
  }


  _step() {
    this._vm.step();
    return '';
  }

}

// vim: ts=2:sw=2:sts=2:expandtab
