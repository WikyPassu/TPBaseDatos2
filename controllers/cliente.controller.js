const db = require('../models/db');

//Clientes por zona
exports.traerClientesPorZona = (req, res) => {
    db.getInstance().collection('clientes').aggregate([
        {
            $project: {
                localidad: "$localidad.descripcion",
                cliente: {
                    dni: "$dni",
                    apellido: "$apellido",
                    nombre: "$nombre"
                }
            }
        },
        {
            $group: {
                _id: "$localidad",
                clientes: {
                    $push: "$cliente"
                }
            }
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};

//Clientes en Avellaneda
exports.traerClientesAvellaneda = (req, res) => {
    db.getInstance().collection('clientes').aggregate([
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
                cliente: {
                    dni: "$dni",
                    apellido: "$apellido",
                    nombre: "$nombre"
                }
            }
        },
        {
            $group: {
                _id: "$localidad",
                clientes: {
                    $push: "$cliente"
                }
            }
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};

//Clientes en Lomas de Zamora
exports.traerClientesLomasDeZamora = (req, res) => {
    db.getInstance().collection('clientes').aggregate([
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
                cliente: {
                    dni: "$dni",
                    apellido: "$apellido",
                    nombre: "$nombre"
                }
            }
        },
        {
            $group: {
                _id: "$localidad",
                clientes: {
                    $push: "$cliente"
                }
            }
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};

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

//En que zona hay menos clientes
exports.traerZonaMenosClientes = (req, res) => {
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
            $sort: { clientes: 1 }
        },
        {
            $limit: 1
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};

//Cantidad de tickets creados por cliente
exports.traerTicketsPorCliente = (req, res) => {
    db.getInstance().collection('clientes').aggregate([
        {
            $lookup: {
                from: 'tickets',
                localField: 'dni',
                foreignField: 'cliente.dni',
                as: 'tickets'
            }
        },
        {
            $project: {
                cliente: {
                    dni: "$dni",
                    apellido: "$apellido",
                    nombre: "$nombre",
                    tickets: "$tickets.numero_reclamo",
                    cantidad_tickets_creados: { $size: "$tickets" }
                }
            }
        }
    ]).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
};