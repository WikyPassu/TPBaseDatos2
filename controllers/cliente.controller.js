const db = require('../models/db');

//En que zona hay mas clientes
exports.traerZonaMasClientes = (req, res) => {
    db.getInstance().collection('clientes').aggregate([
        {
            $project: {
                localidad: "$localidad.descripcion"
            }
        },
        {
            $group: {
                _id: { localidad: "$localidad" },
                clientes: { $sum: 1 }
            }
        },
        {
            $sort: { clientes: -1 }
        },
        {
            $limit: 1
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};