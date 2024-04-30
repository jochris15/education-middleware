require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const AuthController = require('./controllers/AuthController')
const EventController = require('./controllers/EventController')
const GameController = require('./controllers/GameController')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/register', AuthController.register)
app.post('/login', AuthController.login)

app.get('/games', GameController.read)
app.get('/events', EventController.read)
app.post('/events', EventController.add)
app.get('/events/:id', EventController.readDetail)
app.delete('/events/:id', EventController.delete)
app.put('/events/:id', EventController.edit)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})