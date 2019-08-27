function improveAA(tables) {
  let aminoAcids = tables.aminoAcids;

  for (let aminoAcid of aminoAcids) {
    console.log(aminoAcid);
  }
  tables.aminoAcidsIndex = {};
  aminoAcids.forEach(
    (aminoAcid) => (tables.aminoAcids[aminoAcid.oneLeter] = aminoAcids),
  );
}

module.exports = improveAA;
