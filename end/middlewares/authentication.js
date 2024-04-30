const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) throw { name: "Unauthorized" }

        const access_token = authorization.split(' ')[1]

        // pada saat proses verify, bisa terjadi error dari jwt kalo tokennya tidak sesuai
        const payload = verifyToken(access_token)

        // supaya lebih secure kita cari user bedasarkan access token yang udh didecode (payload)
        const user = await User.findOne({
            where: {
                email: payload.email
            }
        })

        if (!user) throw { name: "Unauthorized" }

        // info2 yang dibutuhkan supaya controller bisa tau siapa yg lagi login
        req.loginInfo = {
            userId: user.id,
            email: user.email,
            role: user.role
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication