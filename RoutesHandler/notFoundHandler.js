
const handler = {}

handler.notFoundHandler = (requestProperties, callback) => {

    callback(200, {
        message: 'This is not a valid route'
    })

}

module.exports = handler;