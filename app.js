
/**
 * Module dependencies.
 */

var express = require('express'),
  home = require('./routes/index'),
  recommendations = require('./routes/recommendations'),
  http = require('http'),
  path = require('path');

var app = express();

// all environments
app.locals.pretty = true;
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', home.index);
app.get('/recommendations/', recommendations.list)
app.get('/recommendations/:slug', recommendations.view);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
