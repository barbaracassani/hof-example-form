'use strict';

var session = require('express-session');
var defaultConnector = 'mongo';

var connectors = {
  mongo: './connectors/mongo',
  redis: './connectors/redis'
};

module.exports = function returnSessionLayer(config) {
  return function sessionLayer(req, res, next) {
    session({
      store: require(connectors[config.session.connector || defaultConnector])(config),
      cookie: {
        secure: (req.protocol === 'https')
      },
      key: 'hmbrp.sid',
      secret: config.session.secret,
      resave: true,
      saveUninitialized: true
    })(req, res, next);
  };
};
