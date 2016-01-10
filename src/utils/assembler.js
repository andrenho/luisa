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

  // remove ctxual unwanted info
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
