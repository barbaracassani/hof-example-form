'use strict';

var config = require('../../../config');
var session = require('express-session');
var connection = require('./mongo-connection-proxy');
var logger = require('rtp-logger');

module.exports = function createMongoConnector() {

    var MongoStore = require('connect-mongo')(session);

    return connection(function callback(err, db) {
        if (err) {
            logger.error('Cannot connect to mongo');
        }
        return new MongoStore({
            secret: config.session.secret,
            db: db
        });
    });
};

