const { comparePassword } = require('../helpers/bcrypt');
const { User } = require('../models/index')
const { createToken } = require('../helpers/jwt')

class AuthController {
    static async login(req, res, next) {
        try {
            const { username, password } = req.body

            if (!username || !password) {
                throw { name: "LoginError" }
            }

            const user = await User.findOne({
                where: { username: username }
            });

            if (!user) {
                throw { name: "LoginError" }
            }

            if (!comparePassword(password, user.password)) {
                throw { name: "LoginError" }
            }

            const payload = { // data2 yang mau kita simpan
                id: user.id,
                username: user.username,
                role: user.role
            }

            const access_token = createToken(payload)

            res.status(200).json({ access_token });

        } catch (err) {
            next(err)
        }
    }
}

module.exports = AuthController