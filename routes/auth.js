const { Router } = require('express')
const { check } = require('express-validator')
const routes = Router()
const { validEmail } = require('../helpers/validatorDB')
const validateFields = require('../helpers/ValidatorFields')
const AuthController = require('../controllers/authController')

routes.post('/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password must have more than 8 characters').isLength({ min: 8 }),
    check('email').custom(validEmail),
    validateFields
  ],
  AuthController.register
)

routes.post('/login',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'password is required').not().isEmpty()
  ],
  AuthController.login
)

module.exports = routes
