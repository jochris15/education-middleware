const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY

const signToken = (payload) => {
    return jwt.sign(payload, secretKey)
}


module.exports = { signToken }