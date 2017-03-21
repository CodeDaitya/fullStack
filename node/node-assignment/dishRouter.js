module.exports = {
	op: function(route){
		if(route=='/'){
			.all(function(req, res, next){
				res.writeHead(200, {"Content_Type": "text/html"});
				next();
			})
			.get(function(req, res, next){
				res.end("Sends all the dishes");
			})
			.post(function(req, res, next){
				res.end("Adds the dish "+req.body.name+" with details "+req.body.description);
			})
			.delete(function(req, res, next){
				res.end("Deletes all the dishes");
			});
		}
		if(route==':/dishId'){
			.get(route, function(req, res, next){
				res.end("Sends the dish "+req.params.route+'\n');
			})
			.put(route, function(req, res, next){
				res.end("Updating the dish "+req.params.route+'\n');
			})
			.delete(route, function(req, res, next){
				res.end("Deleting dish: "+req.params.route);
			});
		}
	},
	dish: express.Router()
}
