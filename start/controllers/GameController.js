const { Game, Event } = require('../models')
class Controller {
    static async read(req, res) {
        try {
            const events = await Game.findAll({
                include: Event
            })

            res.status(200).json({
                message: 'Success read games',
                events
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }
}

module.exports = Controller