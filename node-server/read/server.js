const http = require('http');

const server = http.createServer((req, rep) => {
  // 解析参数
  const urlObj = new URL(`http://${req.headers.host}${req.url}`);
  const userId = urlObj.searchParams.get('id');

  // 到数据库的User表查找指定id的记录
  const userInfo = findUser(userId);

  // 设置返回数据主体为JSON格式
  rep.setHeader('Content-Type', 'application/json; charset=utf-8');

  rep.write(JSON.stringify({
    code: 0,
    data: userInfo,
    msg: 'success'
  }))
  rep.end();
});

const findUser = (userId) => {
  return ({
    id: userId,
    name: 'Cendre',
    age: 8
  });
}

server.listen(1000);