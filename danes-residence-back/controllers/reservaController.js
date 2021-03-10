const Habitacion = require('../models/Habitacion')
const { validationResult } = require('express-validator')

exports.getHabitacionesVacias = async (request, response) => {

    try {
        const habitaciones = await Habitacion.find(
            { Reservas: { $elemMatch: { fecha: { $gte: new Date("2022-01-02T00:16:15.184Z") } } } }
        )
        response.status(200).json(habitaciones) 
    } catch (error) {
        console.log(error)
        response.status(500).send('Error al intentar obtener las habitaciones')
    }
}

