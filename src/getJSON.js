const { readFileSync, read } = require('fs');
const { join } = require('path');
const convert = require('xml-to-json-promise');

let xmlFilename = '../original/unimod_tables.xml';

let xml = readFileSync(join(__dirname, xmlFilename), 'utf8');

async function getJSON() {
  let json = await convert.xmlDataToJSON(xml);

  return json;
}

module.exports = getJSON;
