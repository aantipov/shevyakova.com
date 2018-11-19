const path = require('path');
const fse = require('fs-extra');
const buildCss = require('./scripts/build-css');
const buildJS = require('./scripts/build-js');
const buildMarkup = require('./scripts/build-markup');
const { PUBLIC_PATH, STATIC_PATH } = require('./scripts/constants');

// Copy Static to Public
fse.removeSync(PUBLIC_PATH);
[
  'img',
  'favicon.ico',
  'googleb52f3424cd6c03b2.html',
  'robots.txt',
  'sitemap.xml',
  'yandex_4f57ecb8e74719c6.txt',
].forEach(file =>
  fse.copySync(path.join(STATIC_PATH, file), path.join(PUBLIC_PATH, file))
);

buildMarkup();
buildCss(path.join(PUBLIC_PATH, 'style.css'));
buildJS(path.join(PUBLIC_PATH, 'scripts.js'));
