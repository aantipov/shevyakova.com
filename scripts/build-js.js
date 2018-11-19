const concat = require('concat');
const path = require('path');
const { ROOT_PATH, ASSETS_PATH } = require('./constants');

module.exports = buildJS;

async function buildJS(outputFilePath) {
  await concat(
    [
      path.join(ROOT_PATH, 'node_modules/jquery-lazyload/jquery.lazyload.js'),
      path.join(ASSETS_PATH, 'js/script.js'),
    ],
    outputFilePath
  );
}
