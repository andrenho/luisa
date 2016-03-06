import test from 'tape';

import { resolveLifs, lifToLrf, lifToBinary } from '../utils/linker';
import encode from '../utils/encoder';


test('LuisaVM linker: resolve LIF', t => {

  const fileA = `
.section text
@start:  jmp    @next`;
  const lifA = encode(fileA);

  const fileB = `
.section text
        nop
@next:  jmp     @start`;
  const lifB = encode(fileB);

  const expected = {
    text: [0x71, 0x0, 0x0, 0x0, 0x0,
           0x87,
           0x71, 0x0, 0x0, 0x0, 0x0],
    reloc: [
      { offset: 0x1, symbol: '@next' },
      { offset: 0x7, symbol: '@start' },
    ],
    symbols: {
      '@start': { section: 'text', addr: 0x0 },
      '@next': { section: 'text', addr: 0x6 },
    },
    type: 'executable',
  };

  console.log(lifA);
  console.log(lifB);

  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab
