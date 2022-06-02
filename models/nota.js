const mongoose = require('mongoose')
const { Schema } = mongoose
const Usuario = mongoose.model('Usuario')

const NotesScheme = new Schema({
    title: String,
    note: String,
    user_id: { type: Schema.ObjectId, ref: "Usuario" }
}, { timestamps: true })

module.exports = mongoose.model('Nota', NotesScheme)