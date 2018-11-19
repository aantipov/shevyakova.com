const less = require('less');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const concat = require('concat');
const { STATIC_PATH, ASSETS_PATH, TMP_PATH } = require('./constants');

module.exports = buildCSS;

async function buildCSS(outputFilePath) {
  const lessOutputPath = path.join(TMP_PATH, 'bootstrap.css');

  await compileLess(
    path.join(ASSETS_PATH, 'less/bootstrap.less'),
    lessOutputPath
  );

  await concat(
    [
      path.join(STATIC_PATH, 'css/roboto-condensed.css'),
      path.join(STATIC_PATH, 'css/roboto.css'),
      lessOutputPath,
    ],
    outputFilePath
  );

  fse.remove(TMP_PATH);
}

function compileLess(filepath, filepathOutput) {
  const lessContent = fs.readFileSync(filepath, { encoding: 'utf8' });

  return less
    .render(lessContent, { filename: filepath })
    .then(data => fse.outputFile(filepathOutput, data.css));
}
