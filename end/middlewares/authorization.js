const { User, Event } = require('../models')
const authorization = async (req, res, next) => {
    try {
        const { userId, role } = req.loginInfo

        if (role == 'staff') {
            // role yg lagi login berarti staff
            // melakukan pengecekan eventnya punya user yang lagi login apa bukan
            // cari dulu user di database bedasarkan login info

            const user = await User.findByPk(userId)

            if (!user) throw { name: "Forbidden" }

            // cari eventnya, check userId nya sama ga sama user yg kita cari tadi
            const { id } = req.params
            const event = await Event.findByPk(id)

            if (!event) throw { name: "NotFound" }

            if (event.userId !== user.id) throw { name: "Forbidden" }
        }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authorization