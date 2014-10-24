'use strict';

var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function (req, res, next) {
  render(req, res, next, 'ru', 'painting', 'gallery');
});

router.get('/en', function (req, res, next) {
  render(req, res, next, 'en', 'painting', 'gallery');
});

router.get('/graphic', function (req, res, next) {
  render(req, res, next, 'ru', 'graphic', 'gallery');
});

router.get('/en/graphic', function (req, res, next) {
  render(req, res, next, 'en', 'graphic', 'gallery');
});

router.get('/painting/:image', function (req, res, next) {
  render(req, res, next, 'ru', 'painting', 'picture', req.params.image);
});

router.get('/en/painting/:image', function (req, res, next) {
  render(req, res, next, 'en', 'painting', 'picture', req.params.image);
});

router.get('/graphic/:image', function (req, res, next) {
  render(req, res, next, 'ru', 'graphic', 'picture', req.params.image);
});

router.get('/en/graphic/:image', function (req, res, next) {
  render(req, res, next, 'en', 'graphic', 'picture', req.params.image);
});

router.get('/ru', function (req, res, next) {
  res.redirect(301, '/');
});

/**
 *  Function to get router config
 *
 * @param {Object}    req       request obj
 * @param {Object}    res       result obj
 * @param {Function}  next      next function
 * @param {String}    lang      'ru' or 'en'
 * @param {String}    category  'painting' or 'graphic'
 * @param {String}    type      'gallery' or 'picture'
 * @param {String}    [image]   (optional) Image name from the request
 * @returns {{type: *, lang: *, text: {general: *, error: *}}}
 */
function render(req, res, next, lang, category, type, image) {
  var config = {
    type: category,
    lang: lang,
    text: {
      general: require('../lang/general')[lang]
    },
    imgUrl: 'https://s3.eu-central-1.amazonaws.com/shevyakova.com.images/',
    fbLang: (lang === 'ru') ? 'ru_RU' : 'en_US'
  };

  // Get another lang page's url
  if (lang === 'ru') {
    config.anotherLangUrl = '/en';
    if (req.url !== '/') {
      config.anotherLangUrl += req.url;
    }
  } else {
    config.anotherLangUrl = req.url.substr(3) || '/';
  }

  if (type === 'gallery') {
    config.images = (category === 'graphic') ? require('../models/graphic') : require('../models/paintings');
  } else {
    config.image = image;
    config.info = require('../models/paintings')[image];
    // Raise 404 if there is no image.
    if (!config.info) {
      var err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
  }

  res.render(type === 'gallery' ? 'index' : 'picture', config);
}
