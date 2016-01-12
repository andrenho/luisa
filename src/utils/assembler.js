// LIF : Luisa Internal Format (acutally a JSON object)
// LRF : Luisa Relocatable Format (executables, object files and libraries)

import encode from './encoder';
let fs = require('fs');

let reservedWords = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
  'l', 'fp', 'sp', 'pc', 'fl', 'y', 'v', 'z', 's', 'gt', 'lt', 'p', 't',
  'mov', 'movb', 'movw', 'movd', 'or', 'xor', 'and', 'shl', 'shr', 'not', 'add',
  'sub', 'cmp', 'mul', 'idiv', 'mod', 'inc', 'dec', 'bz', 'beq', 'bnz', 'bneq', 'bneg',
  'bpos', 'bgt', 'bgte', 'blt', 'blte', 'bv', 'bnv', 'jmp', 'jsr', 'ret', 'sys',
  'iret', 'sret', 'pushb', 'pushw', 'pushd', 'push.a', 'popb', 'popw', 'popd',
  'pop.a', 'popx', 'nop', 'db', 'dw', 'dd', 'resb', 'resw', 'resd' ];


//
// CONVERT ASSEMBLY TO LIF
//

export function assemblyToLif(code) {

  function replaceConstants(line, ctx) {
    for(let c in ctx.constants) {
      line = line.replace(c, ctx.constants[c]);
    }
    return line;
  }


  function parseSection(pars, ctx) {
    if (pars.length !== 1) {
      throw new Error(`Syntax error in line ${ctx.nline}. [section]`);
    }
    const section = pars[0];
    if (section === 'text' || section === 'bss' || section === 'data' || section === 'rodata') {
      return section;
    } else {
      throw new Error(`Invalid section ${section} in line ${ctx.nline}.`);
    }
  }


  function parseConstant(pars, ctx) {
    if (pars.length !== 2) {
      throw new Error(`Syntax error in line ${ctx.nline}. [define]`);
    }
    const [name, value] = pars;
    if (!/[A-z]\w*/.test(name)) {
      throw new Error(`Invalid name for a define in line ${ctx.nline}. [define]`);
    }
    if (reservedWords.includes(name)) {
      throw new Error(`${name} is a reserved word in line ${ctx.nline}. [define]`);
    }
    ctx.constants[name] = value;
  }


  function parseImport(pars, ctx) {
    if (pars.length !== 1) {
      throw new Error(`Syntax error in line ${ctx.nline}. [import]`);
    }
    let importedFile;
    try {
      importedFile = fs.readFileSync(pars[0]);
    } catch(e) {
      throw new Error(`Error reading file ${pars[0]}: ${e}`);
    }
    for (let line of importedFile.toString().split('\n')) {
      line = line.replace(/;.*/, '').trim();
      if (line.startsWith('.define')) {
        parseConstant(line.trim().split(/[\s\t]+/).slice(1), ctx);
      } else if (line !== '') {
        throw new Error(`Invalid line in file ${pars[0]}: '${line}'`);
      }
    }
  }


  function chompLabels(line, ctx) {
    const re = /[\.@]?[A-z]\w*:[\s\t]*/g;
    let a;
    let last = 0;
    // for each symbol found
    while ((a = re.exec(line)) !== null) {  
      // prepare symbol
      let label = a[0].trim();
      label = label.slice(0, label.length - 1);
      // check if it's local or static/global
      if (label.startsWith('.')) {
        label = ctx.currentSymbol + label;
      } else {
        ctx.currentSymbol = label;
      }
      // check if symbol is duplicated
      if (label in ctx.symbols) {
        throw new Error(`Symbol '${label}' duplicated in line ${ctx.nline}.`);
      }
      // find address
      let addr;
      if (ctx.currentSection === 'bss') {
        addr = ctx.bss;
      } else {
        addr = ctx[ctx.currentSection].length;
      }
      // add symbol
      ctx.symbols[label] = { section: ctx.currentSection, addr };
      last = re.lastIndex;
    }
    return line.slice(last);
  }


  function parseText(line, ctx) {
    let bytes = encode(line, true, ctx.currentSymbol);
    return bytes;
  }


  function parseBSS(line, ctx) {
    const sp = line.split(/[\s\t]+/);
    if (sp.length !== 2) {
      throw new Error(`Syntax error in line ${ctx.nline}. [bss]`);
    }
    let [cmd,par] = sp;
    par = parseInt(par);
    if (isNaN(par)) {
      throw new Error(`Invalid number in line ${ctx.nline}. [bss]`);
    }
    switch (cmd) {
      case 'resb': return par;
      case 'resw': return par * 2;
      case 'resd': return par * 4;
      default:
        throw new Error(`Invalid command '${cmd}' in line ${ctx.nline}.`);
    }
  }


  function parseData(line, section, ctx) {
    const sp = line.split(/[\s\t]+/);
    if (sp.length < 2) {
      throw new Error(`Syntax error in line ${ctx.nline}. [${section}]`);
    }
    const [cmd,...par] = sp;
    let data = [];
    for (let b of par.join(' ').split(/,(?=([^\"]*\"[^\"]*\")*[^\"]*$)/)) {  // split by commas
      if (b === undefined) { continue; }
      let value;
      if (cmd == 'db' && (b.startsWith('"') || b.startsWith("'"))) {  // string
        data = data.concat(parseString(b, ctx));
      } else {  // numbers
        value = parseInt(b);
        if (isNaN(value)) {
          throw new Error(`Invalid number in line ${ctx.nline}.`);
        }
        switch (cmd) {
          case 'db':
            if (value > 0xFF) { throw new Error(`Number too large in line ${ctx.nline}.`); }
            data.push(value);
            break;
          case 'dw':
            if (value > 0xFFFF) { throw new Error(`Number too large in line ${ctx.nline}.`); }
            data = data.concat([value & 0xFF, value >> 8]);
            break;
          case 'dd':
            if (value > 0xFFFFFFFF) { throw new Error(`Number too large in line ${ctx.nline}.`); }
            data = data.concat([value & 0xFF, (value >> 8) & 0xFF, (value >> 16) & 0xFF, (value >> 24) & 0xFF ]);
            break;
          default:
            throw new Error(`Invalid command '${cmd}' in line ${ctx.nline}.`);
        }
      }
    }
    return data;
  }


  function parseString(s, ctx) {
    let data = [];
    s = s.slice(1, s.length - 1);  // remove quotes
    for (let i = 0; i < s.length; ++i) {
      if (s[i] === '\\') {
        if (i === s.length - 1) {
          throw new Error(`Backslash requires a character afterwords, at ${ctx.nline}.`);
        }
        let v;
        switch (s[i + 1]) {
          case 'n': v = 13; break;
          case '0': v = 0; break;
          case '\\': v = '\\'.charCodeAt(0); break;
          default:
            throw new Error(`Invalid backslash at ${ctx.nline}.`);
        }
        data.push(v);
        ++i;
      } else {
        data.push(s[i].charCodeAt(0));
      }
    }
    return data;
  }


  function addExports(ctx) {
    ctx.exports = Object.keys(ctx.symbols).filter(n => n.startsWith('@'));
  }


  // 
  // MAIN PROCEDURE
  //

  let ctx = {
    text: [],
    bss: 0,
    data: [],
    rodata: [],
    symbols: {},
    constants: {},
    reloc: [],
    exports: [],
    unresolved: [],
    currentSection: undefined,
    currentSymbol: '',
    nline: 1,
  };

  for (let line of code.split('\n')) {

    // remove comments
    line = line.replace(/;.*/, '');

    // remove spaces around
    line = line.trim();

    // replace constants
    line = replaceConstants(line, ctx);

    if (line.startsWith('.') && !line.includes(':')) {
      // directive
      let [directive, ...pars] = line.split(' ');
      pars = pars.filter(n => n.trim() !== '');
      switch (directive) {
        case '.section': ctx.currentSection = parseSection(pars, ctx); break;
        case '.define': parseConstant(pars, ctx); break;
        case '.import': parseImport(pars, ctx); break;
        default:
          throw new Error(`Invalid directive ${directive} in line ${ctx.nline}.`);
      }

    } else {
      const origLine = line;
      // code
      line = chompLabels(line, ctx);
      if (line !== '') {
        switch (ctx.currentSection) {
          case 'text': ctx.text = ctx.text.concat(parseText(line, ctx)); break;
          case 'bss': ctx.bss += parseBSS(line, ctx); break;
          case 'data': ctx.data = ctx.data.concat(parseData(line, 'data', ctx)); break;
          case 'rodata': ctx.rodata = ctx.rodata.concat(parseData(line, 'rodata', ctx)); break;
          default: 
            throw new Error(`Invalid section in line ${ctx.nline}.`);
        }
      }
    }

    ++ctx.nline;
  }

  // final adjustments
  // addExports(ctx); - TODO

  // remove contextual unwanted info
  delete ctx.currentSection;
  delete ctx.currentSymbol;
  delete ctx.constants;
  delete ctx.nline;
  if (Object.keys(ctx.symbols).length === 0) { delete ctx.symbols; }
  if (ctx.text.length === 0) { delete ctx.text; }
  if (ctx.bss === 0) { delete ctx.bss; }
  if (ctx.data.length === 0) { delete ctx.data; }
  if (ctx.rodata.length === 0) { delete ctx.rodata; }
  if (ctx.reloc.length === 0) { delete ctx.reloc; }
  if (ctx.exports.length === 0) { delete ctx.exports; }
  if (ctx.unresolved.length === 0) { delete ctx.unresolved; }

  return ctx;
}


// 
// JOIN LIF FILES
//

export function joinLifObjects(objects) {

  function joinTwoLifObjects(objA, objB) {
    let joined = {};
    // join sections text, data and rodata
    for (let section of ['text', 'data', 'rodata']) {
      if (objA[section] || objB[section]) {
        joined[section] = (objA[section] ? objA[section] : []).concat(objB[section] ? objB[section] : []);
      }
    }
    // join bss
    if (objA.bss || objB.bss) {
      joined.bss = (objA.bss ? objA.bss : 0) + (objB.bss ? objB.bss : 0);
    }
    // add symbols
    joined.symbols = {};
    if (objA.symbols) {
      Object.keys(objA.symbols).forEach(k => joined.symbols[k] = objA.symbols[k]);
    }
    if (objB.symbols) {
      Object.keys(objB.symbols).forEach(k => {
        let sym = { section: objB.symbols[k].section, addr: objB.symbols[k].addr };
        if (sym.section === 'bss') {
          sym.addr += (objA.bss ? objA.bss : 0);
        } else {
          sym.addr += (objA[sym.section] ? objA[sym.section].length : 0);
        }
        joined.symbols[k] = sym;
      });
    }
    if (Object.keys(joined.symbols).length === 0) {
      delete joined.symbols;
    }
    return joined;
  }

  
  // join all LIF objects
  let joined = {};
  for (let obj of objects) {
    joined = joinTwoLifObjects(joined, obj);
  }
  return joined;
}


// 
// RESOLVE SYMBOLS & CREATE RELOCATION TABLE
//

export function createRelocationTable(obj, resolvePublic, allowToLeavePublicPending) {
  if (!obj.text) {
    return obj;
  }
  if (!obj.reloc) {
    obj.reloc = [];
  }

  // resolve references in text
  let resolved = {};
  for (let i = 0; i < obj.text.length; ++i) {
    const v = obj.text[i];
    if (typeof v === 'string') {
      if (v.startsWith('@') && !resolvePublic) {
        continue;
      }
      const sym = obj.symbols[v];
      if (!sym) {
        if (v.startsWith('@') && allowToLeavePublicPending) {
        } else {
          throw new Error(`Symbol ${v} was not found in symbol table.`);
        }
      } else {
        obj.reloc.push({ offset: i, desloc: sym.addr, section: sym.section });
        resolved[v] = true;
        obj.text[i] = 0x00;
      }
    }
  }

  // remove resolved symbols
  for (let s of Object.keys(obj.symbols)) {
    if (s in resolved) {
      delete obj.symbols[s];
    }
  }

  // check if everything was resolved
  for (let s of Object.keys(obj.symbols)) {
    if (!s.startsWith('@') || (s.startsWith('@') && !allowToLeavePublicPending)) {
      throw new Error(`Symbol ${s} could not be resolved.`);
    }
  }

  // remove symbol table, if empty
  if (Object.keys(obj.symbols).length === 0) {
    delete obj.symbols;
  }

  return obj;
}


//
// GENERATE BINARY
//

export function convertLifToLrf(obj) {
}


export function convertLifToBinary(obj, parameters) {
}


// vim: ts=2:sw=2:sts=2:expandtab
