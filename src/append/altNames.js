function altNames(tables) {
  for (let modification of tables.modifications) {
    let altNames = tables.altNames.filter(
      (entry) => entry.modKey === modification.recordId,
    );
    modification.names = altNames.map((entry) => {
      return {
        value: entry.altName,
      };
    });
  }
}

module.exports = altNames;
