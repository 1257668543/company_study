var http = require('http');
var fs = require('fs')

var server = http.createServer();

server.on('request', function(request, response) {
  fs.readFile('./temp.html',(err, data) => {
    response.setHeader('Content-type', 'text/html');
    if (!err) {
      response.end(data);
    } else {
      response.end('html not found');
    }
  });
});

server.listen(8000, () => {
  console.log('服务器启动成功在："http://127.0.0.1:8000/"')
})