// LIF : Luisa Internal Format (acutally a JSON object)
// LRF : Luisa Relocatable Format (executables, object files and libraries)

import encode from './encoder';

//
// CONVERT ASSEMBLY TO LIF
//

export default function assemblyToLif(code) {

  function parseEntry(pars, ctx) {
    if (pars.length !== 1) {
      throw new Error(`Syntax error in line ${ctx.nline}. [entry]`);
    }
    const r = parseInt(pars[0]);
    if (isNaN(r)) {
      throw new Error(`Invalid number for entry in line ${ctx.nline}.`);
    }
    return r;
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


  function parseText(line, ctx) {
    let bytes = encode(line);
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


  // 
  // MAIN PROCEDURE
  //

  let ctx = {
    symbols: {},
    constants: {},
    currentSection: undefined,
    text: [],
    bss: 0,
    data: [],
    rodata: [],
    nline: 1,
  };

  for (let line of code.split('\n')) {

    // remove comments
    line = line.replace(/;.*/, '');

    // remove spaces around
    line = line.trim();

    if (line.startsWith('.')) {
      // directive
      let [directive, ...pars] = line.split(' ');
      pars = pars.filter(n => n.trim() !== '');
      switch (directive) {
        case '.entry': ctx.entry = parseEntry(pars, ctx); break;
        case '.section': ctx.currentSection = parseSection(pars, ctx); break;
        case '.define': parseConstant(pars); break;
        case '.import': parseImport(pars); break;
        default:
          throw new Error(`Invalid directive ${directive} in line ${ctx.nline}.`);
      }

    } else if (line !== '') {
      // code
      switch (ctx.currentSection) {
        case 'text': ctx.text = ctx.text.concat(parseText(line, ctx)); break;
        case 'bss': ctx.bss += parseBSS(line, ctx); break;
        case 'data': ctx.data = ctx.data.concat(parseData(line, 'data', ctx)); break;
        case 'rodata': ctx.rodata = ctx.rodata.concat(parseData(line, 'rodata', ctx)); break;
        default: 
          throw new Error(`Invalid section in line ${ctx.nline}.`);
      }
    }

    ++ctx.nline;
  }

  // remove contextual unwanted info
  delete ctx.currentSection;
  delete ctx.constants;
  delete ctx.nline;
  if (Object.keys(ctx.symbols).length === 0) { delete ctx.symbols; }
  if (ctx.text.length === 0) { delete ctx.text; }
  if (ctx.bss === 0) { delete ctx.bss; }
  if (ctx.data.length === 0) { delete ctx.data; }
  if (ctx.rodata.length === 0) { delete ctx.rodata; }

  return ctx;
}

// vim: ts=2:sw=2:sts=2:expandtab
