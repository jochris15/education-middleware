if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const AuthController = require('./controllers/AuthController')
const EventController = require('./controllers/EventController')
const GameController = require('./controllers/GameController')
const authentication = require('./middlewares/authentication')
const authorization = require('./middlewares/authorization')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/register', AuthController.register)
app.post('/login', AuthController.login)

app.use(authentication) // penjaga gerbang pertama , penggunaan middleware secara global / app level

app.get('/games', GameController.read)
app.get('/events', EventController.read)
app.post('/events', EventController.add)

// authorization, penggunaan middlewarenya secara endpoint, supaya bisa akses param eventnya
app.get('/events/:id', authorization, EventController.readDetail)
app.delete('/events/:id', authorization, EventController.delete)
app.put('/events/:id', authorization, EventController.edit)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})