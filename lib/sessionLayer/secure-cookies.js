'use strict';

module.exports = function secureCookies(req, res, next) {
    var cookie = res.cookie.bind(res);
    res.cookie = function cookieHandler(name, value, options) {
        options = options || {};
        options.secure = (req.protocol === 'https');
        options.httpOnly = true;
        options.path = '/';
        cookie(name, value, options);
    };
    next();
};

