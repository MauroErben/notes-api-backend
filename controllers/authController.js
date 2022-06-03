const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')  
const services = require('../services/services')

exports.register = async function (req, res) {
 
  const {name, email, password} = req.body
 
  const user = new Usuario({
    name,
    email, 
    password
  })
  const salt = await bcrypt.genSalt(10)

  user.password = await bcrypt.hash(user.password, salt)

  user.save()
    .then(() => res.status(200).json({ message: 'Registered user successfully' }))
    .catch(() => res.status(500).json({ message: 'Failed. Please try again.' }))
}

exports.login = async function (req, res) {

  const { email, password } = req.body
  const user = await Usuario.findOne({ email })

  if (user) {

    const validPassword = await bcrypt.compare(password, user.password)

    if (validPassword) {
      res.json({ token: services.createToken(user) })
    } else {
      res.status(400).json({ message: 'Invalid password' })
    }
  } else {
    res.status(401).json({ message: 'User does not exist' })
  }
}