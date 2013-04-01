var util = require('../util');
var database = require('../database');

exports.submitText = function(data) {
    if (data.name) {
        var db = database.db();

        var url = "", interval = 0, text = data.text;
        if (data.dataType == "URL") {
            url = data.text;
            interval = data.interval;
            text = "n/a";
        }

        var stmt = db.prepare("INSERT INTO texts (name, dataUrl, nextUpdate, updateInterval, text, showTime, scrolling, startTime, endTime, weekday)" +
                              " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        stmt.run(
            data.name,
            url,
            0,
            0,
            text,
            (data.showTime == 'yes' ? 1 : 0),
            data.scrolling,
            util.convertToSeconds(data.hour[0], data.minute[0], data.second[0]),
            util.convertToSeconds(data.hour[1], data.minute[1], data.second[1]),
            util.bitValues(data.day)
        );

        stmt.finalize();
        db.close();

        return "Text \"" + data.name + "\" updated successfully";
    }

    return false;
};

