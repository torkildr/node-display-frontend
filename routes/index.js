exports.index = function(req, res){
  res.render('index', { title: 'Main' })
};

exports.texts = function(req, res){
  res.render('texts', { title: 'List of texts' })
};

