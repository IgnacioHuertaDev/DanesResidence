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
    
        const newHabitacion = new Habitacion({
            Codigo: habitacion.codigo,
            CantPersonas: habitacion.cantPersonas,
            Ocupada: habitacion.ocupada,
            Reservas: habitacion.reservas
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

exports.actualizarHabitacion = async (request, response) => {
    // Revisar si hay errores
    const errores = validationResult(request);
    if( !errores.isEmpty() ) {
        return response.status(400).json({errores: errores.array() })
    }

    // extraer la información de la habitacion    
    const newHabitacion = new Habitacion({
        _id: request.params.id,
        Codigo: request.body.codigo,
        CantPersonas: request.body.cantPersonas,
        Ocupada: request.body.ocupada,
        Reservas: request.body.reservas
    })

    try {
        // revisar el ID 
        console.log(request.params.id)
        let habitacion = await Habitacion.findById(request.params.id);
        if(!habitacion) {
            return response.status(404).json({msg: 'Habitación no encontrada'})
        }

        // actualizar
        habitacion = await Habitacion.findByIdAndUpdate({ _id: request.params.id }, { $set : newHabitacion}, { new: false });

        response.json({newHabitacion});
    } catch (error) {
        console.log(error);
        response.status(500).send('Error en el servidor');
    }
}

exports.eliminarHabitacion = async (request, response) => {
    try {
        // revisar el ID 
        let habitacion = await Habitacion.findById(request.params.id);
        if(!habitacion) {
            return response.status(404).json({msg: 'Habitación no encontrada'})
        }
        if(habitacion.Reservas.length > 0) {
            return response.status(400).error({msg: 'No se permite eliminar habitaciones con reservas asignadas'})
        }

        // Eliminar habitacion
        await Habitacion.findOneAndRemove({ _id : request.params.id });
        response.json({ msg: 'Habitacion eliminada '})

    } catch (error) {
        console.log(error);
        response.status(500).send('Error en el servidor')
    }
}