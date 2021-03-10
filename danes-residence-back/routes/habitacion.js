const express = require('express');
const router = express.Router();
const habitacionController = require('../controllers/habitacionController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// Crea habitacion
// api/habitacion
router.post('/', 
    auth,
    [
        check('codigo', 'El código de la habitación es obligatorio').not().isEmpty()
    ],
    habitacionController.crearHabitacion
);

// Obtener todas las habitaciones
router.get('/', 
    auth,
    habitacionController.obtenerHabitaciones
)

// Obtener una habitacion via ID
router.get('/:id', 
    auth,
    habitacionController.obtenerHabitacion
)

// Actualizar habitacion via ID
router.put('/:id', 
    auth,
    [
        check('codigo', 'El codigo de la habitación es obligatorio').not().isEmpty()
    ],
    habitacionController.actualizarHabitacion
);

// Eliminar una habitacion
router.delete('/:id', 
    auth,
    habitacionController.eliminarHabitacion
);

module.exports = router;