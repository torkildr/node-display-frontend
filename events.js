var http = require('http');
var display = require('./display');
var util = require('./util');
var database = require('./database');

// seconds
var interval = 5 * 1000;
var urlInterval = 60;

// makes sure to only update when text has changed
var lastText = "";

function updateText(text) {
    if (text == lastText)
        return;

    display.scroll("auto");
    display.text(text, true);
    lastText = text;
}

function updateData(row) {
    if (!row.url)
        return;

    var interval = row.updateInterval;
    if (!interval || interval == 0)
        interval = urlInterval;

    if (row.updated + interval > util.getTime())
        return;

    http.get(row.url, function(res) {
        var data = "";
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function() {
            var newline = data.indexOf('\n');
            if (newline > 0)
                data = data.substr(0, newline);
            database.updateText(row.id, data);
        });
    });
}

var dispatcher = function() {
    var date = new Date();
    var seconds = util.convertToSeconds(date.getHours(), date.getMinutes(), date.getSeconds());

    database.getActiveTexts(seconds, function(err, rows) {
        if (!rows) {
            console.log("No data");
            return;
        }

        var texts = rows.map(function (row) { return row.text; });
        var formattedText = texts.join(" | ");
        console.log("Active texts: " + texts.length);
        updateText(formattedText);
        rows.map(function (row) { updateData(row); });
    });
};

// keep track of the timer id
var id;

var stop = function() {
    if (id)
        clearInterval(id);
    id = null;
}

var start = function() {
    stop();

    id = setInterval(dispatcher, interval);
}

exports.stop = stop;
exports.start = start;

