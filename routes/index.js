exports.index = function(req, res){
    res.render('index', { title: 'Main' });
};

exports.texts = function(req, res){
    var data = {
        texts: ["foo", "bar"]
    }

    res.render('texts', { title: 'List of texts', data: data });
};

