'use strict';

var config = require('../../../config');
var session = require('express-session');
var connection = require('./mongo-connection-proxy');
var logger = require('rtp-logger');
var dbInstance;

connection(function connect(err, db) {
    if (err) {
        logger.error('Cannot connect to mongo session storage');
    }
    dbInstance = db;
});

module.exports = function mongoConnector() {
    var MongoStore = require('connect-mongo')(session);
    return new MongoStore({
        secret: config.session.secret,
        db: dbInstance
    });
};

