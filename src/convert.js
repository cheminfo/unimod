const { writeFileSync } = require('fs');
const { join } = require('path');

const loadTables = require('./loadTables');
const improveBricks = require('./improveBricks');
const improveAA = require('./improveAA');

const appendMol2Bricks = require('./append/mol2bricks');
const appendXrefs = require('./append/xrefs');
const appendAltNames = require('./append/altNames');
const appendSpecificities = require('./append/specificities');

doAll();

async function doAll() {
  const tables = await loadTables();
  improveBricks(tables);
  improveAA(tables);
  // tables.modifications = tables.modifications.slice(990, 1000);

  appendMol2Bricks(tables);
  appendXrefs(tables);
  appendAltNames(tables);
  appendSpecificities(tables);

  writeFileSync(
    join(__dirname, 'modifications.json'),
    JSON.stringify(tables.modifications, undefined, 2),
  );
}
