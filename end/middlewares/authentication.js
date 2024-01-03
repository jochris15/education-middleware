const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers // ambil token dari header

        if (!authorization) {
            throw { name: "Unauthorized" }
        }

        const access_token = authorization.split(" ")[1] // di split soalnya ada kata2 "Bearer"

        const payload = verifyToken(access_token)

        const user = await User.findOne({
            where: {
                username: payload.username
            }
        }) // cari user sesuai hasil decode biar makin secure

        if (!user) {
            throw { name: "Unauthorized" }
        }

        req.loginInfo = {
            userId: user.id,
            username: user.username,
            role: user.role
        } // kita bikin object baru di dalam request

        next() // lanjutin ke function berikutnya
    } catch (err) {
        next(err)
    }
}

module.exports = authentication