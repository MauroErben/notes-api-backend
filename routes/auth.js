const express = require('express')
const routes = express.Router()
const bcrypt = require('bcrypt')
const Usuario = require('../models/usuario')
const services = require('../services/services')

routes.post('/register', async (req, res) => {
    const body = req.body
    if (!(body.name && body.email && body.password)) {
        return res.status(400).json({ message: 'Complete todos los campos' })
    }
    const user = new Usuario(body)
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    user.save().then(() => res.json({ token: services.createToken(user) }))
})

routes.post('/login', async (req, res) => {
    const body = req.body
    const user = await Usuario.findOne({ email: body.email })
    if (user) {
        //Checkeamos que la contraseña escrita sea igual al la hasheada en el modelo usuario
        const validPassword = await bcrypt.compare(body.password, user.password)
        if (validPassword) {
            res.status(200).json({ token: services.createToken(user) })
        } else {
            res.status(400).json({ error: 'Invalid password' })
        }
    } else {
        res.status(401).json({ error: 'User does not exist' })
    }
})

module.exports = routes