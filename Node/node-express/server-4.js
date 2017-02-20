var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

var dishRouter = express.Router();

dishRouter.use(bodyParser.json);

dishRouter.route('/')

.all(function(req, res, next){
	res.writeHead(200, {'Content_Type':'text/html'});
	next();
})

.get(function(req, res, next){
	res.end('Sends all the dishes');
})

.post(function(req, res, next){
	res.end('Adds the dish: '+res.body.name+' with details: '+res.body.description);
})

.delete(function(req, res, next){
	res.end('Deletes all the dishes!!');
});

dishRouter.route('/:dishId')

.get('/:dishId', function(req, res, next){
	res.end('Send the dish: '+res.params.dishId+' to you');
})

.put('/:dishId', function(req, res, next){
	res.write('Updating  the dish: '+res.params.dishId+'\n')
})

.delete('/:dishId', function(req, res, next){
	res.end('Deleting dish: '+res.params.dishId);
});

app.use('/dishes', dishRouter);

app.use(express.static(__dirname+'./public'));

app.listen(port, hostname, function(){
	console.log('Server running at http://${hostname}:${port}/');
});
