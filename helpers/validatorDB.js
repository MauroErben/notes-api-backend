const Usuario = require('../models/usuario')

const validEmail = async (email = '') => { 
  const existEmail = await Usuario.findOne({ email })
  if(existEmail){
    throw new Error(`This email: ${email} is already in use`)
  }
}
 
module.exports = {
  validEmail
}