const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/cliente.controller');

router.get('/clientesPorZona', ClienteController.traerClientesPorZona);
router.get('/clientesAvellaneda', ClienteController.traerClientesAvellaneda);
router.get('/clientesLomasDeZamora', ClienteController.traerClientesLomasDeZamora);
router.get('/zonaMasClientes', ClienteController.traerZonaMasClientes);
router.get('/zonaMenosClientes', ClienteController.traerZonaMenosClientes);
router.get('/ticketsPorCliente', ClienteController.traerTicketsPorCliente);

module.exports = router;