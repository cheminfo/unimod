'use strict';

const getJSON = require('./getJSON');
const camelCase = require('camelcase');

const convertJSON = require('./convertJSON');

async function loadTables() {
  let json = await getJSON();

  let tableNames = Object.keys(json.unimod).filter((entry) => entry !== '$');

  let tables = {};
  for (let tableName of tableNames) {
    tables[camelCase(tableName)] = convertJSON(json, tableName);
    // console.log(camelCase(tableName), tables[camelCase(tableName)].length);
  }

  return tables;
}

module.exports = loadTables;
