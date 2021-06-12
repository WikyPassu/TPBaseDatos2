const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/cliente.controller');

router.get('/zonaMasClientes', ClienteController.traerZonaMasClientes);

module.exports = router;