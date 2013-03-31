var post = require('./post');
var database = require('../database');

exports.index = function(req, res){
    res.render('index', { title: 'Main' });
};

exports.submit = function(req, res){
    post.submitText(req.body);

    res.render('submit', { title: 'Submit text' });
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
        res.render('text', { title: 'Text', row: row });
    });
};

