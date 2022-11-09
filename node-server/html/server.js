const http = require('http')

const server = http.createServer((request, response) => {
    /**解析请求报文 */
    const headers = []
    request.rawHeaders.forEach((key, index) => {
        if (index % 2 === 0) {
            headers.push(`${key}:${request.rawHeaders[index + 1]}`)
        }
    });

    /**处理响应报文 */
    response.setHeader('Content-Type', ' text/html') // 设置响应头，告诉浏览器返回数据主体是html类型
    // 拼接响应数据主体
    response.write(`
        <html>
        <head>
          <meta charset="utf-8" />
                <title>hello world</title>
        </head>
        <body>
                hello world
                <br><br>
                起始行<br>${request.method}  ${request.url}  ${request.httpVersion}<br><br>
                请求头<br>${headers.join('<br>')}
        </body >
        </html > `
    )
    response.end()
})
server.listen(1000)
