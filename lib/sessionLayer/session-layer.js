'use strict';


var config = require('../../config');
var session = require('express-session');
var redisConnector = require('./connectors/redis');

module.exports = function sessionLayer(req, res, next) {
    session({
        store: redisConnector(),
        cookie: {
            secure: (req.protocol === 'https')
        },
        key: 'hmbrp.sid',
        secret: config.session.secret,
        resave: true,
        saveUninitialized: true
    })(req, res, next);
};
