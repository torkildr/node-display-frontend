var post = require('./post');
var database = require('../database');

exports.index = function(req, res){
    post.handleIndex(req.body);

    res.render('index', { title: 'Main' });
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

