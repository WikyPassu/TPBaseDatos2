const express = require('express');
const router = express.Router();
const SucursalController = require('../controllers/sucursal.controller');

router.get('/empleadosA2km', SucursalController.traerEmpleadosA2km);

module.exports = router;