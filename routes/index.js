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

