'use strict';

module.exports = function sessionLayer(config) {
    return {
        cookieParser: require('./cookie-parser')(config),
        secureCookies: require('./secure-cookies'),
        initSession: require('./session-layer')(config)
    };
};
