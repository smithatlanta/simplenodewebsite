var userProvider = require('../models/userProvider').userProvider;
var userProvider = new userProvider();
var user = require('../models/userProvider').User;

exports.addSesssion =  function(req, res){
    req.flash('warn', 'Please Sign In.');
    res.render('index', { title: 'NodeTestWebsite', redir: req.query.redir, message: req.flash('warn') });
};

exports.removeSesssion =  function(req, res){
    delete req.session.user;
    req.flash('warn', 'Successfully Signed Out.');
    res.render('index', { title: 'NodeTestWebsite', redir: req.query.redir, message: req.flash('warn') });
};

exports.insertSesssion =  function(req, res){
    userProvider.authenticate(req.body.login, req.body.password, function(user) {
        if (user) {
            req.session.user = user;
            res.redirect(req.body.redir || '/ratings/new');
        } else {
            req.flash('warn', 'Sign In failed. Please try again.');
            res.render('index', { title: 'NodeTestWebsite', redir: req.body.redir, message: req.flash('warn') });
        }
    });
};