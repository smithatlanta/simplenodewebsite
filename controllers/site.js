var siteProvider = require('../models/siteProvider').siteProvider;
var siteProvider = new siteProvider();
var moment = require('moment');

exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.searchRatings =  function(req, res){
    siteProvider.searchRatings(req.body, function(ratings){
        var out = [];
        for(var x=0; x< ratings.length;x++)
        {
            var rating = {};
            rating.reviewdate = moment(ratings[x].reviewdate).format('L');
            rating.notes = ratings[x].notes;
            rating.rating = ratings[x].rating;
            rating.restaurant = ratings[x].restaurant;
            rating.reviewer = ratings[x].reviewer;
            rating.id = ratings[x]._id;

            out.push(rating);

        }
        res.json(out);
    });
};

exports.getRating = function(req, res){
    siteProvider.getRating(req.params.id, function(rating){
        res.json(rating);
    });
};

exports.getRatings = function(req, res){
    siteProvider.getRatings(function(ratings){
        var out = [];
        for(var x=0; x< ratings.length;x++)
        {
            var rating = {};
            rating.reviewdate = moment(ratings[x].reviewdate).format('L');
            rating.notes = ratings[x].notes;
            rating.rating = ratings[x].rating;
            rating.restaurant = ratings[x].restaurant;
            rating.reviewer = ratings[x].reviewer;
            rating.id = ratings[x]._id;

            out.push(rating);

        }
        res.json(out);
    });
};

exports.insertRating = function(req, res){
    siteProvider.insertRating(req.body, function(rating){
        res.json(rating);
    });
};

exports.updateRating = function(req, res){
    siteProvider.updateRating(req.body, function(success){
        res.json(success);
    });
};

exports.deleteRating = function(req, res){
    siteProvider.deleteRating(req.params.id, function(success){
        res.json(success);
    });
};

