const path = require('path');
const pug = require('pug');
const fse = require('fs-extra');
const paintings = require('../models/paintings');
const graphics = require('../models/graphic');
const configGenerate = require('../scripts/config-generate');
const {
  CAT_PAINTING,
  CAT_GRAPHIC,
  RU,
  EN,
  PUBLIC_PATH,
  STATIC_PATH,
  VIEWS_PATH,
} = require('../scripts/constants');
const genPictureMarkup = pug.compileFile(path.join(VIEWS_PATH, 'picture.pug'));
const genGalleryMarkup = pug.compileFile(path.join(VIEWS_PATH, 'gallery.pug'));

module.exports = buildMarkup;

async function buildMarkup() {
  // Generate and write markup
  const paintingsPromises = paintings.map(image => [
    { lang: RU, category: CAT_PAINTING, image },
    { lang: EN, category: CAT_PAINTING, image },
  ]);

  const graphicsPromises = graphics.map(image => [
    { lang: RU, category: CAT_GRAPHIC, image },
    { lang: EN, category: CAT_GRAPHIC, image },
  ]);

  const picturesPromises = [...paintingsPromises, ...graphicsPromises]
    .reduce((result, tuple) => [...result, ...tuple], []) // flatten the array
    .map(configGenerate)
    .map(data =>
      fse.outputFile(urlToFilePath(data.relativeUrl), genPictureMarkup(data))
    );

  const galleryPromises = [
    { lang: RU, category: CAT_PAINTING },
    { lang: EN, category: CAT_PAINTING },
    { lang: RU, category: CAT_GRAPHIC },
    { lang: EN, category: CAT_GRAPHIC },
  ]
    .map(configGenerate)
    .map(data =>
      fse.outputFile(urlToFilePath(data.relativeUrl), genGalleryMarkup(data))
    );

  Promise.all([...picturesPromises, ...galleryPromises])
    .then(() => console.log('ALL GOOD'))
    .catch(err => console.log('ERROR', err));
}

function urlToFilePath(relativeUrl) {
  let filePath;

  switch (relativeUrl) {
    case '/':
      filePath = path.join(PUBLIC_PATH, 'index.html');
      break;
    case '/graphic':
      filePath = path.join(PUBLIC_PATH, 'graphic/index.html');
      break;
    case '/en':
      filePath = path.join(PUBLIC_PATH, 'en/index.html');
      break;
    case '/en/graphic':
      filePath = path.join(PUBLIC_PATH, 'en/graphic/index.html');
      break;
    default:
      filePath = path.join(PUBLIC_PATH, `${relativeUrl}.html`);
  }

  return filePath;
}

// Create folder structure
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
