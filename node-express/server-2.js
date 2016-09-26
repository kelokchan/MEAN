var express = require('express');
var morgan = require('morgan'); //for cmd logging purpose

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev')); //pre-formatted log output for morgan

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function () {
	console.log(`Server running at http://${hostname}:${port}/`);
})