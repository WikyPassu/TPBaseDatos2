const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticket.controller');

router.get('/tickets', TicketController.traerTickets);
router.get('/desperfectos', TicketController.traerDesperfectos);
router.get('/noDesperfectos', TicketController.traerNoDesperfectos);
router.get('/quienAtiendeMas', TicketController.traerQuienAtiendeMas);
router.get('/quienAtiendeMenos', TicketController.traerQuienAtiendeMenos);
router.get('/horaMasTrabajo', TicketController.traerHoraMasTrabajo);
router.get('/horaMenosTrabajo', TicketController.traerHoraMenosTrabajo);
router.get('/sinResolver', TicketController.traerSinResolver);
router.get('/resueltos', TicketController.traerResueltos);
router.get('/desperfectosPorZona', TicketController.traerDesperfectosPorZona);
router.get('/desperfectosAvellaneda', TicketController.traerDesperfectosAvellaneda);
router.get('/desperfectosLomasDeZamora', TicketController.traerDesperfectosLomasDeZamora);
router.get('/atencionPorZona', TicketController.traerAtencionPorZona);
router.get('/atencionAvellaneda', TicketController.traerAtencionAvellaneda);
router.get('/atencionLomasDeZamora', TicketController.traerAtencionLomasDeZamora);
router.get('/quienHaceMas', TicketController.traerQuienHaceMas);
router.get('/quienHaceMenos', TicketController.traerQuienHaceMenos);
router.get('/quienSinResolver', TicketController.traerQuienSinResolver);
router.get('/quienResuelto', TicketController.traerQuienResuelto);
router.get('/esEmpleadoYGeneroTicket', TicketController.traerEsEmpleadoYGeneroTicket);

module.exports = router;