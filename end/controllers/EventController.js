const { Game, Event, User } = require('../models')
class Controller {
    static async read(req, res, next) {
        try {
            const { userId } = req.loginInfo

            const events = await Event.findAll({
                include: [Game, User],
                where: {
                    userId
                }
            })

            res.status(200).json({
                message: 'Success read events',
                events
            })
        } catch (err) {
            next(err)
        }
    }

    static async add(req, res, next) {
        try {
            const { userId } = req.loginInfo
            const { name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, gameId } = req.body
            const event = await Event.create({ name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, gameId, userId })

            res.status(201).json({
                message: "Success create new event",
                event
            })
        } catch (err) {
            next(err)
        }
    }

    static async readDetail(req, res, next) {
        try {
            const { id } = req.params
            const event = await Event.findByPk(id)

            if (!event) {
                throw ({ name: "NotFound", id })
            }

            res.status(200).json({
                message: `Success read event with id ${event.id}`,
                event
            })
        } catch (err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params

            const event = await Event.findByPk(id)

            if (!event) {
                throw ({ name: "NotFound", id })
            }

            await Event.destroy({
                where: {
                    id
                }
            })

            res.status(200).json({
                message: `Success delete event with id ${id}`
            })
        } catch (err) {
            next(err)
        }
    }

    static async edit(req, res, next) {
        try {
            const { id } = req.params
            let event = await Event.findByPk(id)

            if (!event) {
                throw ({ name: "NotFound", id })
            }

            const { name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, gameId } = req.body

            await Event.update({ name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, gameId }, {
                where: {
                    id
                }
            })

            event = await Event.findByPk(id)

            res.status(200).json({
                message: `Success edit event with id ${id}`,
                event
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller