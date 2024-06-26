const url = require('url');
const { StringDecoder } = require('string_decoder')

const handler = {};

handler.handleResreq = (req, res) => {

    const parseURL = url.parse(req.url);
    const pathName = parseURL.pathname;
    const trimPath = pathName.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObj = parseURL.query;
    const headersObj = req.headers;

    const decoder = new StringDecoder('utf-8');
    let realData = '';


    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    })

    req.on('end', () => {
        realData += decoder.end();
    })
}
module.exports = handler;
