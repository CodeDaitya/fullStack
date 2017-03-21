
function start(res){
  console.log("Request handler 'start' was called.");

  var body =  '<html>'+
              '<head>'+
              '<meta http-equiv="Content-Type" content="text/html; '+
              'charset=UTF-8" />'+
              '</head>'+
              '<body>'+
              '<form action="/auth" method="post">'+
              '<label for=usr>Admin</label>'+
              '<input name="username" type="text" id="usr"><br>'+
              '<label for="pass">Password</label>'+
              '<input type="password" name="password" id="pass"><br>'+
              '<input type="submit" name="submit" value="Login" />'+
              '</form>'+
              '</body>'+
              '</html>';

    res.writeHead(200, {'Content-Type':'text/html'});
    res.write(body);
    res.end();
}

function upload(res){
  console.log("Request handler 'upload' was called.");
  res.writeHead(200, {'Content-Type':'text/html'});
  res.write('Hello Upload');
  res.end();
}

exports.start = start;
exports.upload = upload;
