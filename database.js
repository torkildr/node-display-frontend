var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

var dbFile = 'display.db';
var sqlFile = 'display.sql';

fs.exists(dbFile, function (exists) {
  db = new sqlite3.Database(dbFile);

  if (!exists) {
    console.info('Creating database. This may take a while...');
    fs.readFile(sqlFile, 'utf8', function (err, data) {
      if (err) throw err;
      db.exec(data, function (err) {
        if (err) throw err;
        console.info('Done.');
      });
    });
  }
});

exports.db = function() {
  return new sqlite3.Database(dbFile);
};

exports.getActiveTexts = function(s, callback) {
  var db = new sqlite3.Database(dbFile);

  // this will work correctly for time spans like 23:00 -> 06:00 as well
  db.all("SELECT * FROM texts WHERE (startTime < endTime AND startTime <= ? AND endTime >= ?) OR " +
         "(startTime > endTime AND startTime >= ? AND endTime >= ?)", s, s, s, s, callback);
}

