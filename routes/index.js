var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function (req, res) {
  render(res, 'ru', 'painting', 'gallery');
});

router.get('/en', function (req, res) {
  render(res, 'en', 'painting', 'gallery');
});

router.get('/graphic', function (req, res) {
  render(res, 'ru', 'graphic', 'gallery');
});

router.get('/en/graphic', function (req, res) {
  render(res, 'en', 'graphic', 'gallery');
});

router.get('/painting/:image', function (req, res) {
  render(res, 'ru', 'painting', 'picture', req.params.image);
});

router.get('/en/painting/:image', function (req, res) {
  render(res, 'en', 'painting', 'picture', req.params.image);
});

router.get('/graphic/:image', function (req, res) {
  render(res, 'ru', 'graphic', 'picture', req.params.image);
});

router.get('/en/graphic/:image', function (req, res) {
  render(res, 'en', 'graphic', 'picture', req.params.image);
});

router.get('/ru', function (req, res) {
  res.redirect(301, '/');
});

/**
 *  Function to get router config
 *
 * @param {Object}  res      'ru' or 'en'
 * @param {String}  lang      'ru' or 'en'
 * @param {String}  category  'painting' or 'graphic'
 * @param {String}  type      'gallery' or 'picture'
 * @param {String}  [image]     (optional) Image name from the request
 * @returns {{type: *, lang: *, text: {general: *, error: *}}}
 */
function render(res, lang, category, type, image) {
  var config = {
    type: category,
    lang: lang,
    text: {
      general: require('../lang/general')[lang]
    }
  };

  if (type === 'gallery') {
    config.images = (category === 'graphic') ? require('../models/graphic') : require('../models/paintings');
  } else {
    // TODO: add 404 if there is no image
    config.image = image;
    config.info = require('../models/paintings')[image];
  }

  res.render(type, config);
}
