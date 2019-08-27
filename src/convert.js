const loadTables = require('./loadTables');
const improveBricks = require('./improveBricks');
const { MF } = require('mf-parser');

doAll();

async function doAll() {
  const tables = await loadTables();
  improveBricks(tables);

  tables.modifications = tables.modifications.slice(0, 4);

  // Add molecular formula
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
    }
  }

  for (let modification of tables.modifications) {
    let xrefs = tables.xrefs.filter(
      (entry) => entry.modKey === modification.recordId,
    );
    xrefs.forEach((xref) => {
      xref.source = tables.xrefSources.filter((source) => {
        return source.recordId === xref.xrefSourceKey;
      })[0].xrefSource;
    });
  }

  for (let modification of tables.modifications) {
    let altNames = tables.altNames.filter(
      (entry) => entry.modKey === modification.recordId,
    );
    modification.names = altNames.map((entry) => entry.altName);
  }

  for (let modification of tables.modifications) {
    let specificities = tables.specificity.filter(
      (entry) => entry.modKey === modification.recordId,
    );

    for (let specificity of specificities) {
      let spec2Nl = tables.spec2Nl.filter((entry) => {
        return entry.specKey === specificity.recordId;
      });
      specificity.nl = spec2Nl;
    }
    console.log({ specificities });

    modification.specificities = specificities;
  }

  // console.log(tables.modifications);

  return;
}
