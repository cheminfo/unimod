const { MF } = require('mf-parser');

function specificities(tables) {
  for (let modification of tables.modifications) {
    let specificities = tables.specificity.filter(
      (entry) => entry.modKey === modification.recordId,
    );

    for (let specificity of specificities) {
      let position = tables.positions.filter((entry) => {
        return specificity.positionKey === entry.recordId;
      })[0];
      specificity.position = position.position;
      delete specificity.positionKey;
    }

    for (let specificity of specificities) {
      let classification = tables.classifications.filter((entry) => {
        return specificity.classificationsKey === entry.recordId;
      })[0];
      specificity.classification = classification.classification;
      delete specificity.classificationsKey;
    }

    for (let specificity of specificities) {
      let spec2Nls = tables.spec2Nl.filter((entry) => {
        return (
          entry.specKey === specificity.recordId && entry.nlMonoMass !== '0'
        );
      });
      for (let spec2Nl of spec2Nls) {
        let neutralLosses = tables.neutralLosses.filter((entry) => {
          return entry.specKey === spec2Nl.recordId;
        });
        spec2Nl.mf = neutralLosses
          .map((entry) => {
            let brick = tables.bricksIndex[entry.brick];
            let mf = brick.mf.match(/^[A-Z][a-z]?$/)
              ? brick.mf
              : '(' + brick.mf + ')';
            return mf + (entry.numBrick === '1' ? '' : entry.numBrick);
          })
          .join('');
        let mf = new MF(spec2Nl.mf);
        let info = mf.getInfo();
        if (Math.abs(info.monoisotopicMass - spec2Nl.nlMonoMass) > 0.0001) {
          console.log(
            'ERROR',
            spec2Nl.mf,
            info.monoisotopicMass,
            spec2Nl.nlMonoMass,
          );
        } else {
          spec2Nl.monoisotopicMass = info.monoisotopicMass;
          spec2Nl.mass = info.mass;
          spec2Nl.mf = info.mf;
          spec2Nl.charge = info.charge;
          delete spec2Nl.nlMonoMass;
          delete spec2Nl.nlAvgeMass;
        }
        spec2Nl.composition = spec2Nl.nlComposition;
        delete spec2Nl.nlComposition;
      }
      specificity.spec2Nls = spec2Nls;
    }

    modification.specificities = specificities;
  }
}

module.exports = specificities;
