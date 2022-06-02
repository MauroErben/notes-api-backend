const Nota = require('../models/nota')

module.exports.getAllNotes = async function (req, res) {

    //Obtenemos todas las notas del usuario que esta autenticado
    const notas = await Nota.find({ user_id: req.user })

    //Si la nota existe devolvemos un json con todas las notas del usuario 
    if (notas) {
        res.status(200).json({ notas })
    }
}

module.exports.getNoteFromId = async function (req, res) {

    //Obtenemos la nota con el id que le pasamos por parametros
    const note = await Nota.findOne({ _id: req.params.id })

    //Si la nota existe devolvemos un json con la nota 
    if (note) {
        res.status(200).json({ note })
    }
}

module.exports.createNote = function (req, res) {

    //Comprobamos si los campos estan vacios
    if (!(req.body.title && req.body.note)) {
        return res.status(400).json({ message: 'Empty fields' })
    }

    //Creamos la nota
    const note = new Nota({
        title: req.body.title,
        note: req.body.note,
        user_id: req.user
    })

    //Guardamos la nota y devolvemos un json con un mensaje de exito
    note.save()
        .then(() => res.status(200).json({ note, message: 'Note created succesfully' }))
        .catch(error => console.log(error))
}

module.exports.deleteNote = function (req, res) {
    //Obtenemos la nota por id
    const note = Nota.findOne({ _id: req.params.id })
    note.deleteOne()
        .then(() => res.status(204).json({ message: 'Note deleted succesfully' }))
        .catch(error => console.log(error))
}

module.exports.updateNote = function (req, res) {

    //Comprobamos si los campos estan vacios
    if (!(req.body.title && req.body.note)) {
        return res.status(400).json({ message: 'Empty note' })
    }

    //Actualizamos la nota
    Nota.updateOne({ _id: req.params.id }, {
        $set: {
            title: req.body.title,
            note: req.body.note,
            user: req.user
        }
    }).then(() => res.status(201).json({ message: 'Note updated succesfully' }))
    .catch(error => console.log(error))
}