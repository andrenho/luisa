import test from 'tape';

test.only('TinyAS: simplest file', t => {

  const file = `
.entry  0x0

.section text
        nop
`;

  const result = {
  };

  t.deepEquals(assemble(file), result);
  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab
