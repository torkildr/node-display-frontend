var display = require('./display');
var util = require('./util');
var database = require('./database');

// seconds
var interval = 5 * 1000;

// makes sure to only update when text has changed
var lastText = "";

function updateText(text) {
    if (text == lastText)
        return;

    display.scroll("auto");
    display.text(text, true);
    lastText = text;
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
    dispatcher();
}

exports.stop = stop;
exports.start = start;

