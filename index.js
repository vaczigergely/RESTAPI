const http = require('http');
const url = require('url');

const server = http.createServer((req,res) => {

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const methos = req.method.toLocaleLowerCase();
    const queryStringObject = parsedUrl.query;

    res.end('Hello world!\n');

    console.log('Request received on path: ' + trimmedPath);
})

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
})