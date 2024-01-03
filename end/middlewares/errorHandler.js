const errorHandler = (err, req, res, next) => {
    let status = 500
    let message = 'Internal Server Error'

    if (err.name === 'LoginError') {
        status = 401
        message = 'Username/Password salah'
    }

    if (err.name == 'Unauthorized') {
        status = 401
        message = "Unauthorized"
    }

    if (err.name == 'JsonWebTokenError') {
        status = 401
        message = 'Unauthorized'
    }

    if (err.name == 'Forbidden') {
        status = 403
        message = 'You have no access'
    }

    if (err.message === 'NotFound') {
        status = 404;
        message = `Data not found`;
    }

    res.status(status).json({ message })
}

module.exports = errorHandler