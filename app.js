var express = require('express')
    , sqlite3 = require('sqlite3')
    , routes = require('./routes')
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
app.get('/submit', routes.submit);
app.post('/submit', routes.submit);
app.get('/texts', routes.texts);
app.get('/texts/:id', routes.text);

app.listen(port, function(){
    console.log("server running on http://localhost:" + port);
});

