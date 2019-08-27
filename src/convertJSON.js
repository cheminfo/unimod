const camelCase = require('camelcase');

function convertJSON(json, tableName) {
  let entries = json.unimod[tableName][0][tableName + '_row'];

  return entries.map((entry) => {
    let newEntry = {};
    let keys = Object.keys(entry.$).sort();
    for (let key of keys) {
      newEntry[camelCase(key)] = entry.$[key];
    }
    return newEntry;
  });
}

module.exports = convertJSON;
