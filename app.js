var express = require('express'),
    app = module.exports = express(),
    sqlite3 = require('sqlite3'),
    data = require('data-aggregator'),
    routes = require('./routes'),
    events = require('./events');

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

// Data providers
app.get('/data/yr', data.providers.yr);
app.get('/data/yr/:id', data.providers.yr);

// delete this
app.get('/foo', function(req, res) {
    res.send(new Date().toString());
});

// Start dispatching events
events.start();

app.listen(port, function(){
    console.log("server running on http://localhost:" + port);
});

