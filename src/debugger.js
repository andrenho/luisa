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

export default class Debugger {

  constructor(tinyvm) {
    this._vm = tinyvm;
  }


  parse(s) {
    return 'syntax error (use [?] for help)';
  }

}

// vim: ts=2:sw=2:sts=2:expandtab
