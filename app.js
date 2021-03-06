var express = require('express'),
  path = require('path'),
  config = require('./config/config'),
  fs = require('fs');

var app = module.exports = express();

app.configure('development', function(){
  config.setDevelopmentConfig();
  config.EnvConfig.dirname = __dirname;
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  config.setProductionConfig();
  config.EnvConfig.dirname = __dirname;
  app.use(express.errorHandler());
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('keyboard cat'));
  app.use(express.static(__dirname +'/public'));
  app.use(app.router);
});

app.listen(process.env.port || config.EnvConfig.port);
console.log("Express server listening on port " + config.EnvConfig.port);

module.exports.app = app;
routes = require('./routes/route');