'use strict';

var express = require('express');
var app = express();
var path = require('path');
var logger = require('./lib/logger');
var churchill = require('churchill');

var config = require('./config');

var initSession = require('./lib/sessionLayer/session-layer');
var secureCookies = require('./lib/sessionLayer/secure-cookies');
var cookieParser = require('./lib/sessionLayer/cookie-parser');

require('moment-business');

if (config.env !== 'ci') {
  app.use(churchill(logger));
}

if (config.env === 'development') {
  app.use('/public', express.static(path.resolve(__dirname, './public')));
}

app.use(function setAssetPath(req, res, next) {
  res.locals.assetPath = '/public';
  next();
});

require('hof').template.setup(app);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './apps/common/views'));
app.enable('view cache');
app.use(require('express-partial-templates')(app));
app.engine('html', require('hogan-express-strict'));

app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('body-parser').json());

app.use(function setBaseUrl(req, res, next) {
  res.locals.baseUrl = req.baseUrl;
  next();
});

app.use(cookieParser);
app.use(secureCookies);
app.use(initSession);

// apps
app.use(require('./apps/my_awesome_form/'));

app.get('/cookies', function renderCookies(req, res) {
  res.render('cookies');
});

app.get('/terms-and-conditions', function renderTerms(req, res) {
  res.render('terms');
});

// errors
app.use(require('./errors/'));


/*eslint camelcase: 0*/
app.listen(config.port, config.listen_host);
/*eslint camelcase: 1*/
logger.info('App listening on port', config.port);
