var display = require('./display');
var util = require('./util');
var database = require('./database');

var interval = 5000;

var dispatcher = function() {
    var date = new Date();
    var seconds = util.convertToSeconds(date.getHours(), date.getMinutes(), date.getSeconds());

    database.getActiveTexts(seconds, function(err, rows) {
        console.log("Active texts: " + rows.length);
    });
};

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

