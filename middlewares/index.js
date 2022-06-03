const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config/config')

exports.ensureAuthenticated = function (req, res, next) {
  /*
        * comprobamos que la peticion tenga autorizacion en su header
        * si no la tiene, enviamos un codigo de error 403
    */
  if(!req.headers.authorization){
    return res.status(403).json({ message: 'unauthorized user' })
  }
 
  /*
        * obtenemos el token
        * decodificamos el token con la funcion decode y la clave secreta para identificar al usuario
    */
  const token = req.headers.authorization.split(' ')[1]
  const payload = jwt.decode(token, config.TOKEN_SECRET)

  //comprobamos is el token ha expirado, si es asi, enviamos un codigo de error 401
  if(payload.exp <= moment.unix()){
    return res.status(401).json({ message: 'El token ha expirado' })
  }

  req.user = payload.sub
  next()
}