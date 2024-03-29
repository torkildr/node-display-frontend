var http = require('http'),
    async = require('async'),
    display = require('./display'),
    util = require('./util'),
    database = require('./database');

// seconds
var interval = 4 * 1000;
var urlInterval = 60;

// makes sure to only update when text has changed
var lastText = "";

var serverPath = "";

var commandQueue = async.queue(function(task, callback) {
    console.log('processing queue');
    callback();
}, 1);

function updateDisplay(text) {
    if (text == lastText)
        return;

    commandQueue.push({}, function() {
        display.scroll("auto");
        display.text(text, true);
    });

    lastText = text;
    console.log("New text: " + text);
}

function updateData(db, row, callback) {
    var url = row.url;

    if (url.indexOf('/') == 0)
        url = serverPath + row.url;

    http.get(url, function(res) {
        var data = "";
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function() {
            var newline = data.indexOf('\n');
            if (newline > 0)
                data = data.substr(0, newline);

            console.log("updated " + row.url);

            db.run("UPDATE texts SET updated = ?, text = ? WHERE id = ?",
                   util.getTime(), data, row.id, callback);
        });
    });
}

var dispatcher = function() {
    var db = database.db();

    async.parallel([
        function (callback) {
            db.all("SELECT * FROM texts_active", function(err, rows) {
                var texts = rows.map(function(row) { return row.text; });
                var formattedText = texts.join(" | ");

                updateDisplay(formattedText);

                callback();
            });
        },
        function (callback) {
            db.all("SELECT * FROM texts_outdated", function(err, rows) {
                var updates = rows.map(function(row) {
                    return function(innerCallback) {
                        updateData(db, row, innerCallback);
                    };
                });

                async.parallelLimit(updates, 3, function (err) {
                    callback();
                })
            });
        }
    ], function(err, result) {
        db.close();
    });
};

// keep track of the timer id
var id;

var stop = function() {
    if (id)
        clearInterval(id);
    id = null;
}

var start = function(path) {
    stop();

    id = setInterval(dispatcher, interval);
    serverPath = path;
}

exports.stop = stop;
exports.start = start;

