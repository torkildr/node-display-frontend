var database = require('../database');

exports.handleIndex = function(data) {
    if (data.text) {
        var db = database.db();

        var stmt = db.prepare('INSERT INTO texts (text) VALUES (?)');
        stmt.run(data.text);
        stmt.finalize();

        db.close();

        console.log(data);
    }
};


