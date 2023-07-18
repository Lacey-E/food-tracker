const createError = require('http-errors')

const notFound = (req, res, next) => {
    next(createError(404, 'Router not found!'))
}

const handleErrors = (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
}

module.exports = {notFound, handleErrors}