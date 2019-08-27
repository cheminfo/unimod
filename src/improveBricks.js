function improveBricks(tables) {
  let bricks = tables.bricks;
  let compositions = tables.brick2Element;
  for (let brick of bricks) {
    brick.mfs = compositions.filter(
      (composition) => composition.brickKey === brick.recordId,
    );
    brick.mf = brick.mfs
      .map((mf) => {
        let element = mf.element.match(/^[1-9]/)
          ? '[' + mf.element + ']'
          : mf.element;
        return element + (mf.numElement !== '1' ? mf.numElement : '');
      })
      .join('');
    if (brick.brick === '-') brick.mf = '(-)';
  }
  tables.bricksIndex = {};
  bricks.forEach((brick) => (tables.bricksIndex[brick.brick] = brick));
}

module.exports = improveBricks;
