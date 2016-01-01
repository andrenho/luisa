//
// encode/decode
//

export default function cpuEncode(s) {

  function registerValue(r) {
    switch (r) {
      case 'a': return 0;
      case 'b': return 1;
      case 'c': return 2;
      case 'd': return 3;
      case 'e': return 4;
      case 'f': return 5;
      case 'g': return 6;
      case 'h': return 7;
      case 'i': return 8;
      case 'j': return 9;
      case 'k': return 10;
      case 'l': return 11;
      case 'fp': return 12;
      case 'sp': return 13;
      case 'pc': return 14;
      case 'fl': return 15;
      default: throw new Error('Invalid register ' + r);
    }
  }

  //
  // understand command
  //

  // TODO - not working with one single parameter
  const m = s.match(/^\s*([a-z\.]+)(?:\s+(\[?(?:[a-l]|fp|sp|pc|fl|0x[0-9a-f]+|[0-9]+)\]?))?(?:\s*,\s*(\[?(?:[a-l]|fp|sp|pc|fl|0x[0-9a-f]+|[0-9]+)\]?))?\s*$/i); // https://regex101.com/r/pV1pA9/2
  if (!m) {
    throw new Error('Invalid command `' + s + '`');
  } 

  let cmd = { opcode: m[1], pars: [] };
  for (let i = 2; i < m.length; ++i) {
    if (m[i] == undefined) {
      continue;
    }

    let type;
    let value;
    let size;
    let valArray = [];
    if (m[i][0] === '[') {
      if (m[i].slice(-1) !== ']') {
        throw new Error('Unbalanced bracket in ' + m[i]);
      }
      if (m[i][1].charCodeAt(0) > '9'.charCodeAt(0)) {
        type = 'indirect register';
        value = registerValue(m[i].slice(1, -1).toLowerCase());
        size = 8;
        valArray = [value];
      } else {
        type = 'indirect value';
        value = parseInt(m[i].slice(1, -1));  // TODO - doesn't work with binary
        size = 32;
        valArray = [value & 0xFF, (value >> 8) & 0xFF, (value >> 16) & 0xFF, (value >> 24) & 0xFF];
      }
    } else if (m[i].charCodeAt(0) > '9'.charCodeAt(0)) {
      type = 'register';
      value = registerValue(m[i].toLowerCase());
      size = 8;
      valArray = [value];
    } else {
      type = 'value';
      value = parseInt(m[i]);
      if (value <= 0xFF) {
        size = 8;
        valArray = [value];
      } else if (value <= 0xFFFF) {
        size = 16;
        valArray = [value & 0xFF, value >> 8];
      } else {
        size = 32;
        valArray = [value & 0xFF, (value >> 8) & 0xFF, (value >> 16) & 0xFF, (value >> 24) & 0xFF];
      }
    }
    cmd.pars.push({ type, value, size, valArray });
  }

  //
  // parse command (TODO)
  //
  try {
    var [t0, v0, a0, s0] = [cmd.pars[0].type, cmd.pars[0].value, cmd.pars[0].valArray, cmd.pars[0].size];
  } catch (e) {
    if (e instanceof TypeError) {
      var [t0, v0, a0, s0] = ['none', 0, [], 0];
    } else {
      throw e;
    }
  }
  try {
    var [t1, v1, a1, s1] = [cmd.pars[1].type, cmd.pars[1].value, cmd.pars[1].valArray, cmd.pars[1].size];
  } catch (e) {
    if (e instanceof TypeError) {
      var [t1, v1, a1, s1] = ['none', 0, [], 0];
    } else {
      throw e;
    }
  }

  //console.log(cmd);
  //console.log(`t0: ${t0}   v0: ${v0}   t1: ${t1}   v1: ${v1}`);

  let opcode = null;

  switch (cmd.opcode) {

    case 'mov':
      if (t0 === 'register' && t1 !== 'none') {  // only valid condition
        if (t1 === 'register') {
          opcode = 0x01;
        } else if (t1 === 'value') {
          switch (s1) {
            case 8:  opcode = 0x02; break;
            case 16: opcode = 0x03; break;
            case 32: opcode = 0x04; break;
          }
        }
        if (opcode) {
          return [opcode, v0].concat(a1);
        }
      }
      break;

    case 'movb':
      if (t0 === 'register') {
        switch (t1) {
          case 'indirect register': opcode = 0x05; break;
          case 'indirect value':    opcode = 0x06; break;
        }
      } else if (t0 === 'indirect register') {
        switch (t1) {
          case 'register':          opcode = 0x0B; break;
          case 'value':           
            if (s1 <= 8) { 
              opcode = 0x0C; 
            }
            break;
          case 'indirect register': opcode = 0x0D; break;
          case 'indirect value':    opcode = 0x0E; break;
        }
      } else if (t0 === 'indirect value') {
        switch (t1) {
          case 'register':          opcode = 0x21; break;
          case 'value':           
            if (s1 <= 8) { 
              opcode = 0x22;
            }
            break;
          case 'indirect register': opcode = 0x23; break;
          case 'indirect value':    opcode = 0x24; break;
        }
      }
      if (opcode) {
        return [opcode].concat(a0).concat(a1);
      }
      break;

    case 'movw':
      if (t0 === 'register') {
        switch (t1) {
          case 'indirect register': opcode = 0x07; break;
          case 'indirect value':    opcode = 0x08; break;
        }
      } else if (t0 === 'indirect register') {
        switch (t1) {
          case 'register':          opcode = 0x0F; break;
          case 'value':           
            if (s1 <= 16) { 
              return [0x1A].concat(a0).concat([v1 & 0xFF, v1 >> 8]);
            }
            break;
          case 'indirect register': opcode = 0x1B; break;
          case 'indirect value':    opcode = 0x1C; break;
        }
      } else if (t0 === 'indirect value') {
        switch (t1) {
          case 'register':          opcode = 0x25; break;
          case 'value':
            if (s1 <= 16) { 
              return [0x26].concat(a0).concat([v1 & 0xFF, v1 >> 8]);
            }
            break;
          case 'indirect register': opcode = 0x27; break;
          case 'indirect value':    opcode = 0x28; break;
        }
      }
      if (opcode) {
        return [opcode].concat(a0).concat(a1);
      }
      break;

    case 'movd':
      if (t0 === 'register') {
        switch (t1) {
          case 'indirect register': opcode = 0x09; break;
          case 'indirect value':    opcode = 0x0A; break;
        }
      } else if (t0 === 'indirect register') {
        switch (t1) {
          case 'register':          opcode = 0x1D; break;
          case 'value':           
            return [0x1E].concat(a0).concat([v1 & 0xFF, (v1 >> 8) & 0xFF, (v1 >> 16) & 0xFF, (v1 >> 24) & 0xFF]);
          case 'indirect register': opcode = 0x1F; break;
          case 'indirect value':    opcode = 0x20; break;
        }
      } else if (t0 === 'indirect value') {
        switch (t1) {
          case 'register':          opcode = 0x29; break;
          case 'value':           
            return [0x2A].concat(a0).concat([v1 & 0xFF, (v1 >> 8) & 0xFF, (v1 >> 16) & 0xFF, (v1 >> 24) & 0xFF]);
          case 'indirect register': opcode = 0x2B; break;
          case 'indirect value':    opcode = 0x2C; break;
        }
      }
      if (opcode) {
        return [opcode].concat(a0).concat(a1);
      }
      break;

    case 'or':
      if (t0 === 'register') {
        if (t1 === 'register') {
          return [0x2D].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 8) {
          return [0x2E].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 16) {
          return [0x2F].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 32) {
          return [0x30].concat(a0).concat(a1);
        }
      }
      break;

    case 'xor':
      if (t0 === 'register') {
        if (t1 === 'register') {
          return [0x31].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 8) {
          return [0x32].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 16) {
          return [0x33].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 32) {
          return [0x34].concat(a0).concat(a1);
        }
      }
      break;

    case 'and':
      if (t0 === 'register') {
        if (t1 === 'register') {
          return [0x35].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 8) {
          return [0x36].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 16) {
          return [0x37].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 32) {
          return [0x38].concat(a0).concat(a1);
        }
      }
      break;

    case 'shl':
      if (t0 === 'register') {
        if (t1 === 'register') {
          return [0x39].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 8) {
          return [0x3A].concat(a0).concat(a1);
        }
      }
      break;

    case 'shr':
      if (t0 === 'register') {
        if (t1 === 'register') {
          return [0x3D].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 8) {
          return [0x3E].concat(a0).concat(a1);
        }
      }
      break;

    case 'not':
      if (t0 === 'register' && t1 === 'none') {
        return [0x41].concat(a0);
      }
      break;

    case 'add':
      if (t0 === 'register') {
        if (t1 === 'register') {
          return [0x42].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 8) {
          return [0x43].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 16) {
          return [0x44].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 32) {
          return [0x45].concat(a0).concat(a1);
        }
      }
      break;

    case 'sub':
      if (t0 === 'register') {
        if (t1 === 'register') {
          return [0x46].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 8) {
          return [0x47].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 16) {
          return [0x48].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 32) {
          return [0x49].concat(a0).concat(a1);
        }
      }
      break;

    case 'cmp':
      if (t0 === 'register') {
        if (t1 === 'register') {
          return [0x4A].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 8) {
          return [0x4B].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 16) {
          return [0x4C].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 32) {
          return [0x4D].concat(a0).concat(a1);
        }
      }
      break;

    case 'mul':
      if (t0 === 'register') {
        if (t1 === 'register') {
          return [0x4E].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 8) {
          return [0x4F].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 16) {
          return [0x50].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 32) {
          return [0x51].concat(a0).concat(a1);
        }
      }
      break;

    case 'idiv':
      if (t0 === 'register') {
        if (t1 === 'register') {
          return [0x52].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 8) {
          return [0x53].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 16) {
          return [0x54].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 32) {
          return [0x55].concat(a0).concat(a1);
        }
      }
      break;

    case 'mod':
      if (t0 === 'register') {
        if (t1 === 'register') {
          return [0x56].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 8) {
          return [0x57].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 16) {
          return [0x58].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 32) {
          return [0x59].concat(a0).concat(a1);
        }
      }
      break;

    case 'inc':
      if (t0 === 'register' && t1 === 'none') {
        return [0x5A].concat(a0);
      }
      break;

    case 'dec':
      if (t0 === 'register' && t1 === 'none') {
        return [0x5B].concat(a0);
      }
      break;

    /*
    case 'fadd':
      if (t0 === 'register') {
        if (t1 === 'register') {
          return [0x7F].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 8) {
          return [0x80].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 16) {
          return [0x81].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 32) {
          return [0x82].concat(a0).concat(a1);
        }
      }
      break;

    case 'fsub':
      if (t0 === 'register') {
        if (t1 === 'register') {
          return [0x83].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 8) {
          return [0x84].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 16) {
          return [0x85].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 32) {
          return [0x86].concat(a0).concat(a1);
        }
      }
      break;

    case 'fcmp':
      if (t0 === 'register') {
        if (t1 === 'register') {
          return [0x87].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 8) {
          return [0x88].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 16) {
          return [0x89].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 32) {
          return [0x8A].concat(a0).concat(a1);
        }
      }
      break;

    case 'fmul':
      if (t0 === 'register') {
        if (t1 === 'register') {
          return [0x8B].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 8) {
          return [0x8C].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 16) {
          return [0x8D].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 32) {
          return [0x8E].concat(a0).concat(a1);
        }
      }
      break;

    case 'fdiv':
      if (t0 === 'register') {
        if (t1 === 'register') {
          return [0x8F].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 8) {
          return [0x90].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 16) {
          return [0x91].concat(a0).concat(a1);
        } else if (t1 === 'value' && s1 === 32) {
          return [0x92].concat(a0).concat(a1);
        }
      }
      break;
    */

    case 'bz':
    case 'beq':
      if (t0 === 'register' && t1 === 'none') {
        return [0x5C].concat(a0);
      } else if (t0 === 'value' && t1 === 'none') {
        return [0x5D, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
      }
      break;

    case 'bnz':
    case 'bneq':
      if (t0 === 'register' && t1 === 'none') {
        return [0x5E].concat(a0);
      } else if (t0 === 'value' && t1 === 'none') {
        return [0x5F, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
      }
      break;

    case 'bneg':
      if (t0 === 'register' && t1 === 'none') {
        return [0x60].concat(a0);
      } else if (t0 === 'value' && t1 === 'none') {
        return [0x61, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
      }
      break;

    case 'bpos':
      if (t0 === 'register' && t1 === 'none') {
        return [0x62].concat(a0);
      } else if (t0 === 'value' && t1 === 'none') {
        return [0x63, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
      }
      break;

    case 'bgt':
      if (t0 === 'register' && t1 === 'none') {
        return [0x64].concat(a0);
      } else if (t0 === 'value' && t1 === 'none') {
        return [0x65, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
      }
      break;

    case 'bgte':
      if (t0 === 'register' && t1 === 'none') {
        return [0x66].concat(a0);
      } else if (t0 === 'value' && t1 === 'none') {
        return [0x67, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
      }
      break;

    case 'blt':
      if (t0 === 'register' && t1 === 'none') {
        return [0x68].concat(a0);
      } else if (t0 === 'value' && t1 === 'none') {
        return [0x69, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
      }
      break;

    case 'blte':
      if (t0 === 'register' && t1 === 'none') {
        return [0x6A].concat(a0);
      } else if (t0 === 'value' && t1 === 'none') {
        return [0x6B, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
      }
      break;

    case 'bv':
      if (t0 === 'register' && t1 === 'none') {
        return [0x6C].concat(a0);
      } else if (t0 === 'value' && t1 === 'none') {
        return [0x6D, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
      }
      break;

    case 'bnv':
      if (t0 === 'register' && t1 === 'none') {
        return [0x6E].concat(a0);
      } else if (t0 === 'value' && t1 === 'none') {
        return [0x6F, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
      }
      break;

    case 'jmp':
      if (t0 === 'register' && t1 === 'none') {
        return [0x70].concat(a0);
      } else if (t0 === 'value' && t1 === 'none') {
        return [0x71, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
      }
      break;

    case 'jsr':
      if (t0 === 'register' && t1 === 'none') {
        return [0x72].concat(a0);
      } else if (t0 === 'value' && t1 === 'none') {
        return [0x73, v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF];
      }
      break;

    case 'ret':
      if (t0 === 'none' && t1 === 'none') {
        return [0x74];
      }
      break;

    case 'jsr':
      if (t0 === 'register' && t1 === 'none') {
        return [0x75].concat(a0);
      } else if (t0 === 'value' && s0 === 8 && t1 === 'none') {
        return [0x76, v0];
      }
      break;

    case 'iret':
      if (t0 === 'none' && t1 === 'none') {
        return [0x77];
      }
      break;

    case 'pushb':
      if (t0 === 'register' && t1 === 'none') {
        return [0x78].concat(a0);
      } else if (t0 === 'value' && size <= 8 && t1 === 'none') {
        return [0x79].concat(a0);
      }
      break;

    case 'pushw':
      if (t0 === 'register' && t1 === 'none') {
        return [0x7A].concat(a0);
      } else if (t0 === value && size <= 16 && t1 === 'none') {
        return [0x7B].concat([v0 & 0xFF, v0 >> 8]);
      }
      break;

    case 'pushd':
      if (t0 === 'register' && t1 === 'none') {
        return [0x7C].concat(a0);
      } else if (t0 === 'value' && size <= 16 && t1 === 'none') {
        return [0x7D].concat([v0 & 0xFF, (v0 >> 8) & 0xFF, (v0 >> 16) & 0xFF, (v0 >> 24) & 0xFF]);
      }
      break;

    case 'push.a':
      if (t0 === 'none' && t1 === 'none') {
        return [0x7E];
      }
      break;

    case 'popb':
      if (t0 === 'register' && t1 === 'none') {
        return [0x7F].concat(a0);
      }
      break;

    case 'popw':
      if (t0 === 'register' && t1 === 'none') {
        return [0x80].concat(a0);
      }
      break;

    case 'popd':
      if (t0 === 'register' && t1 === 'none') {
        return [0x81].concat(a0);
      }
      break;

    case 'pop.a':
      if (t0 === 'none' && t1 === 'none') {
        return [0x82];
      }
      break;

    case 'popx':
      if (t0 === 'register' && t1 === 'none') {
        return [0x83].concat(a0);
      } else if (t0 === 'value' && size <= 8 && t1 === 'none') {
        return [0x84].concat(a0);
      } else if (t0 === 'value' && size <= 16 && t1 === 'none') {
        return [0x85].concat(a0);
      }
      break;

  }

  throw new Error(`Invalid command '${s}'`);
}

// vim: ts=2:sw=2:sts=2:expandtab
