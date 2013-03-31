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

