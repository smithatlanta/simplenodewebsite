  function setDevelopmentConfig(){
    DatabaseConfig.port = 31978;
    DatabaseConfig.host = 'ds031978.mongolab.com';
    DatabaseConfig.name = 'ratingstest';
    DatabaseConfig.user = 'rate';
    DatabaseConfig.pass = 'rate1234';

    EnvConfig.port = 3000;
}

function setProductionConfig(){
    DatabaseConfig.port = 31978;
    DatabaseConfig.host = 'ds031978.mongolab.com';
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