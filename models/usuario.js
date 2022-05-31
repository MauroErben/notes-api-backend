const mongoose = require('mongoose')
const { Schema } = mongoose

const usuarioSchema = new Schema({
    name: String,
    email: String,
    password: String
})
const usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = usuario