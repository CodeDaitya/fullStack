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
				res.end("Adds the leader "+res.body.name+" with details "+res.body.description);
			})
			.delete(function(req, res, next){
				res.end("Deletes all the leaders");
			});
		}
		if(route==':/leaderId'){
			.get(route, function(req, res, next){
				res.end("Sends the leader "+res.params.route+'\n');
			})
			.put(route, function(req, res, next){
				res.end("Updating the leader "+res.params.route+'\n');
			})
			.delete(route, function(req, res, next){
				res.end("Deleting leader: "+res.params.route);
			});
		}
	},
	leader: express.Router()
}
