var images = require('../data/hello-kitty.json')

exports.index = function(req, res){
  res.render('playground/index', {
    images: images
  });
};