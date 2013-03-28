var express = require('express')
  , routes = require('./routes')
  , display = require('./display');

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

var postHandle = function(data) {
    console.log(data);

    display.scroll(data.scrolling);
    display.text(data.text, data.showTime == "yes");
}

// Routes
app.get('/', routes.index);

// Post routes
app.post('/', function(req,res){
    if (req.body)
        postHandle(req.body);

    routes.index(req, res);
});

app.listen(port, function(){
  console.log("server running on http://localhost:" + port);
});

