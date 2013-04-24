var util = require('../util');
var database = require('../database');

function sendJSON(res, data) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
}

function sendHead(res, success, failed, error) {
    if (typeof(failed) !== 'undefined' && error) {
        res.writeHead(failed);
    } else {
        res.writeHead(success);
    }
    res.end();
}

exports.getActive = function(req, res) {
    var db = database.db();
    db.all("SELECT * FROM texts_active", function(err, rows) {
        sendJSON(res, rows);
        db.close();
    });
};

exports.getAll = function(req, res) {
    var db = database.db();
    db.all("SELECT * FROM texts ORDER BY startTime ASC, endTime ASC, name ASC", function(err, rows) {
        sendJSON(res, rows);
        db.close();
    });
};

exports.getText = function(req, res) {
    var db = database.db();
    db.get("SELECT * FROM texts WHERE id = ?", req.params.id, function(err, row) {
        if (err || !row) {
            sendHead(res, 403);
        } else {
            sendJSON(res, row);
        }
        db.close();
    });
};

exports.deleteText = function(req, res) {
    var db = database.db();

    db.run("DELETE FROM texts WHERE id = ?", req.params.id, function(err) {
        if (this.changes > 0) {
            sendHead(res, 200);
        } else {
            sendHead(res, 403);
        }

        console.log(this);
        console.log("Deleted id " + req.params.id);
        db.close();
    });
};

exports.addText = function(req, res) {
    var d = req.body;
    var db = database.db();
    var stmt = db.prepare("INSERT INTO texts (name, url, updated, updateInterval, text, showTime, scrolling, startTime, endTime, weekday)" +
                          " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    stmt.run(d.name, d.url, 0, d.updateInterval, d.text, d.showTime, d.scrolling, d.startTime, d.endTime, d.weekday, function(err) {
        sendHead(res, 201, 400);
        console.log("Added id " + this.lastID);
        db.close();
    });
    stmt.finalize();
};

exports.updateText = function(req, res) {
    var d = req.body;
    var db = database.db();
    var stmt = db.prepare("UPDATE texts SET " +
                          "name=?, url=?, updated=?, updateInterval=?, text=?, showTime=?, scrolling=?, startTime=?, endTime=?, weekday=? " +
                          "WHERE id = ?");

    stmt.run(d.name, d.url, 0, d.updateInterval, d.text, d.showTime, d.scrolling, d.startTime, d.endTime, d.weekday, req.params.id, function(err) {
        sendHead(res, 200, 400);
        console.log("Updated id " + req.params.id);
        db.close();
    });
    stmt.finalize();
};

function renderContext(title, req, props) {
    var context = { title: title, util: util, req: req };

    for (prop in props) {
        context[prop] = props[prop];
    }

    return context;
}

