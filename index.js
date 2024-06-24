//Dependencies
const http = require('http');

//app - Object
const app = {}

//cofiguration
app.config = {
    port: 3000
}

app.createServer = () => {

    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`Listening to port ${app.config.port}`)
    })

}

app.handleReqRes = (req, res) => {
    res.end('Hello World');
}

app.createServer();