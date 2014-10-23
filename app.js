var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// TODO: find out how to manage it.
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    var lang = 'ru';
    var text = {
      error: require('./lang/error')[lang][(err.status || 404) ? 404 : 500],
      general: require('./lang/general')[lang]
    };
    res.status(err.status || 500);
    res.render('error', {
      header: text.error.header,
      descr: text.error.descr,
      message: err.message,
      error: err,
      text: text.general
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  var lang = 'ru';
  var text = require('./lang/error')[lang];
  res.status(err.status || 500);
  res.render('error', {
    header: text.header,
    descr: text.descr,
    message: err.message,
    error: {}
  });
});


module.exports = app;
