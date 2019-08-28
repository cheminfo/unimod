function xrefs(tables) {
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
}

module.exports = xrefs;
