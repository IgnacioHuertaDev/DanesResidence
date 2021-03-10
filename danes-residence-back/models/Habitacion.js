const { Schema, model } = require('mongoose')

const habitacionSchema = new Schema({
    Codigo: String,
    CantPersonas: Number,
    Ocupada: Boolean
})

habitacionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Habitacion = model('Habitacion', habitacionSchema)

module.exports = Habitacion