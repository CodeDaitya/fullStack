var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');
var Verify = require('./verify');

var app = express();
var dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')

.get(Verify.verifyOrdinayUser, function(req,res,next){
	Dishes.find({}, function(err, dish){
		if(err) throw err;
		res.json(dish);
	});
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	Dishes.create(req.body, function(err, dish){
		if(err) throw err;
		console.log('Dish created!');
		var id = dish._id;

		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Added the dish with id '+id);
	});
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	Dishes.remove({}, function(err, resp){
		if(err) throw err;
		res.json(resp);
	});
});

dishRouter.route(':/dishId')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;
		res.json(dish);
	});
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body},
		{new: true}, function(err, dish){
			if(err) throw err;
			res.json(dish);	
		});
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	Dishes.findByIdAndRemove(req.params.dishId, function(err, resp){
		if(err) throw err;
		res.json(resp);
	});
});

dishRouter.route('/:dishId/comments')
.get(Verify.verifyOrdinaryUser, function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;
		res.json(dish.comments);
	});
})

.post(Verify.verifyOrdinaryUser, function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;
		dish.push(req.body);
		dish.save(function(err, dish){
			if(err) throw err;
			res.json(dish);
		});
	});
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;
		for(var i = comments.length-1; i>=0; --i)
			dish.comments.id(comments[i]._id).remove();

		dish.save(function(err, result){
			if(err) throw err;
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('Deleted all comments!');
		});
	});
});

dishRouter.route('/:dishId/comments/:commentId')
.get(Verify.verifyOrdinaryUser, function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;
		res.json(dish.comments.id(req.params.commentId));
	});
})

.put(Verify.verifyOrdinaryUser, function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;

		dish.comments.id(req.params.id).remove();
		dish.comments.push(req.body);
		dish.save(function(err, dish){
			if(err) throw err;
			console.log('Updated the comments!')
			res.json(dish);
		});
	});
})

.delete(Verify.verifyOrdinaryUser, function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;
		dish.comments.id(req.params.commentId).remove();

		dish.save(function(err, result){
			if(err) throw err;
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('Deleted all comments!');
		});
	});
});

app.use('/dishes',dishRouter);

module.exports = dishRouter;
