const errorHandler = (err, req, res, next) => {
    let status = 500
    let message = 'Internal Server Error'

    if (err.name == 'SequelizeValidationError') {
        status = 400
        message = err.errors[0].message
    }

    if (err.name == 'SequelizeUniqueConstraintError') {
        status = 400
        message = err.errors[0].message
    }

    if (err.name == 'SequelizeDatabaseError' || err.name == 'SequelizeForeignKeyConstraintError') {
        status = 400
        message = 'Invalid input'
    }

    if (err.name == 'BadRequest') {
        message = 'Please input email or password'
        status = 400
    }

    if (err.name == 'LoginError') {
        message = 'Invalid email or password'
        status = 401
    }

    if (err.name == 'Unauthorized' || err.name == 'JsonWebTokenError') {
        message = 'Please login first'
        status = 401
    }

    if (err.name == 'Forbidden') {
        message = 'You dont have any access'
        status = 403
    }

    if (err.name == 'NotFound') {
        status = 404
        message = `Data not found`
    }

    res.status(status).json({
        message
    })
}

module.exports = errorHandler