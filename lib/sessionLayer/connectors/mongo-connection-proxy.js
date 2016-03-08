'use strict';

var db = {};

(require('mongo-node'))
    .getConnection(function connect(err, dbInstance) {
        if (err) {
            return;
        }
        db.instance = dbInstance;
    });

module.exports = db;
