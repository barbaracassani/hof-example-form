'use strict';


var config = require('../../config');
var session = require('express-session');
var redis = require('redis');
var RedisStore = require('connect-redis-crypto')(session);


var client = redis.createClient(config.redis.port, config.redis.host);

client.on('error', function clientErrorHandler(e) {
    throw e;
});

var redisStore = new RedisStore({
    client: client,
    ttl: config.session.ttl,
    secret: config.session.secret
});


module.exports = function sessionLayer(req, res, next) {
    session({
        store: redisStore,
        cookie: {
            secure: (req.protocol === 'https')
        },
        key: 'hmbrp.sid',
        secret: config.session.secret,
        resave: true,
        saveUninitialized: true
    })(req, res, next);
};
