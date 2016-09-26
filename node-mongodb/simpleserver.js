var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
//Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
	assert.equal(err, null); //test to see if error equals null
	console.log("Connected correctly to server");
	var collection = db.collection("dishes");
	collection.insertOne({
		name: "Uthapizza",
		description: "test"
	}, function (err, result) { //callback
		assert.equal(err, null);
		console.log("After Insert:");
		console.log(result.ops);
		collection.find({}).toArray(function (err, docs) { //callback
			assert.equal(err, null);
			console.log("Found:");
			console.log(docs);
			db.dropCollection("dishes", function (err, result) { //callback
				assert.equal(err, null);
				console.log("Dropped Collection");
				db.close();
			});
		});
	});
});