const path = require('path');

const HOST = 'https://shevyakova.com';

const IMAGES_URL =
  'https://s3.eu-central-1.amazonaws.com/shevyakova.com.images/';

const EN = 'en';
const RU = 'ru';
const VIEW_GALLERY = 'gallery';
const VIEW_PICTURE = 'picture';
const CAT_PAINTING = 'painting';
const CAT_GRAPHIC = 'graphic';
const ROOT_PATH = path.join(__dirname, '..');
const PUBLIC_PATH = path.join(ROOT_PATH, 'public');
const STATIC_PATH = path.join(ROOT_PATH, 'static');
const ASSETS_PATH = path.join(ROOT_PATH, 'assets');
const VIEWS_PATH = path.join(ROOT_PATH, 'views');
const TMP_PATH = path.join(ROOT_PATH, '.tmp');

const REVERSED_LANG = {
  [EN]: RU,
  [RU]: EN,
};

const FB_LANGUAGES = {
  [RU]: 'ru_RU',
  [EN]: 'en_US',
};

module.exports = {
  HOST,
  IMAGES_URL,
  EN,
  RU,
  CAT_PAINTING,
  CAT_GRAPHIC,
  VIEW_GALLERY,
  VIEW_PICTURE,
  REVERSED_LANG,
  FB_LANGUAGES,
  ROOT_PATH,
  PUBLIC_PATH,
  STATIC_PATH,
  ASSETS_PATH,
  VIEWS_PATH,
  TMP_PATH,
};
