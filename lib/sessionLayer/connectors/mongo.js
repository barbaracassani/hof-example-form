'use strict';

var session = require('express-session');
var dbInstance = require('./mongo-connection-proxy');

module.exports = function mongoConnector(config) {
  var MongoStore = require('connect-mongo')(session);
  return new MongoStore({
    secret: config.session.secret,
    db: dbInstance.instance
  });
};

