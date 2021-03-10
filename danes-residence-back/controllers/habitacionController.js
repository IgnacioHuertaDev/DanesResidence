const Habitacion = require('../models/Habitacion')
const { validationResult } = require('express-validator')

exports.crearHabitacion = async (request, response) => {
    //revisa errores
    const errores = validationResult(request)
    console.log(errores)
    if( !errores.isEmpty() ) {
        return response.status(400).json({errores: errores.array() })
    }

    try {
        const habitacion = request.body
    
        if(!habitacion.codigo){
            return response.status(400).json({
                error: 'required "codigo" field is missing'
            })
        }
    
        const newHabitacion = new Habitacion({
            Codigo: habitacion.codigo,
            CantPersonas: habitacion.cantPersonas,
            Ocupada: habitacion.ocupada
        })
    
        await newHabitacion.save().then(habitacionGuardada => {
            response.json(habitacionGuardada)
        })
        // const habitacionCreada = await newHabitacion.save()
        // response.json(habitacionCreada)
    } catch (error) {
        console.log(error)
        response.status(500).send('Error al crear la habitación')
    }
    
}

exports.obtenerHabitaciones = async (request, response) => {
    try {
        const habitaciones = await Habitacion.find({})
        response.json(habitaciones)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al intentar obtener las habitaciones')
    }
}

exports.obtenerHabitacion = async (request, response) => {
    const { id } = request.params
    Habitacion.findById(id).then(habitacion => {
        if (habitacion)
            return response.json(habitacion)
        else {
            console.log('no se encontro')
            response.status(404).end()
        }
    })
    .catch(error => {
        next(error)
    })
}
