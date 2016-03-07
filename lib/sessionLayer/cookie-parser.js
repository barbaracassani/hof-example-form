'use strict';

var config = require('../../config');
module.exports = require('cookie-parser')(config.session.secret);
