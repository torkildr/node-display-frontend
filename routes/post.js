var database = require('../database');

exports.submitText = function(data) {
    if (data.text) {
        var db = database.db();

        var stmt = db.prepare('INSERT INTO texts (text, showTime, scrolling, startTime, endTime) VALUES (?, ?, ?, ?, ?)');

        stmt.run(
            data.text,
            (data.showTime == 'yes' ? 1 : 0),
            data.scrolling,
            data.startTime,
            data.endTime
        );

        stmt.finalize();

        db.close();

        console.log(data);
    }
};

