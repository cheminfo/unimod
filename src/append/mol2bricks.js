const { MF } = require('mf-parser');

function mol2bricks(tables) {
  for (let modification of tables.modifications) {
    let mod2Brick = tables.mod2Brick.filter(
      (entry) => entry.modKey === modification.recordId,
    );
    modification.dateTimeModified = new Date(
      modification.dateTimeModified,
    ).getTime();
    modification.dateTimePosted = new Date(
      modification.dateTimePosted,
    ).getTime();
    modification.mf = mod2Brick
      .map((entry) => {
        let brick = tables.bricksIndex[entry.brick];
        let mf = brick.mf.match(/^[A-Z][a-z]?$/)
          ? brick.mf
          : '(' + brick.mf + ')';
        return mf + (entry.numBrick === '1' ? '' : entry.numBrick);
      })
      .join('');
    let mf = new MF(modification.mf);
    let info = mf.getInfo();
    if (Math.abs(info.monoisotopicMass - modification.monoMass) > 0.0001) {
      console.log('ERROR', info.monoisotopicMass, modification.monoMass);
    } else {
      modification.monoisotopicMass = info.monoisotopicMass;
      modification.mass = info.mass;
      modification.mf = info.mf;
      modification.charge = info.charge;
      delete modification.monoMass;
      delete modification.avgeMass;
    }
  }
}

module.exports = mol2bricks;
