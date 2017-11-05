var i = 2;
var sum = 0;
var l = process.argv.length;
for(; i<l; i++){
  sum += Number(process.argv[i]);
}
console.log(sum);