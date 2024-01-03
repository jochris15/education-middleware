const express = require('express')
const router = require('./routes')
const app = express()
const PORT = 3000
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded({ extended: false }))
app.use(express.json()); // body parser untuk ngeparse request json)
app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})  