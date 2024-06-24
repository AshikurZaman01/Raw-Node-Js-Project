
const http = require('http');
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


    const parseURL = url.parse(req.url, true);
    const pathName = parseURL.pathname;

    console.log(pathName)


    res.end('Hello World\n');
}

app.createServer();