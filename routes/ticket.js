const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticket.controller');

router.get('/desperfectos', TicketController.traerDesperfectos);
router.get('/quienAtiendeMas', TicketController.traerQuienAtiendeMas);
router.get('/horaMasTrabajo', TicketController.traerHoraMasTrabajo);
router.get('/sinResolver', TicketController.traerSinResolver);
router.get('/desperfectosPorZona', TicketController.traerDesperfectosPorZona);
router.get('/atencionPorZona', TicketController.traerAtencionPorZona);
router.get('/quienHaceMas', TicketController.traerQuienHaceMas);
router.get('/quienSinResolver', TicketController.traerQuienSinResolver);
router.get('/esEmpleadoYGeneroTicket', TicketController.traerEsEmpleadoYGeneroTicket);

module.exports = router;