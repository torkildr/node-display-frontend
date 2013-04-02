var post = require('./post');
var util = require('../util');
var database = require('../database');

exports.index = function(req, res) {
    var db = database.db();
    db.all("SELECT * FROM texts_active", function(err, rows) {
        res.render('texts', renderContext('Currently active texts', req, { rows: rows }));
        db.close();
    });
};

exports.texts = function(req, res) {
    var db = database.db();
    db.all("SELECT * FROM texts ORDER BY startTime ASC, endTime ASC, name ASC", function(err, rows) {
        res.render('texts', renderContext('List of texts', req, { rows: rows }));
        db.close();
    });
};

exports.edit = function(req, res) {
    console.log("Edit id " + req.params.id);

    post.updateText(req, function() {
        var db = database.db();
        db.get("SELECT * FROM texts WHERE id = ?", req.params.id, function(err, row) {
            res.render('submit', renderContext('Edit text', req, { row: row }));
            db.close();
        });
    });
};

exports.delete = function(req, res) {
    console.log("Delete id " + req.params.id);

    var db = database.db();
    db.get("DELETE FROM texts WHERE id = ?", req.params.id, function(err, row) {
        req.alert = { text: 'Text deleted successfully', class: 'alert-success' };
        exports.texts(req, res);
        db.close();
    });
};

exports.submit = function(req, res){
    post.submitText(req, function() {
        res.render('submit', renderContext('Create new text', req, { row: {} }));
    });
};

function renderContext(title, req, props) {
    var context = { title: title, util: util, req: req };

    for (prop in props) {
        context[prop] = props[prop];
    }

    return context;
}

