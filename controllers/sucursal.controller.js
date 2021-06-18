const db = require('../models/db');

//Empleados a 2km de la sucursal
exports.traerEmpleadosA2km = (req, res) => {
    db.getInstance().collection('sucursales').aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [-58.391009, -34.696036]
                },
                distanceField: "dist.calculated",
                maxDistance: 2000
            }
        },
        {
            $lookup: {
                from: "empleados",
                localField: "descripcion",
                foreignField: "sucursal",
                as: "empleados_2km"
            }
        },
        {
            $project: {
                empleados_2km: "$empleados_2km",
                cantidad_empleados: { $size: "$empleados_2km" }
            }
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};