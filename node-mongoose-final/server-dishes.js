var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	// we're connected!
	console.log("Connected correctly to server");

	// create a new dish
	Dishes.create({
		name: 'Uthapizza',
		image: 'images/uthapizza.png',
		category: 'mains',
		label: 'Hot',
		price: '4.99',
		description: 'Test',
		comments: [
			{
				rating: 5,
				comment: 'Imagine all the eatables, living in conFusion!',
				author: 'John Lemon'
			},
			{
				rating: 4,
				comment: 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
				author: 'Paul McVites'
			}]
	}, function (err, dish) {
		if (err) throw err;
		console.log('Dish created!');
		console.log(dish);

		var id = dish._id;

		// get all the dishes
		setTimeout(function () {
			Dishes.findByIdAndUpdate(id, {
					$set: {
						description: 'Updated Test'
					}
				}, {
					new: true
				}) //params: id, update, option. returns query, no execution
				.exec(function (err, dish) { //.exec is another way for callback by executing the query above
					if (err) throw err;
					console.log('Updated Dish!');
					console.log(dish);

					dish.comments.push({
						rating: 5,
						comment: 'I\'m getting a sinking feeling!',
						author: 'Leonardo di Carpaccio'
					});

					dish.save(function (err, dish) {
						console.log('Updated Comments!');
						console.log(dish);

						db.collection('dishes').drop(function () {
							db.close();
						});

					});
				});
		}, 1000);
	});
});