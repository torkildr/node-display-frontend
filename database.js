var fs = require('fs'),
    sqlite3 = require('sqlite3').verbose(),
    util = require('./util');

var dbFile = 'display.db';
var sqlFile = 'display.sql';

function getDb() {
    var db = new sqlite3.Database(dbFile);
    return db;
};

exports.db = getDb;

fs.exists(dbFile, function (exists) {
    if (!exists) {
        var db = getDb();
        console.info('creating ' + dbFile);
        fs.readFile(sqlFile, 'utf8', function (err, data) {
            if (err) throw err;
            db.exec(data, function (err) {
                if (err) throw err;
                console.info('done');
                db.close();
            });
        });
    }
});

