var fs = require('fs');

var count = 0;
var file = fs.readFileSync('../NodeREADME.md');
var l = file.length;
var flag = 0;

for(var i = 0; i!=l; ++i){
  // if(flag==1){
  //   flag = 0;
  //   if(fStr[i]=='n'){
  //     count++;
  //   }
  // }
  cStr = file.toString('utf-8', i, i+2);

  if(cStr=='\\n')
    ++count;
}
console.log(count);