var post = require('./post');
var util = require('./util');
var database = require('../database');

exports.index = function(req, res){
    var db = database.db();

    var date = new Date();
    var seconds = util.convertToSeconds(date.getHours(), date.getMinutes(), date.getSeconds());

    // this will not work correctly for time spans like 23:00 -> 06:00. fix later..
    db.all("SELECT * FROM texts WHERE startTime <= ? AND endTime >= ?", seconds, seconds, function(err, rows) {
        console.log(rows);
        res.render('texts', { title: 'Currently active texts', rows: rows });
    });
};

exports.submit = function(req, res){
    post.submitText(req.body);

    res.render('submit', { title: 'Submit text', url: req.url });
};

exports.texts = function(req, res){
    var db = database.db();

    db.all("SELECT * FROM texts", function(err, rows) {
        res.render('texts', { title: 'List of texts', rows: rows });
    });
};

exports.text = function(req, res){
    var db = database.db();

    db.get("SELECT * FROM texts WHERE id = ?", req.params.id, function(err, row) {
        row.startString = util.convertToTime(row.startTime);
        row.endString = util.convertToTime(row.endTime);

        console.log(row);
        res.render('text', { title: 'Text', row: row });
    });
};

