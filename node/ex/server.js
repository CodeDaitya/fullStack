var http = require('http');
var url = require('url');

function start(route, handle){
  var server =  http.createServer(function(req, res){
    var postData = "";
    var pathname = url.parse(req.url).pathname;
    console.log("Request for "+pathname+" recieved.");

    req.setEncoding("utf8")

    req.addListner("data", function(postDataChunk){
      postData += postDataChunk;
      console.log("Recieved POST data chunk '"+postDataChunk+"'.");
    });

    req.addListner("end", function(){
      route(handle, pathname, res, postData);
    });
  });

  server.listen(3000, function(){
    console.log("Server started!");
  });
}

exports.start = start;
