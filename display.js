var fs = require('fs');
var iconv = new require('iconv').Iconv('utf-8', 'iso-8859-1');

var fifo_file = "/tmp/matrix_display";

var write = function(command, data) {
    console.log("Command: \"" + command + "\"");
    if (data) {
        console.log("Data");
        console.log(data);
    } else {
        data = "";
    }

    // our display expects stuff to be iso-8859-1
    var payload = iconv.convert(command + ":" + data);

    fs.appendFile(fifo_file, payload, function (err) {
        if (err)
            console.log("Error while writing to display: " + err);
    });

    console.log("End command");
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

