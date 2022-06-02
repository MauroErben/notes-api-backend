const mongoose = require('mongoose')
const { Schema } = mongoose

const usuarioSchema = new Schema({
    name: String,
    email: String,
    password: String
})

module.exports = mongoose.model('Usuario', usuarioSchema)