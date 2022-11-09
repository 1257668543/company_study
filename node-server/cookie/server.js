const http = require('http');

const server = http.createServer((req, rep) => {
  // 设置cookie，制定cookie
  // 字段名为SSID
  // 有效期：Wed, 13-Jan-2023 22:23:01 GMT
  // 生效目录：/d
  // 并设置为httpOnly
  rep.setHeader('Set-Cookie', [
    `SSID=Ap4GTEq; Expires=Wed, 13-Jan-2023 22:23:01 GMT; path=/d; HttpOnly;`
  ])
  // 拼接响应主体
  rep.write('hello world');
  rep.end();
});

server.listen(1000);