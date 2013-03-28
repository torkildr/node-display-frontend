var express = require('express')
  , routes = require('./routes')
  , display = require('./node-display');

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

display.scroll("left");
display.text("FooBar!", true);

app.listen(port, function(){
  console.log("server running on http://localhost:" + port);
});

