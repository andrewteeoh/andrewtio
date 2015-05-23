var recommendations = require('../data/recommendations-index.json'),
    anime = require('../data/anime.json');

/*
 * Recommendations list
 */

exports.list = function(req, res){
  res.render('recommendations/list', {
    recommendations: recommendations
  });
};

/*
 *
 */
 exports.view = function(req, res){
  res.render('recommendations/view', {
    anime: anime
  });
 }