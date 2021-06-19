const express = require('express');
const router = express.Router();
const SucursalController = require('../controllers/sucursal.controller');

router.get('/clientesA5kmAtencionAlCliente', SucursalController.traerClientesA5kmAtencionAlCliente);
router.get('/empleadosA1kmServicioTecnico', SucursalController.traerEmpleadosA1kmServicioTecnico);

module.exports = router;