var mongoose = require('mongoose');
var assert = require('assert');

var Leaders = require('./models/leaderships');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	// we're connected!
	console.log("Connected correctly to server");

	// create a new leader
	Leaders.create({
		name: 'Peter Pan',
		image: 'images/alberto.png',
		designation: "Chief Epicurious Officer",
		abbr: "CEO",
		description: "Our CEO, Peter, . . ."
	}, function (err, leader) {
		if (err) throw err;
		console.log('Leader created!');
		console.log(leader);

		var id = leader._id;

		// get all the Leaders
		setTimeout(function () {
			Leaders.findByIdAndUpdate(id, {
				$set: {
					description: 'Updated Test'
				}
			}, {
				new: true
			}) //params: id, update, option. returns query, no execution
				.exec(function (err, leader) { //.exec is another way for callback by executing the query above
				if (err) throw err;
				console.log('Updated Leader!');
				console.log(leader);

				db.collection('leaders').drop(function () {
					db.close();
				});
			});
		}, 1000);
	});
});