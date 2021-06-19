const db = require('../models/db');

//Clientes a 5km de la sucursal atencion al cliente
exports.traerClientesA5kmAtencionAlCliente = (req, res) => {
    db.getInstance().collection('sucursales').find({
        descripcion: "atencion al cliente"
    }).toArray().then((sucursal) => {
        db.getInstance().collection('clientes').find(
            {
                "domicilio.geometry": {
                    $near: {
                        $geometry: sucursal[0].direccion.geometry,
                        $maxDistance: 5000
                    }
                }
            }
        ).toArray((err, result) => {
            if (err) return console.log(err);
            res.send(result);
        });
    });
};

//Empleados a 1km de la sucursal servicio tecnico
exports.traerEmpleadosA1kmServicioTecnico = (req, res) => {
    db.getInstance().collection('sucursales').find({
        descripcion: "servicio tecnico"
    }).toArray().then((sucursal) => {
        db.getInstance().collection('empleados').find(
            {
                "domicilio.geometry": {
                    $near: {
                        $geometry: sucursal[0].direccion.geometry,
                        $maxDistance: 1000
                    }
                }
            }
        ).toArray((err, result) => {
            if (err) return console.log(err);
            res.send(result);
        });
    });
};