var express = require('express');
var router = express.Router();
var images = require('../models/paintings');// TODO: fix it.
var lang = 'en';// TODO: fix it.
var type = 'painting';// TODO: fix it.
var text = {
    general: require('../lang/general')[lang],
    error: require('../lang/error')[lang]
};

console.log(text);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('gallery', { title: 'Express', type: type, images: images, lang: lang, text: text});
});

module.exports = router;
