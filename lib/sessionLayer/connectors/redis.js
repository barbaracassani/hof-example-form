'use strict';

var redis = require('redis');
var session = require('express-session');
var RedisStore = require('connect-redis-crypto')(session);

module.exports = function createRedisConnector(config) {

  var client = redis.createClient(config.redis.port, config.redis.host);

  client.on('error', function clientErrorHandler(e) {
    throw e;  //TODO really we want this to happen?
  });

  return new RedisStore({
    client: client,
    ttl: config.session.ttl,
    secret: config.session.secret
  });
};
