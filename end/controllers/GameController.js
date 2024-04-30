const { Game, Event } = require('../models')
class Controller {
    static async read(req, res, next) {
        try {
            const events = await Game.findAll({
                include: Event
            })

            res.status(200).json({
                message: 'Success read games',
                events
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller