const { Game, Event, User } = require('../models')
class Controller {
    static async read(req, res) {
        try {
            const events = await Event.findAll({
                include: [Game, User]
            })

            res.status(200).json({
                message: 'Success read events',
                events
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }

    static async add(req, res) {
        try {
            const userId = 1
            const { name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, gameId } = req.body
            const event = await Event.create({ name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, gameId, userId })

            res.status(201).json({
                message: "Success create new event",
                event
            })
        } catch (error) {
            console.log(error);
            let status = 500
            let message = 'Internal Server Error'

            if (error.name == 'SequelizeValidationError') {
                status = 400
                message = error.errors[0].message
            }

            if (error.name == 'SequelizeDatabaseError') {
                status = 400
                message = 'Invalid input'
            }

            if (error.name == 'SequelizeForeignKeyConstraintError') {
                status = 400
                message = 'Invalid input'
            }

            res.status(status).json({
                message
            })
        }
    }

    static async readDetail(req, res) {
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
        } catch (error) {
            console.log(error);
            let status = 500
            let message = 'Internal Server Error'

            if (error.name == 'NotFound') {
                status = 404
                message = `Data with id ${error.id} not found`
            }

            res.status(status).json({
                message
            })
        }
    }

    static async delete(req, res) {
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
        } catch (error) {
            console.log(error);
            let status = 500
            let message = 'Internal Server Error'

            if (error.name == 'NotFound') {
                status = 404
                message = `Data with id ${error.id} not found`
            }

            res.status(status).json({
                message
            })
        }
    }

    static async edit(req, res) {
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
        } catch (error) {
            console.log(error);
            let status = 500
            let message = 'Internal Server Error'

            if (error.name == 'SequelizeValidationError') {
                status = 400
                message = error.errors[0].message
            }

            if (error.name == 'SequelizeDatabaseError') {
                status = 400
                message = 'Invalid input'
            }

            if (error.name == 'SequelizeForeignKeyConstraintError') {
                status = 400
                message = 'Invalid input'
            }

            if (error.name == 'NotFound') {
                status = 404
                message = `Data with id ${error.id} not found`
            }

            res.status(status).json({
                message
            })
        }
    }
}

module.exports = Controller