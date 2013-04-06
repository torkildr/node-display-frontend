var fs = require('fs'),
    sqlite3 = require('sqlite3').verbose(),
    util = require('./util');

var dbFile = 'display.db';
var sqlFile = 'display.sql';

function getDb() {
    var db = new sqlite3.Database(dbFile);
    return db;
};

// not fully sync, but sync enough that every db-call at this point forward
// will have the correct state
function checkDbSync(file) {
    var exists = fs.existsSync(dbFile);

    if (!exists) {
        var db = getDb();
        console.info('creating ' + dbFile);

        var data = fs.readFileSync(sqlFile, 'utf8');

        db.exec(data, function (err) {
            if (err) throw err;
            console.info('db initialized');
            db.close();
        });
    }
}

checkDbSync(dbFile);

exports.db = getDb;

