var display = require('./display');

var interval = 5000;

var dispatcher = function() {
    console.log("Dispatched...");
};

var id;

var stop = function() {
    if (id)
        clearInterval(id);
    id = null;
}

var start = function() {
    stop();

    id = setInterval(dispatcher, interval);
}

exports.stop = stop;
exports.start = start;

