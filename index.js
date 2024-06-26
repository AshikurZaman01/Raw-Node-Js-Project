
const http = require('http');
const fs = require('fs');
const url = require('url');


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


    res.end('hello world');
}

app.createServer();