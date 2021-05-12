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

        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        const data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        };

        chosenHandler(data, (statusCode, playload) => {
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            payload = typeof(payload) == 'object' ? payload : {};
            const payloadString = JSON.stringify(payload);

            res.writeHead(statusCode);
            res.end(payloadString);

            console.log(statusCode, payloadString);
        });
    });
})

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
})

const handlers = {}
handlers.sample = (data, callback) => {
    callback(406,{'name' : 'sample handler'});
};
handlers.notFound = (data, callback) => {
    callback(404);
};

const router = {
    'sample' : handlers.sample
}