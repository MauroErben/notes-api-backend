const express = require('express')
const routes = express.Router()
const noteController = require('../controllers/noteController')
const { check } = require('express-validator')
const validatorFields = require('../helpers/ValidatorFields')

routes.get('/', noteController.getAllNotes)
routes.get('/:id', noteController.getNoteFromId)
routes.post('/',
  [
    check('title', 'Note title is required').not().isEmpty(),
    validatorFields
  ],
  noteController.createNote
)
routes.delete('/:id', noteController.deleteNote)
routes.patch('/:id',
  [
    check('title', 'Note title is required').not().isEmpty(),
    validatorFields
  ],
  noteController.updateNote
)

module.exports = routes
