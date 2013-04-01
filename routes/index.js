var post = require('./post');
var util = require('../util');
var database = require('../database');

exports.index = function(req, res){
    var date = new Date();
    var seconds = util.convertToSeconds(date.getHours(), date.getMinutes(), date.getSeconds());

    database.getActiveTexts(seconds, function(err, rows) {
        res.render('texts', renderContext('Currently active texts', req, { rows: rows }));
    });
};

exports.texts = function(req, res){
    database.db().all("SELECT * FROM texts", function(err, rows) {
        res.render('texts', renderContext('List of texts', req, { rows: rows }));
    });
};

exports.text = function(req, res){
    database.db().get("SELECT * FROM texts WHERE id = ?", req.params.id, function(err, row) {
        res.render('text', renderContext('Text info', req, { row: row }));
    });
};

exports.submit = function(req, res){
    post.submitText(req.body);

    res.render('submit', renderContext('Submit text', req));
};

function renderContext(title, req, props) {
    var context = { title: title, util: util, req: req };

    for (prop in props) {
        context[prop] = props[prop];
    }

    return context;
}

