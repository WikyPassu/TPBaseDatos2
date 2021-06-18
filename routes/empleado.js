const express = require('express');
const router = express.Router();
const EmpleadoController = require('../controllers/empleado.controller');

router.get('/atendidosPorEmpleado', EmpleadoController.traerAtendidosPorEmpleado);

module.exports = router;