'use strict';


var config = require('../../config');
var session = require('express-session');
var connectorToUse = 'mongo';
var connectors = {
    mongo: require('./connectors/mongo'),
    redis: require('./connectors/redis')
};

module.exports = function sessionLayer(req, res, next) {
    session({
        store: connectors[connectorToUse](),
        cookie: {
            secure: (req.protocol === 'https')
        },
        key: 'hmbrp.sid',
        secret: config.session.secret,
        resave: true,
        saveUninitialized: true
    })(req, res, next);
};
