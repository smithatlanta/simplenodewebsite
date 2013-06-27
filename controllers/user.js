var userProvider = require('../models/userProvider').userProvider;
var userProvider = new userProvider();
var user = require('../models/userProvider').User;

exports.authenticate = function(req,res){
    var userpass = req.headers.authorization.split(':');
    userProvider.authenticate(userpass[0], userpass[1], null, function(data){
        if(data === null){
            res.send(401);
        }
        else{
            res.json(data);
        }
    });
};

exports.authenticateSession = function(req,res, callback){
    var userpass = req.headers.authorization.split(':');
    userProvider.authenticate(userpass[0], userpass[1], userpass[2], function(data){
        callback(data);
    });
};


exports.getUser = function(req, res){
    userProvider.getUser(req.params.id, function(user){
        res.json(user);
    });
};

exports.getUsers = function(req, res){
    userProvider.getUsers(function(users){
        res.json(users);
    });
};

exports.insertUser = function(req, res){
    userProvider.insertUser(req.body, function(user){
        res.json(user);
    });
};

exports.updateUser = function(req, res){
    userProvider.updateUser(req.body.id, req.body.user, function(success){
        res.json(success);
    });
};

exports.deleteUser = function(req, res){
    userProvider.deleteUser(req.params.id, function(success){
        res.json(success);
    });
};