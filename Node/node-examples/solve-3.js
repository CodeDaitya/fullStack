var argv = require('yargs')
	.usage('Usage: $0 --l=[num] --b=[num]')
	.demand(['l', 'b'])
	.argv;

var rect = require('./rectangle-2');

function solveRect(l, b){
	console.log("Solving for rectangle with l ="+l+", and b = "+b+".");
	rect(l, b, function(err, rectangle){
		if(err){
			console.log(err);
		}
		else{
			console.log("The area of the rectangle is "+rectangle.area()+".");
			console.log("The perimeter of the rectangle is "+rectangle.perimeter()+".");
		}
	});
};

solveRect(argv.l, argv.b);
