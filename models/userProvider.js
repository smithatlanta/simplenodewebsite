var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var User = new Schema({
    login: {
        type: String,
        index: true
    },
    password: {
        type: String,
        index: true
    },
    role: {
        type: String
    }
});

mongoose.model('User',User, 'user');

var User = mongoose.model('User');

userProvider = function(){};

userProvider.prototype.authenticate = function(login, password, callback) {
        User.findOne({
            login: login,
            password: password
        },
        function(err, doc) {
            callback(doc);
        });
    };

exports.userProvider=userProvider;