var post = require('./post');
var util = require('../util');
var database = require('../database');

exports.index = function(req, res){
    var db = database.db();

    var date = new Date();
    var seconds = util.convertToSeconds(date.getHours(), date.getMinutes(), date.getSeconds());

    database.getActiveTexts(seconds, function(err, rows) {
        res.render('texts', { title: 'Currently active texts', rows: rows, util: util });
    });
};

exports.submit = function(req, res){
    post.submitText(req.body);

    res.render('submit', { title: 'Submit text', url: req.url });
};

exports.texts = function(req, res){
    var db = database.db();

    db.all("SELECT * FROM texts", function(err, rows) {
        res.render('texts', { title: 'List of texts', rows: rows, util: util });
    });
};

exports.text = function(req, res){
    var db = database.db();

    db.get("SELECT * FROM texts WHERE id = ?", req.params.id, function(err, row) {
        row.startString = util.convertToTime(row.startTime);
        row.endString = util.convertToTime(row.endTime);

        res.render('text', { title: 'Text', row: row });
    });
};

