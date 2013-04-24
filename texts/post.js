var util = require('../util');
var database = require('../database');

function prepareText(data) {
    var values = {};

    values.url = "";
    values.interval = 0
    values.text = data.text;

    if (data.dataType == "URL") {
        values.url = data.text;
        values.updateInterval = data.interval;
        values.text = "n/a";
    }

    values.name = data.name;
    values.showTime = (data.showTime == 'yes') ? 1 : 0;
    values.scrolling = data.scrolling;
    values.startTime = util.convertToSeconds(data.hour[0], data.minute[0], data.second[0]),
    values.endTime = util.convertToSeconds(data.hour[1], data.minute[1], data.second[1]),
    values.weekday = util.bitValues(data.day);

    return values;
}

exports.updateText = function(req, callback) {
    var data = req.body;

    if (data.rowId) {
        var db = database.db();
        var p = prepareText(data);
        var stmt = db.prepare("UPDATE texts SET " +
                              "name=?, url=?, updated=?, updateInterval=?, text=?, showTime=?, scrolling=?, startTime=?, endTime=?, weekday=? " +
                              "WHERE id = ?");

        req.alert = { text: 'Text  "'+ data.name + '" updated successfully', class: 'alert-success' };

        stmt.run(p.name, p.url, 0, p.updateInterval, p.text, p.showTime, p.scrolling, p.startTime, p.endTime, p.weekday, data.rowId, function() {
            stmt.finalize(function() {
                db.close();
            });
            callback();
        });
    } else {
        callback();
    }
}

exports.submitText = function(req, callback) {
    var data = req.body;

    if (data.name) {
        var db = database.db();
        var p = prepareText(data);
        var stmt = db.prepare("INSERT INTO texts (name, url, updated, updateInterval, text, showTime, scrolling, startTime, endTime, weekday)" +
                              " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        req.alert = { text: 'Text  "'+ data.name + '" added successfully', class: 'alert-success' };

        stmt.run(p.name, p.url, 0, p.updateInterval, p.text, p.showTime, p.scrolling, p.startTime, p.endTime, p.weekday, function() {
            stmt.finalize(function () {
                db.close();
            });
            callback();
        });
    } else {
        callback();
    }
};

