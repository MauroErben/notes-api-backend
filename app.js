const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const pageRoutes = require('./routes/pageRoutes')
const mongoose = require('mongoose')
const middlewares = require('./middlewares')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`)
})

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xb2tp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(url)
    .then(() => console.log('Conexion con base de datos exitosa'))
    .catch(error => console.log(error))

app.use('/auth', authRoutes)

//Rutas con acceso autenticado
app.use('/api', middlewares.ensureAuthenticated, pageRoutes)


