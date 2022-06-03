const express = require('express')
const routes = express.Router()
const noteController = require('../controllers/noteController')

routes.get('/', noteController.getAllNotes)
routes.get('/:id', noteController.getNoteFromId)
routes.post('/create', noteController.createNote)
routes.delete('/:id', noteController.deleteNote)
routes.patch('/:id', noteController.updateNote)

module.exports = routes
