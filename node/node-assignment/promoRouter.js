module.exports = {
	op: function(route){
		if(route=='/'){
			.all(function(req, res, next){
				res.writeHead(200, {"Content_Type": "text/html"});
				next();
			})
			.get(function(req, res, next){
				res.end("Sends all the promotions");
			})
			.post(function(req, res, next){
				res.end("Adds the promotion "+req.body.name+" with details "+req.body.description);
			})
			.delete(function(req, res, next){
				res.end("Deletes all the promotions");
			});
		}
		if(route==':/promotionId'){
			.get(route, function(req, res, next){
				res.end("Sends the promotion "+req.params.route+'\n');
			})
			.put(route, function(req, res, next){
				res.end("Updating the promotion "+req.params.route+'\n');
			})
			.delete(route, function(req, res, next){
				res.end("Deleting promotion: "+req.params.route);
			});
		}
	},
	promo: express.Router()
}
