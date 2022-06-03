const Nota = require('../models/nota')

module.exports.getAllNotes = async function (req, res) {
  /*
        * Obtenemos todas las notas del usuario que esta autenticado
        * Comprobamos si la nota existe y devolvemos un json con todas las notas del usuario
        * En caso de que no existan notas, se devolvera un codigo 200 pero con una array vacio
    */
  const notas = await Nota.find({ user_id: req.user })
  return res.status(200).json({ notas })
}

module.exports.getNoteFromId = function (req, res) {
  //Si la nota no existe, respondemos con un codigo 404, de lo contrario, con un codigo 200 y la nota
  Nota.findOne({ _id: req.params.id }, function (err, note) {
    if (!note) {
      return res.status(404).json({ message: 'Note does not exist' })
    }
    res.status(200).json({ ...note._doc })
  })
}

module.exports.createNote = function (req, res) {
  /*
        * Si los campos estan vacios, respondemos con un json con error 400
        * Creamos la instancia de la nota
        * Guardamos la nota y respondemos un codigo 200 y un json con un mensaje de exito
    */
  if (!(req.body.title && req.body.note)) {
    return res.status(400).json({ message: 'Empty fields' })
  }

  const nota = new Nota({
    title: req.body.title,
    note: req.body.note,
    user_id: req.user
  })

  nota.save().then(() => res.status(200).json({ ...nota._doc, status: { message: 'Note created succesfully' } }))
}

module.exports.deleteNote = function (req, res) {
  // Si hay un error, respondemos con un codigo 404, de lo contrario, respondemos con un codigo 200 y un mensaje
  Nota.deleteOne({ _id: req.params.id }, function (err) {
    if (err) { 
      return res.status(404).json({ message: 'Note does not exist' }) 
    }
    res.status(200).json({ message: 'Note deleted succesfully' })
  })
}
 
module.exports.updateNote = function (req, res) {
  /*
        * Si los campos estan vacios, respondemos con un codigo 400
        * Si la nota no existe respondemos con un codigo 404, de lo contrario, con un codigo 200 y un mensaje
    */
  if (!(req.body.title && req.body.note)) {
    return res.status(400).json({ message: 'Empty note' })
  }

  Nota.updateOne({ _id: req.params.id }, {
    $set: {
      title: req.body.title,
      note: req.body.note,
      user: req.user
    }
  }, function (err, note) {
    if (!note) {
      return res.status(404).json({ message: 'Note does not exist' })
    }
    res.status(200).json({ message: 'Note updated succesfully' })
  })
}