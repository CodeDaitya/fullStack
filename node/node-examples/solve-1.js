var rect = require('./rectangle-1');

function solveRect(l, b){
        if(l<0||b<0){
                console.log("The rectangle dimensions should be greater than zero: l = "+l+", b = "+b+".");
        }
        else{
                console.log("Calculating area and perimeter of the rectangle.");
                console.log("The area of the rectangle is "+rect.area(l, b)+" and its perimeter is "+rect.perimeter(l, b)+".");
	}
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(-3, 5);
