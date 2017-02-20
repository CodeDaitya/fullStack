var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var dishRouter = require('./dishRouter.js');
var leaderRouter = require('./leaderRouter,js');
var promoRouter = require('./promoRouter');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

dishRouter.dish.route('/')
dishRouter.op('/');

dishRouter.dish.route(':/dishId')
dishRouter.op(':/dishId');

app.use('/dishes', dishRouter.dish);

leaderRouter.leader.route('/')
leaderRouter.op('/');

leaderRouter.leader.route(':/leaderId')
leaderRouter.op(':/leaderId');

app.use('/leaders', leaderRouter.leader);

promoRouter.promo.route('/')
promoRouter.op('/');

promoRouter.promo.route(':/promoId')
promoRouter.op(':/promoId');

app.use('/promotion', promoRouter.promo);

app.use(express.static(__dirname+'./public'));

app.listen(port, hostname, function(){
	console.log('Server running at http://${hostname}:${port}/');
});
