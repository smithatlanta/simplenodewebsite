var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;


var User = new Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String,
        index: true
    },
    role: {
        type: String
    },
    added: {
        type: Date
    }
});

var bcrypt = require('bcrypt');

mongoose.model('User',User, 'user');

var User = mongoose.model('User');

userProvider = function(){};

userProvider.prototype.authenticate = function(username, password, unixoffset, callback) {
    if(unixoffset !== null)
    {
        var now = moment().valueOf();
        if(now > unixoffset)
        {
            callback(null);
        }
    }

    User.findOne({
        username: username
    },
    function(err, doc) {
        if(doc === null){
            callback(null);
        }
        else
        {
            if(compare(password, doc.password)){
                var user = {};
                // 1 day session
                //var nowplusone = moment().add('days', 1);
                var nowplusone = moment().add('seconds', 30);
                user.username = username;
                user.password = password;
                user.session = nowplusone.valueOf();
                callback(user);
            }
            else{
                callback(null);
            }
        }
    });
};

userProvider.prototype.getUsers = function(callback){
    User.find(function(err, users) {
        var userList = [];
        for(var x=0;x<users.length;x++){
            var user = {};
            user.username=users[x].username;

            userList.push(user);
        }
        callback(userList);
    });
};

userProvider.prototype.getUser = function(id, callback){
    User.findById(id, function(err, user) {
        callback(user);
    });
};

userProvider.prototype.insertUser = function(user, callback){
    var userToSave = new User();
    userToSave.username = user.username;
    userToSave.password = encryptPassword(user.password);
    userToSave.role = user.role;
    userToSave.added = new Date();

    userToSave.save(function(err) {
        if (err) {
          console.log(err);
          throw err;
        }
    });
    callback(user);
};

userProvider.prototype.updateUser = function(id, user, callback){
    User.findById(id, function(err, doc) {
        doc.username = user.username;
        doc.password = user.password;
        doc.role = user.role;

        doc.save(function(err) {
            if (err) {
                console.log(err);
                callback("false");
            }
        });
        callback("true");
    });
};

userProvider.prototype.deleteRating = function(id, callback){
    User.remove({_id: id}, function(err) {
        if (err) {
            console.log(err);
            callback("false");
        }
    });
    callback("true");
};

function compare(password, dbPassword){
    return bcrypt.compareSync(password, dbPassword);
}

function encryptPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

exports.userProvider=userProvider;