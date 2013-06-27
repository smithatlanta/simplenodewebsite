  function setDevelopmentConfig(){
	DatabaseConfig.port = 27017;
    DatabaseConfig.host = 'localhost';
    DatabaseConfig.name = 'ratingstest';
    DatabaseConfig.user = '';
    DatabaseConfig.pass = '';
	
    EnvConfig.port = 3000;
}

function setProductionConfig(){
    DatabaseConfig.port = 37817;
    DatabaseConfig.host = 'ds037817.mongolab.com';
    DatabaseConfig.name = 'ratingstest';
    DatabaseConfig.user = 'rate';
    DatabaseConfig.pass = 'rate1234';

    EnvConfig.port = 80;
}

var DatabaseConfig = {
    port        : Number,
    host        : String,
    name        : String,
    user        : String,
    pass        : String
};

var EnvConfig = {
    port        : Number,
    dirname     : String,
    address  : String
};

module.exports.DatabaseConfig = DatabaseConfig;
module.exports.EnvConfig = EnvConfig;
module.exports.setDevelopmentConfig = setDevelopmentConfig;
module.exports.setProductionConfig = setProductionConfig;