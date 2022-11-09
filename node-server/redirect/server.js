const http = require('http');

const server = http.createServer((req, rep) => {
  // redirect statusCode: 301 / 302
  rep.statusCode = 301;

  // set redirect location to xxx.xxx.xxx
  rep.setHeader('Location', 'https://www.baidu.com');

  rep.end();
});

server.listen(1000);