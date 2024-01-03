const jwt = require('jsonwebtoken')
const secretKey = 'test'

const createToken = (payload) => { // buat nge encode payload yang mau kita simpan pas login jd access token (kayak ngecompress)
    return jwt.sign(payload, secretKey)
}

const verifyToken = (token) => {
    return jwt.verify(token, secretKey)
} // kayak nge decode token yang udah di buat (kayak unzip)

module.exports = { createToken, verifyToken }