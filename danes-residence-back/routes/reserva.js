const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Obtener habitaciones sin reservas
router.get(
    '/habitacionesVacias',
    auth,
    reservaController.getHabitacionesVacias
)

module.exports = router; 