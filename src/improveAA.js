function improveAA(tables) {
  let aminoAcids = tables.aminoAcids;

  for (let aminoAcid of aminoAcids) {
    let atoms = [];
    for (let key of ['numC', 'numH', 'numN', 'numO', 'numS', 'numSe']) {
      if (aminoAcid[key] !== '0') {
        atoms.push(key.replace('num', ''));
        if (aminoAcid[key] !== '1') atoms.push(aminoAcid[key]);
      }
      delete aminoAcid[key];
    }
    aminoAcid.mf = atoms.join('');
  }
  tables.aminoAcidsIndex = {};
  aminoAcids.forEach(
    (aminoAcid) => (tables.aminoAcids[aminoAcid.oneLeter] = aminoAcids),
  );
}

module.exports = improveAA;
