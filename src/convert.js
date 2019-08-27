const loadTables = require('./loadTables');
const improveBricks = require('./improveBricks');
const { MF } = require('mf-parser');

doAll();

async function doAll() {
  const tables = await loadTables();
  improveBricks(tables);

  for (let modification of tables.modifications) {
    let mod2Brick = tables.mod2Brick.filter(
      (entry) => entry.modKey === modification.recordId,
    );
    modification.mf = mod2Brick
      .map((entry) => {
        let brick = tables.bricksIndex[entry.brick];
        let mf = brick.mf.match(/^[A-Z][a-z]?$/)
          ? brick.mf
          : '(' + brick.mf + ')';
        return mf + (entry.numBrick === '1' ? '' : entry.numBrick);
      })
      .join('');
    let info = new MF(modification.mf).getInfo();
    if (Math.abs(info.monoisotopicMass - modification.monoMass) > 0.001) {
      console.log('ERROR', info.monoisotopicMass, modification.monoMass);
    }
  }
  return;
}
