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

exports.trimText = function(text, length) {
    if (!text)
        return text;

    var trimmed = text.substring(0, length);

    if (text.length > trimmed.length)
        return trimmed + "...";
    else
        return trimmed;
};

exports.bitValues = function(array) {
    var val = 0;

    if (array) {
        for(var i = 0; i < array.length; i++) {
            if (array[i])
                val |= 1 << i;
        }
    }

    return val;
}

exports.bitArray = function(mask, bits) {
    var res = [];

    for (var i = 0; i < bits; i++) {
        res.push((mask & (1 << i)) != 0 ? true : false);
    }

    return res;
}

exports.safeValue = function(value, defaultValue) {
    var result = defaultValue;

    if (typeof(value) !== 'undefined')
        result = value;

    return result;
}

