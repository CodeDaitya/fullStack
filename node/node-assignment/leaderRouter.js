module.exports = {
	op: function(route){
		if(route=='/'){
			.all(function(req, res, next){
				res.writeHead(200, {"Content_Type": "text/html"});
				next();
			})
			.get(function(req, res, next){
				res.end("Sends all the leaders");
			})
			.post(function(req, res, next){
				res.end("Adds the leader "+req.body.name+" with details "+req.body.description);
			})
			.delete(function(req, res, next){
				res.end("Deletes all the leaders");
			});
		}
		if(route==':/leaderId'){
			.get(route, function(req, res, next){
				res.end("Sends the leader "+req.params.route+'\n');
			})
			.put(route, function(req, res, next){
				res.end("Updating the leader "+req.params.route+'\n');
			})
			.delete(route, function(req, res, next){
				res.end("Deleting leader: "+req.params.route);
			});
		}
	},
	leader: express.Router()
}
