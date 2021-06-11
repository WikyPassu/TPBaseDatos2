const db = require("../models/db");

//Traer todos los desperfectos, con descripcion, fecha, hora y localidad
const db = require("../models/db");

exports.traerDesperfectos = (req, res) => {
    var tickets = db.getInstance().collection("tickets").aggregate([
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
    ]);
    res.json(tickets);
};