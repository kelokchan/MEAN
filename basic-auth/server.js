var express = require('express');
var morgan = require('morgan'); //for cmd logging purpose

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev')); //pre-formatted log output for morgan

function auth(req, res, next) {
	console.log(req.headers);

	var authHeader = req.headers.authorization;

	if (!authHeader) {
		var err = new Error('You are not authenticated!');
		err.status = 401;
		next(err); //raise error automatically. any function handling the error will be run
		return;
	}

	var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':'); //Basic username:password encoded in base64
	var user = auth[0];
	var pass = auth[1];

	if (user == 'admin' && pass == 'password') {
		next();
	} else {
		var err = new Error('You are not authenticated!');
		err.status = 401;
		next(err);
	}
}

app.use(auth); //apply auth as middleware

app.use(express.static(__dirname + '/public'));

app.use(function (err, req, res, next) { //middleware to handle errors
	res.writeHead(err.status || 500, {
		'WWW-Authenticate': 'Basic',
		'Conent-Type': 'text/plain'
	});
	res.end(err.message); 
});

app.listen(port, hostname, function () {
	console.log(`Server running at http://${hostname}:${port}/`);
})