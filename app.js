var express = require('express'),
  path = require('path'),
  config = require('./config/config'),
  flash = require('connect-flash'),
  fs = require('fs'),
  MongoStore = require('connect-mongo')(express);

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
  app.use(express.session({
    secret:"silverscreen2012",
    maxAge: new Date(Date.now() + 3600000),
    store: new MongoStore({host: config.DatabaseConfig.host, port: config.DatabaseConfig.port, db: config.DatabaseConfig.name, collection: "session", username: config.DatabaseConfig.user, password: config.DatabaseConfig.pass, auto_reconnect: true })
  }));
  app.use(flash());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.listen(process.env.port || config.EnvConfig.port);
console.log("Express server listening on port " + config.EnvConfig.port);

module.exports.app = app;
routes = require('./routes/route');