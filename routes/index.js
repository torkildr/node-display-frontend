var post = require('./post');

exports.index = function(req, res){
    if (req.body)
        post.handleIndex(req.body);

    res.render('index', { title: 'Main' });
};

exports.texts = function(req, res){
    var data = {
        texts: ["foo", "bar"]
    }

    res.render('texts', { title: 'List of texts', data: data });
};

