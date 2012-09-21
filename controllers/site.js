var siteProvider = require('../models/siteProvider').siteProvider;
var siteProvider = new siteProvider();

exports.index = function(req, res){
    siteProvider.newRating(function(rating){
        res.render('ratings/new', { title: 'NodeTestWebsite', rating: rating});
    });
};

exports.searchRatings =  function(req, res){
    var ratings = new Object();
    res.render('ratings/index', { title: 'NodeTestWebsite', ratings: ratings, query: req.query });
};

exports.searchRatingsData =  function(req, res){
    siteProvider.searchRatings(req.query, false, 'search', function(ratings){
        res.json(ratings);
    });
};

exports.addRating =  function(req, res){
    siteProvider.newRating(function(rating){
        res.render('ratings/new', { title: 'NodeTestWebsite', rating: rating});
    });
};

exports.editRating =  function(req, res){
    siteProvider.getRating(req.params.id, function(rating){
        res.render('ratings/edit', { title: 'NodeTestWebsite', rating: rating, id: req.params.id});
    });
};

exports.viewRating =  function(req, res){
    siteProvider.getRating(req.params.id, function(rating){
        res.render('ratings/view', { title: 'NodeTestWebsite', rating: rating, id: req.params.id});
    });
};

exports.getReviewers =  function(req, res){
    if(req.session.reviewers === undefined) {
        siteProvider.getReviewers(function(reviewers){
            req.session.reviewers = reviewers;
            res.json(reviewers);
        });
    }
    else
    {
        res.json(req.session.reviewers);
    }
};

exports.insertRating = function(req, res){
    siteProvider.insertRating(req.body.rating, function(id){
        siteProvider.newRating(function(rating){
            res.render('ratings/new', { title: 'NodeTestWebsite', rating: rating});
        });
    });
};

exports.updateRating = function(req, res){
    siteProvider.updateRating(req.body.id, req.body.rating, function(id){
        siteProvider.getRating(id, function(rating){
            res.render('ratings/edit', { title: 'NodeTestWebsite', rating: rating , id: id});
        });
    });
};

exports.approveRating = function(req, res){
    siteProvider.approveRating(req.params.id, function(id){
        res.redirect('admin');
    });
};

exports.deleteRating = function(req, res){
    siteProvider.deleteRating(req.params.id, function(success){
       res.redirect('search' + req._parsedUrl.search + "&collapsed=true");
    });
};

exports.getRating = function(req, res){
    siteProvider.getRating(id, function(rating){
        res.send(rating);
    });
};