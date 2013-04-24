var express = require('express'),
    app = module.exports = express(),
    sqlite3 = require('sqlite3'),
    data = require('data-aggregator'),
    texts = require('./texts'),
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
app.get('/', function(req, res) {
    res.render('main', { title: 'Foo' });
});

app.get('/texts/all', texts.getAll);
app.get('/texts/active', texts.getActive);
app.get('/texts/id/:id', texts.getText);
app.post('/texts/id/:id', texts.updateText);
app.delete('/texts/id/:id', texts.deleteText);
app.post('/texts/add', texts.addText);

// Data providers
app.get('/data/yr', data.providers.yr);
app.get('/data/yr/:id', data.providers.yr);

// Start dispatching events
//events.start("http://localhost:" + port);

app.listen(port, function(){
    console.log("server running on http://localhost:" + port);
});

