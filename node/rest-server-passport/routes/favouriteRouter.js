var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favourites = require('../models/favourites');
var Verify = require('./verify');

var app = express();
var favouriteRouter = express.Router();

favouriteRouter.use(bodyParser.json());

favouriteRouter.route('/')
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next){
	Favourites.findOne({user: req.decoded._doc._id}).
	populate('favourites.user').
	exec(function(err, user){
		if (err) throw err;

		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(user);

		Favourites.findOne({user: req.decoded._doc._id}).
		populate('favourites.favourite').
		exec(function(err, favourites){
			res.end(favourites);
		});
	});
})
.post(function(req, res, next){
	Favourites.findOne({user: req.decoded._doc._id}, function(err, favourites){
		if (err) {
			favourite = new Favourites;
			favourites.user.push(req.decoded._doc._id);
			favourites.favourite.push([]);
		}

		var favLen = favourites.favourite.length;
		var fav = favourites.favourite;
		var flag = 0;
		for(var i = 0; i < favLen; ++i) {
			if( fav[i] === req.body._id) {
				flag = 1;
				break;
			}
		}

		if (flag === 1) {
			fav.push(req.body._id);
			fav.save(function(err, favr){
				if (err) throw err;
				res.json(favr);
			});
		}
	});
})
.delete(function(req, res, next){
	Favourites.remove({user: req.decoded._doc._id}, function(err, resp){
		if (err) throw err;
		res.json(resp);
	});
});

favouriteRouter.route('/:dishObjectId')
.delete(Verify.verifyOrdinaryUser, function(req, res, next){
	Favourites.findOne({user: req.decoded._doc._id}, function(err, favourites){
		favourites.remove({favourite: req.params.dishObjectId}, function(err, resp){
			if (err) throw err;

			favourites.save(function(err, result){
				if (err) throw err;
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end('Favourite deleted!');
			});
		});
	});
});

app.use('/favourites',  favouriteRouter);
module.exports = favouriteRouter;
