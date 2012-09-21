var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Rating = new Schema({
	restaurant: String,
	date: Date,
	reviewer: String,
	rating: String,
	notes: String,
});

var Reviewer = new Schema({
	name: String,
});


mongoose.model('Rating',Rating, 'rating');
mongoose.model('Reviewer',Reviewer, 'reviewer');

var Rating = mongoose.model('Rating');
var Reviewer = mongoose.model('Reviewer');

siteProvider = function(){};

siteProvider.prototype.searchRatings = function(qry, pending, callee, callback){
	var query = Rating.find({}).sort({restaurant: 'asc'});

	var hasQueryString = false;
	if(qry.restaurant !== "" && qry.restaurant !== undefined){
		hasQueryString = true;
		var pattern = new RegExp(qry.restaurant, "i");
		query.regex('restaurant', pattern);
	}
	if(qry.notes !== "" && qry.notes !== undefined){
		hasQueryString = true;
		var pattern = new RegExp(qry.notes, "i");
		query.regex('notes', pattern);
	}
	if(qry.rating !== "" && qry.rating !== undefined){
		hasQueryString = true;
		var pattern = new RegExp(qry.rating, "i");
		query.regex('rating', pattern);
	}
	if(qry.reviewer !== "" && qry.reviewer !== undefined){
		hasQueryString = true;		
		query.where('reviewer', qry.reviewer);
	}

	if(hasQueryString) {
		query.exec(function(err, ratings){
			var arrRating = new Array();
			for(var ctr=0; ctr < ratings.length; ctr++) {
				var tmpDate = (ratings[ctr].date.getMonth()+1) + "/" + ratings[ctr].date.getDate() + "/" + ratings[ctr].date.getFullYear();
				arrRating.push([tmpDate, ratings[ctr].restaurant.replace(/(\|)/g, ","), ratings[ctr].rating, ratings[ctr].reviewer, ratings[ctr].notes, ratings[ctr]._id, ""]);
			}
			callback(arrRating);
		});
	}
	else{
		callback();
	}
};

siteProvider.prototype.newRating = function(callback){
	var rating = new Rating();
	rating.pending = "false";
	callback(rating);
};

siteProvider.prototype.getReviewers = function(callback){
	Reviewer.find({} , function(err, reviewers){
        reviewers.sort();
        callback(reviewers);
    });
};

siteProvider.prototype.getRating = function(id, callback){
	Rating.findById(id, function(err, rating) {
		callback(rating);
	});
};

siteProvider.prototype.insertRating = function(rating, callback){
	var ratingToSave = new Rating(rating);
    ratingToSave.save(function(err) {
        if (err) {
          console.log(err);
          throw err;
        }
    });
	callback(ratingToSave._id);
};

siteProvider.prototype.updateRating = function(id, rating, callback){
	Rating.findById(id, function(err, doc) {
		doc.date = rating.date;
		doc.notes = rating.notes;
		doc.rating = rating.rating;
		doc.reviewer = rating.reviewer;
		doc.restaurant = rating.restaurant;

		doc.save(function(err) {
			if (err) {
				console.log(err);
				throw err;
			}
		});
		callback(doc._id);
	});
};

siteProvider.prototype.deleteRating = function(id, callback){
	Rating.remove({_id: id}, function(err) {
		if (err) {
			console.log(err);
			throw err;
		}
	});
	callback("true");
};

exports.siteProvider=siteProvider;