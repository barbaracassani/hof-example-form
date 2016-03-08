'use strict';

var session = require('express-session');
var defaultConnector = 'redis';
var connectors = {
    mongo: require('./connectors/mongo'),
    redis: require('./connectors/redis')
};

module.exports = function returnSessionLayer(config) {
    return function sessionLayer(req, res, next) {
        session({
            store: connectors[config.session.connector || defaultConnector](),
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
