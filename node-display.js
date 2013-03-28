var fs = require('fs');

var fifo_file = "/tmp/matrix_display";

var write = function(command, data) {
    console.log("Command: \"" + command + "\"");
    if (data)
        console.log("Data: \"" + data + "\"");

    fs.appendFile(fifo_file, command + ":" + data, function (err) {
    });
};

exports.scroll = function(mode) {
    if (mode == "auto")
        write("scroll-auto");
    if (mode == "left")
        write("scroll-left");
    if (mode == "right")
        write("scroll-right");
    if (mode == "none")
        write("scroll-none");
};

exports.text = function(data, includeTime) {
    if (includeTime == true)
        write("text-time", data);
    else
        write("text", data);
};

exports.time = function(format) {
    write("time", format);
};

exports.reset = function() {
    exports.scroll("none");
    exports.text("");
};

