var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Rating = new Schema({
	restaurant: String,
	reviewdate: Date,
	reviewer: String,
	rating: String,
	notes: String
});

mongoose.model('Rating',Rating, 'rating');

var Rating = mongoose.model('Rating');

siteProvider = function(){};

siteProvider.prototype.searchRatings = function(qry, callback){
	var query = Rating.find({}).sort({restaurant: 'asc'});

	var hasQueryString = false;
	if(qry.reviewdate !== "" && qry.reviewdate !== undefined){
		hasQueryString = true;
		var dateq = moment(qry.reviewdate).startOf('day').utc();
		query.where('reviewdate', dateq);
	}
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
			callback(ratings);
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


siteProvider.prototype.getRatings = function(callback){
	Rating.find(function(err, ratings) {
		callback(ratings);
	});
};

siteProvider.prototype.getRating = function(id, callback){
	Rating.findById(id, function(err, rating) {
		callback(rating);
	});
};

siteProvider.prototype.insertRating = function(rating, callback){
	var ratingToSave = new Rating();
	ratingToSave.restaurant = rating.restaurant;
	ratingToSave.reviewdate = moment(rating.reviewdate).startOf('day').utc();
	ratingToSave.reviewer = rating.reviewer;
	ratingToSave.rating = rating.rating;
	ratingToSave.notes = rating.notes;

    ratingToSave.save(function(err) {
        if (err) {
          console.log(err);
          throw err;
        }
    });
	callback(ratingToSave);
};

siteProvider.prototype.updateRating = function(rating, callback){
	Rating.findById(rating.id, function(err, doc) {
		doc.reviewdate = moment(rating.reviewdate).startOf('day').utc();
		doc.notes = rating.notes;
		doc.rating = rating.rating;
		doc.reviewer = rating.reviewer;
		doc.restaurant = rating.restaurant;

		doc.save(function(err) {
			if (err) {
				console.log(err);
				callback("false");
			}
		});
		callback("true");
	});
};

siteProvider.prototype.deleteRating = function(id, callback){
	Rating.remove({_id: id}, function(err) {
		if (err) {
			console.log(err);
			callback("false");
		}
	});
	callback("true");
};

exports.siteProvider=siteProvider;