// const graphics = require('../models/graphic');
const paintings = require('../models/paintings');
let graphics = require('../models/graphic');

graphics.map(([name, en, ru]) => [name, '', '', en, ru]);

const TEXT = require('../lang/general');

const {
  HOST,
  IMAGES_URL,
  FB_LANGUAGES,
  REVERSED_LANG,
  VIEW_GALLERY,
  VIEW_PICTURE,
  CAT_GRAPHIC,
  CAT_PAINTING,
  EN,
  RU,
} = require('./constants');

const imagesByCategory = {
  [EN]: {
    [CAT_PAINTING]: paintings.map(image =>
      convertImage(EN, CAT_PAINTING, image)
    ),
    [CAT_GRAPHIC]: graphics.map(image => convertImage(EN, CAT_GRAPHIC, image)),
  },
  [RU]: {
    [CAT_PAINTING]: paintings.map(image =>
      convertImage(RU, CAT_PAINTING, image)
    ),
    [CAT_GRAPHIC]: graphics.map(image => convertImage(RU, CAT_GRAPHIC, image)),
  },
};

module.exports = configGenerate;

/**
 *  Generate config for view template
 *
 * @param {String}    lang      'ru' or 'en'
 * @param {String}    category  'painting' or 'graphic'
 * @param {Array}    [image]   (optional) Image name (for picture view)
 * @returns {{type: *, lang: *, text: {general: *, error: *}}}
 */
function configGenerate({ lang, category, image }) {
  const isPictureView = !!image;
  const isGalleryView = !isPictureView;
  const isPainting = category === CAT_PAINTING;
  const isGraphic = category === CAT_GRAPHIC;
  const text = TEXT[lang];
  let imageConfig;

  if (isPictureView) {
    imageConfig = convertImage(lang, category, image);
  }

  return {
    pageType: isPictureView ? VIEW_PICTURE : VIEW_GALLERY,
    type: category,
    lang,
    text,
    pageTitle:
      isPictureView && imageConfig.title
        ? `"${imageConfig.title}". ${text.title}`
        : text.title,
    paintingLink: {
      url: isGalleryView && isPainting ? null : getUrl(lang, CAT_PAINTING),
      isActive: isPictureView && isPainting,
    },
    graphicLink: {
      url: isGalleryView && isGraphic ? null : getUrl(lang, CAT_GRAPHIC),
      isActive: isPictureView && isGraphic,
    },
    imagesUrl: IMAGES_URL,
    fbLang: FB_LANGUAGES[lang],
    url: getAbsUrl(lang, category, imageConfig && imageConfig.name),
    relativeUrl: getUrl(lang, category, imageConfig && imageConfig.name), // Where to save the image
    image: isPictureView ? imageConfig : null,
    images: imagesByCategory[lang][category],
    anotherLangUrl: getUrl(
      REVERSED_LANG[lang],
      category,
      imageConfig && imageConfig.name
    ),
  };
}

/**
 * Generate url for any possible configurations of lang, category and image
 * @param {String}  lang          'ru' or 'en'
 * @param {String}  category      'painting' or 'graphic'
 * @param {String}  [imageName]   (optional) image name
 * @return {string}
 */
function getUrl(lang, category, imageName) {
  let url = '/';

  // Handle language
  if (lang === 'en') {
    url = '/en/';
  }

  // Handle category
  if (imageName || category === CAT_GRAPHIC) {
    url += category;
  }

  // Handle image
  if (imageName) {
    url += '/' + imageName;
  }

  // Strip of trailing slash if any
  if (url.length > 1 && url[url.length - 1] === '/') {
    url = url.slice(0, url.length - 1);
  }

  return url;
}

/**
 * Generate absolute url
 * @param {String}  lang
 * @param {String}  category
 * @param {String}  imageName
 * @return {string}
 */
function getAbsUrl(lang, category, imageName) {
  return HOST + getUrl(lang, category, imageName);
}

/**
 *
 * @param lang
 * @param category
 * @param image
 * @return  Object
 */
function convertImage(lang, category, [name, dims, year, titleEn, titleRu]) {
  const isPainting = category === CAT_PAINTING;
  const isEN = lang === EN;

  return {
    name,
    dims,
    year,
    title: isEN ? titleEn : titleRu,
    descr: isPainting ? `${TEXT[lang].oilOnCanvas} ${dims} ${year}` : '',
    pageUrl: getUrl(lang, category, name),
    url: `${IMAGES_URL}${category}/${name}.jpg`,
    thumbUrl: `${IMAGES_URL}${category}/thumb_${name}.jpg`,
  };
}
