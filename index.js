const http = require('http');
const fs = require('fs');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('./Routess');
const { notFoundHandler } = require('./RoutesHandler/notFoundHandler')


const app = {}
app.config = {
    port: 3000
}

app.createServer = () => {
    const server = http.createServer(app.handleResReq);
    server.listen(app.config.port, () => {
        console.log(`server is running on http://localhost:${app.config.port}`);
    })
}
app.handleResReq = (req, res) => {
    const parseURL = url.parse(req.url, true);
    const pathName = parseURL.pathname;
    const trimmedPathName = pathName.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObj = parseURL.query;
    const headersObj = req.headers;

    const requestProperties = {
        parseURL,
        pathName,
        trimmedPathName,
        method,
        queryStringObj,
        headersObj,
    }


    res.end('hello world');
    const decoder = new StringDecoder('utf-8');
    let realData = '';


    const choseHandler = routes[trimmedPathName] ? routes[trimmedPathName] : notFoundHandler;
    choseHandler(requestProperties, (statusCode, payload) => {

        statusCode = typeof (statusCode) == 'number' ? statusCode : 500;
        payload = typeof (payload) == 'object' ? payload : {};

        const payloadString = JSON.stringify(payload);

        res.writeHead(statusCode);
        res.end(payloadString);
    })


    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    })

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);

        res.end('hello world');

    })


}

app.createServer();