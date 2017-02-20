var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('./dishes', function(req, res, next){
	res.writeHead(200, {'Content_Type':'text/html'});
	next();
});

app.get('./dishes', function(req, res, next){
	res.end('Sends all the dishes');
});

app.post('./dishes', function(req, res, next){
	res.end('Adds the dish: '+res.body.name+' with details: '+res.body.description);
});

app.delete('./dishes', function(req, res, next){
	res.end('Deletes all the dishes!!');
});

app.get('./dishes', function(req, res, next){
	res.end('Send the dish: '+res.params.dishId+' to you');
});

app.put('./dishes/:dishId', function(req, res, next){
	res.write('Updating  the dish: '+res.params.dishId+'\n')
});

app.delete('./dishes/:dishId', function(req, res, next){
	res.end('Deleting dish: '+res.params.dishId);
});

app.use(express.static(__dirname+'./public'));

app.listen(port, hostname, function(){
	console.log('Server running at http://${hostname}:${port}/');
});
