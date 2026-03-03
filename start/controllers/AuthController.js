const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class AuthController {
    static async register(req, res) {
        try {
            const { email, password, role } = req.body
            console.log(req.body.email);
            const user = await User.create({ email, password, role })

            res.status(201).json({
                message: "Success create new user",
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            })
        } catch (error) {
            let status = 500
            let message = 'Internal Server Error'

            if (error.name == 'SequelizeValidationError') {
                status = 400
                message = error.errors[0].message
            }

            if (error.name == 'SequelizeUniqueConstraintError') {
                status = 400
                message = error.errors[0].message
            }

            if (error.name == 'SequelizeDatabaseError' || error.name == 'SequelizeForeignKeyConstraintError') {
                status = 400
                message = 'Invalid input'
            }

            res.status(status).json({
                message
            })
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body

            if (!email || !password) throw { name: "InvalidLogin" }

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
        } catch (error) {
            let message = 'Internal server error'
            let status = 500

            if (error.name == 'InvalidLogin') {
                message = 'Please input email or password'
                status = 401
            }

            if (error.name == 'LoginError') {
                message = 'Invalid email or password'
                status = 401
            }

            res.status(status).json({
                message
            })
        }
    }
}

module.exports = AuthController