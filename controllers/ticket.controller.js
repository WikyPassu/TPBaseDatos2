const db = require('../models/db');

//Todos los desperfectos, con descripcion, fecha, hora y localidad
exports.traerDesperfectos = (req, res) => {
    db.getInstance().collection('tickets').aggregate([
        {
            $match: {
                "motivo.razon": "desperfecto"
            }
        },
        {
            $project: {
                razon: "$motivo.razon",
                descripcion: "$motivo.descripcion",
                fecha: "$motivo.fecha",
                hora: "$motivo.horario.horas",
                minutos: "$motivo.horario.minutos",
                localidad: "$localidad.descripcion"
            }
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};

//Quien atiende mas tickets
exports.traerQuienAtiendeMas = (req, res) => {
    db.getInstance().collection('tickets').aggregate([
        {
            $unwind: "$derivaciones"
        },
        {
            $project: {
                empleado: {
                    dni: "$derivaciones.empleado.dni",
                    apellido: "$derivaciones.empleado.apellido",
                    nombre: "$derivaciones.empleado.nombre"
                }
            }
        },
        {
            $group: {
                _id: "$empleado",
                tickets: { $sum: 1 }
            }
        },
        {
            $sort: { tickets: -1 }
        },
        {
            $limit: 1
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};

//A que hora hay mas trabajo
exports.traerHoraMasTrabajo = (req, res) => {
    db.getInstance().collection('tickets').aggregate([
        {
            $project: {
                hora: "$motivo.horario.horas"
            }
        },
        {
            $group: {
                _id: {
                    "hora_mas_trabajo": "$hora"
                },
                tickets: { $sum: 1 } 
            }
        },
        {
            $sort: { tickets: -1 }
        },
        {
            $limit: 1
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};

//Que trabajo esta sin resolver
exports.traerSinResolver = (req, res) => {
    db.getInstance().collection('tickets').aggregate([
        {
            $match: {
                "estado.resuelto": false
            }
        },
        {
            $project: {
                numero_reclamo: "$numero_reclamo",
                motivo: "$motivo",
                estado: "$estado"
            }
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};

//Desperfectos por zona
exports.traerDesperfectosPorZona = (req, res) => {
    db.getInstance().collection('tickets').aggregate([
        {
            $match: {
                "motivo.razon": "desperfecto"
            }
        },
        {
            $project: {
                localidad: "$localidad.descripcion",
                desperfecto: "$motivo.descripcion"		
            }
        },
        {
            $group: {
                _id: "$localidad",
                desperfectos: {
                    $push: "$desperfecto"
                }
            }
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};

//Atencion hecha por zona
exports.traerAtencionPorZona = (req, res) => {
    db.getInstance().collection('tickets').aggregate([
        {
            $project: {
                localidad: "$localidad.descripcion",
                atencion: "$derivaciones.sucursal.descripcion"			
            }
        },
        {
            $group: {
                _id: "$localidad",
                atenciones: {
                    $push: "$atencion"
                }
            }
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};

//Quien hace mas tickets
exports.traerQuienHaceMas = (req, res) => {
    db.getInstance().collection('tickets').aggregate([
        {
            $project: {
                cliente: {
                    dni: "$cliente.dni",
                    apellido: "$cliente.apellido",
                    nombre: "$cliente.nombre"
                }
            }
        },
        {
            $group: {
                _id: "$cliente",
                tickets: { $sum: 1 }
            }
        },
        {
            $sort: { tickets: -1 }
        },
        {
            $limit: 1
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};

//Quien tiene ticket sin resolver
exports.traerQuienSinResolver = (req, res) => {
    db.getInstance().collection('tickets').aggregate([
        {
            $match: {
                "estado.resuelto": false
            }
        },
        {
            $project: {
                numero_reclamo: "$numero_reclamo",
                cliente: {
                    dni: "$cliente.dni",
                    apellido: "$cliente.apellido",
                    nombre: "$cliente.nombre"
                },
                motivo: "$motivo",
                estado: "$estado"
            }
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};

////Que cliente es ademas empleado y genero ticket
exports.traerEsEmpleadoYGeneroTicket = (req, res) => {
    db.getInstance().collection('tickets').aggregate([
        {
            $match: {
                "cliente.empleado": true
            }
        },
        {
            $project: {
                cliente: {
                    dni: "$cliente.dni",
                    apellido: "$cliente.apellido",
                    nombre: "$cliente.nombre"
                }
            }
        },
        {
            $group: {
                _id: { cliente: "$cliente" },
                tickets: { $sum: 1 }
            }
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};