const db = require('../models/db');

//Todos los tickets, con descripcion, fecha, hora y localidad
exports.traerTickets = (req, res) => {
    db.getInstance().collection('tickets').aggregate([
        {
            $project: {
                numero_reclamo: "$numero_reclamo",
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
                numero_reclamo: "$numero_reclamo",
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

//Todos los no desperfectos, con descripcion, fecha, hora y localidad
exports.traerNoDesperfectos = (req, res) => {
    db.getInstance().collection('tickets').aggregate([
        {
            $match: {
                $expr: {
                    $ne: ["$motivo.razon", "desperfecto"]
                }
            }
        },
        {
            $project: {
                numero_reclamo: "$numero_reclamo",
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

//Quien atiende mas tickets (al menos 1)
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

//Quien atiende menos tickets (al menos 1)
exports.traerQuienAtiendeMenos = (req, res) => {
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
            $sort: { tickets: 1 }
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

//A que hora hay menos trabajo
exports.traerHoraMenosTrabajo = (req, res) => {
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
            $sort: { tickets: 1 }
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

//Que trabajo esta resuelto
exports.traerResueltos = (req, res) => {
    db.getInstance().collection('tickets').aggregate([
        {
            $match: {
                "estado.resuelto": true
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
                ticket: {
                    numero_reclamo: "$numero_reclamo",
                    desperfecto: "$motivo.descripcion"	
                }	
            }
        },
        {
            $group: {
                _id: "$localidad",
                tickets: {
                    $push: "$ticket"
                }
            }
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};

//Desperfectos Avellaneda
exports.traerDesperfectosAvellaneda = (req, res) => {
    db.getInstance().collection('tickets').aggregate([
        {
            $match: {
                "motivo.razon": "desperfecto",
                "domicilio.geometry": {
                    $geoWithin: {
                        $geometry: {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-58.373857, -34.672385],
                                    [-58.357082, -34.662878],
                                    [-58.365397, -34.649922],
                                    [-58.377976, -34.657864],
                                    [-58.373857, -34.672385]
                                ]
                            ]
                        }
                    }
                }
            }
        },
        {
            $project: {
                localidad: "$localidad.descripcion",
                ticket: {
                    numero_reclamo: "$numero_reclamo",
                    desperfecto: "$motivo.descripcion"	
                }	
            }
        },
        {
            $group: {
                _id: "$localidad",
                tickets: {
                    $push: "$ticket"
                }
            }
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};

//Desperfectos Lomas de Zamora
exports.traerDesperfectosLomasDeZamora = (req, res) => {
    db.getInstance().collection('tickets').aggregate([
        {
            $match: {
                "motivo.razon": "desperfecto",
                "domicilio.geometry": {
                    $geoWithin: {
                        $geometry: {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-58.370825, -34.749371],
                                    [-58.375290, -34.751689],
                                    [-58.378754, -34.747346],
                                    [-58.386881, -34.751613],
                                    [-58.432149, -34.745324],
                                    [-58.431827, -34.745809],
                                    [-58.439648, -34.750191],
                                    [-58.439951, -34.749838],
                                    [-58.469486, -34.765273],
                                    [-58.458559, -34.778951],
                                    [-58.443682, -34.771197],
                                    [-58.432521, -34.784686],
                                    [-58.370213, -34.752826],
                                    [-58.370825, -34.749371]
                                ]
                            ]
                        }
                    }
                }
            }
        },
        {
            $project: {
                localidad: "$localidad.descripcion",
                ticket: {
                    numero_reclamo: "$numero_reclamo",
                    desperfecto: "$motivo.descripcion"	
                }	
            }
        },
        {
            $group: {
                _id: "$localidad",
                tickets: {
                    $push: "$ticket"
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
                ticket: {
                    numero_reclamo: "$numero_reclamo",
                    atenciones: "$derivaciones.sucursal.descripcion"			
                }
            }
        },
        {
            $group: {
                _id: "$localidad",
                tickets: {
                    $push: "$ticket"
                }
            }
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};

//Atencion hecha en Avellaneda
exports.traerAtencionAvellaneda = (req, res) => {
    db.getInstance().collection('tickets').aggregate([
        {
            $match: {
                "domicilio.geometry": {
                    $geoWithin: {
                        $geometry: {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-58.373857, -34.672385],
                                    [-58.357082, -34.662878],
                                    [-58.365397, -34.649922],
                                    [-58.377976, -34.657864],
                                    [-58.373857, -34.672385]
                                ]
                            ]
                        }
                    }
                }
            }
        },
        {
            $project: {
                localidad: "$localidad.descripcion",
                ticket: {
                    numero_reclamo: "$numero_reclamo",
                    atenciones: "$derivaciones.sucursal.descripcion"			
                }
            }
        },
        {
            $group: {
                _id: "$localidad",
                tickets: {
                    $push: "$ticket"
                }
            }
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};

//Atencion hecha en Lomas de Zamora
exports.traerAtencionLomasDeZamora = (req, res) => {
    db.getInstance().collection('tickets').aggregate([
        {
            $match: {
                "domicilio.geometry": {
                    $geoWithin: {
                        $geometry: {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-58.370825, -34.749371],
                                    [-58.375290, -34.751689],
                                    [-58.378754, -34.747346],
                                    [-58.386881, -34.751613],
                                    [-58.432149, -34.745324],
                                    [-58.431827, -34.745809],
                                    [-58.439648, -34.750191],
                                    [-58.439951, -34.749838],
                                    [-58.469486, -34.765273],
                                    [-58.458559, -34.778951],
                                    [-58.443682, -34.771197],
                                    [-58.432521, -34.784686],
                                    [-58.370213, -34.752826],
                                    [-58.370825, -34.749371]
                                ]
                            ]
                        }
                    }
                }
            }
        },
        {
            $project: {
                localidad: "$localidad.descripcion",
                ticket: {
                    numero_reclamo: "$numero_reclamo",
                    atenciones: "$derivaciones.sucursal.descripcion"			
                }
            }
        },
        {
            $group: {
                _id: "$localidad",
                tickets: {
                    $push: "$ticket"
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

//Quien hace menos tickets
exports.traerQuienHaceMenos = (req, res) => {
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
            $sort: { tickets: 1 }
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

//Quien tiene ticket resuelto
exports.traerQuienResuelto = (req, res) => {
    db.getInstance().collection('tickets').aggregate([
        {
            $match: {
                "estado.resuelto": true
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

//Que cliente es ademas empleado y genero ticket
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