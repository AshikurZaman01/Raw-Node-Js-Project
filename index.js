
const http = require('http');
const { parse } = require('path');
const url = require('url');


const app = {}

app.config = {
    port: 3000
}

app.createServer = () => {

    const server = http.createServer(app.handleResreq);

    server.listen(app.config.port, () => {
        console.log(`Server running at http://localhost:${app.config.port}/`);
    })
}

app.handleResreq = (req, res) => {

    const parseURL = url.parse(req.url);
    const pathName = parseURL.pathname;
    const trimPath = pathName.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObj = parseURL.query;
    const headersObj = req.headers;

    console.log(headersObj);



    res.end('Hello World\n');
}

app.createServer();