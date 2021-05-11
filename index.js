const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer((req,res) => {

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    const method = req.method.toLocaleLowerCase();
    const queryStringObject = parsedUrl.query;
    const headers = req.headers;

    const decoder = new StringDecoder('utf-8');
    const buffer = '';
    req.on('data', data => {
        buffer += decoder.write(data)
    });
    req.on('end', () => {
        buffer += decoder.end();

        res.end('Hello world!\n');
        console.log('Request received on path: ' + trimmedPath);
    });
})

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
})