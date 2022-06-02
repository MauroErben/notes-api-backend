const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const services = require('../services/services')

exports.register = async function (req, res) {
    const body = req.body
    if (!(body.name && body.email && body.password)) {
        return res.status(400).json({ message: 'Empty fields' })
    }
    const user = new Usuario(body)
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    user.save().then(() => res.status(200).json({ message: 'User created successfully', token: services.createToken(user) }))
}

exports.login = async function (req, res) {
    const body = req.body
    const user = await Usuario.findOne({ email: body.email })
    //Verificamos si existe el usuario
    if(user){
         //Checkeamos que la contraseña escrita sea igual al la hasheada en el modelo usuario
         const validPassword = await bcrypt.compare(body.password, user.password)
         if(validPassword){
            res.status(200).json({ token: services.createToken(user) })
         }else{
             res.status(400).json({ message: 'Invalid password' })
         }
    }else{
        res.status(401).json({ message: 'User does not exist' })
    }
}