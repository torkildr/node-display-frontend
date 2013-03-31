function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

exports.convertToSeconds = function(hour, minute, second) {
    return (parseInt(hour) * 60 * 60) + (parseInt(minute) * 60) + parseInt(second);
};

exports.convertToTime = function(seconds) {
    var hour = parseInt(seconds / (60 * 60));
    var minute = parseInt(seconds / 60) % 60;
    var second = seconds % 60;

    return pad(hour, 2) + ":" + pad(minute, 2) + ":" + pad(second, 2);
};

