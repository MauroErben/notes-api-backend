const express = require('express')
const routes = express.Router()

routes.get('/notas', (req, res) => {
    res.send('Hola, esta es la seccion privada :)')
})

module.exports = routes