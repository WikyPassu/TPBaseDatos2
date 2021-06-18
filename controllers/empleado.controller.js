const db = require('../models/db');

//Cantidad de tickets atendidos por empleado
exports.traerAtendidosPorEmpleado = (req, res) => {
    db.getInstance().collection('empleados').aggregate([
        {
            $lookup: {
                from: 'tickets',
                localField: 'dni',
                foreignField: 'derivaciones.empleado.dni',
                as: 'tickets'
            }
        },
        {
            $project: {
                empleado: {
                    dni: "$dni",
                    apellido: "$apellido",
                    nombre: "$nombre",
                    tickets: "$tickets.numero_reclamo",
                    cantidad_tickets_atendidos: { $size: "$tickets" }
                }
            }
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};