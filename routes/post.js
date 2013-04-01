var util = require('../util');
var database = require('../database');

exports.submitText = function(data) {
    if (data.text) {
        console.log(data);
        return;
        var db = database.db();
        var stmt = db.prepare('INSERT INTO texts (text, showTime, scrolling, startTime, endTime) VALUES (?, ?, ?, ?, ?)');

        stmt.run(
            data.text,
            (data.showTime == 'yes' ? 1 : 0),
            data.scrolling,
            util.convertToSeconds(data.hour[0], data.minute[0], data.second[0]),
            util.convertToSeconds(data.hour[1], data.minute[1], data.second[1])
        );

        stmt.finalize();
        db.close();
    }
};

