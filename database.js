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
        console.info('Creating database. This may take a while...');
        fs.readFile(sqlFile, 'utf8', function (err, data) {
            if (err) throw err;
            db.exec(data, function (err) {
                if (err) throw err;
                console.info('Done.');
                db.close();
            });
        });
    }
});

exports.getActiveTexts = function(s, callback) {
    var db = getDb();
    console.log("opened: getActiveTexts");

    // this will work correctly for time spans like 23:00 -> 06:00 as well
    db.all("SELECT * FROM texts WHERE (startTime < endTime AND startTime <= ? AND endTime >= ?) OR " +
           "(startTime > endTime AND startTime >= ? AND endTime >= ?)" +
           "ORDER BY startTime ASC, endTime ASC, name ASC", s, s, s, s, function(err, rows) {
        callback(err, rows);
        db.close();
        console.log("closed: getActiveTexts");
    });
};

exports.updateText = function(id, text) {
    var db = getDb();
    console.log("opened: updateText");

    var stmt = db.prepare("UPDATE texts SET updated=?, text=? WHERE id = ?");
    stmt.run(util.getTime(), text, id, function() {
        stmt.finalize(function() {
            db.close();
            console.log("closed: updateText");
        });
    });
};

