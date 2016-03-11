'use strict';

var session = require('express-session');

module.exports = function mongoConnector(config) {
  var MongoStore = require('connect-mongo')(session);
  return new MongoStore({
    secret: config.session.secret,
    url : config.mongo.connectionString
  });
};

