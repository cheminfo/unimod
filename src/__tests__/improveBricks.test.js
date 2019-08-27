'use strict';

const loadTables = require('../loadTables');
const improveBricks = require('../improveBricks');

describe('improveBrick ', () => {
  it('test', async () => {
    const tables = await loadTables();
    improveBricks(tables);
    expect(tables.bricks.length).toBe(55);
    expect(tables.bricks[1]).toEqual({
      brick: 'H',
      fullName: 'Hydrogen',
      recordId: '2',
      mfs: [{ brickKey: '2', element: 'H', numElement: '1', recordId: '1' }],
      mf: 'H',
    });
  });
});
