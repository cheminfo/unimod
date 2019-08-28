'use strict';

const loadTables = require('../loadTables');
const improveAA = require('../improveAA');

describe('improveAA ', () => {
  it('test', async () => {
    const tables = await loadTables();
    improveAA(tables);
    expect(tables.aminoAcids.length).toBe(24);
    expect(tables.aminoAcids[1]).toEqual({
      fullName: 'Alanine',
      oneLetter: 'A',
      recordId: '2',
      threeLetter: 'Ala',
      mf: 'C3H5NO',
    });
  });
});
