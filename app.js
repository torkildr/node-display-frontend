var express = require('express')
    , sqlite3 = require('sqlite3')
    , routes = require('./routes')
    , events = require('./events')
    , db = require('./database');

var app = module.exports = express();
var port = 3000;

// Configuration
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', {layout: false});
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/texts', routes.texts);
app.get('/submit', routes.submit);
app.post('/submit', routes.submit);
app.get('/edit/:id', routes.edit);
app.post('/edit/:id', routes.edit);
app.get('/delete/:id', routes.delete);

// delete this
app.get('/foo', function(req, res) {
    res.send(new Date().toString());
});

// Start dispatching events
//events.start();

app.listen(port, function(){
    console.log("server running on http://localhost:" + port);
});

