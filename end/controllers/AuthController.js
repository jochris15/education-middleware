const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class AuthController {
    static async register(req, res, next) {
        try {
            const { email, password, role } = req.body
            console.log(req.body.email);
            const user = await User.create({ email, password, role })

            res.status(201).json({
                message: "Success create new user",
                user
            })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email || !password) throw { name: "BadRequest" }

            // proses nyari user bedasarkan email
            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) throw { name: "LoginError" }

            if (!compare(password, user.password)) throw { name: "LoginError" }

            const payload = {
                id: user.id,
                email: user.email,
                role: user.role
            }

            const access_token = signToken(payload)

            res.status(200).json({
                access_token
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = AuthController