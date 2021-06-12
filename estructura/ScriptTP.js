//conn = new Mongo();
//db = conn.getDB("ticketera");

//Todos los desperfectos, con descripcion, fecha, hora y localidad
/*db.tickets.aggregate([
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
]).forEach(printjson);*/

//Quien atiende mas tickets
/*db.tickets.aggregate([
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
]).forEach(printjson);*/

//A que hora hay mas trabajo
/*db.tickets.aggregate([
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
]).forEach(printjson);*/

//Que trabajo esta sin resolver
/*db.tickets.aggregate([
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
]).forEach(printjson);*/

//Desperfectos por zona
/*db.tickets.aggregate([
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
]).forEach(printjson);*/

//Atencion hecha por zona
/*db.tickets.aggregate([
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
]).forEach(printjson);*/

//Quien hace mas tickets
/*db.tickets.aggregate([
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
]).forEach(printjson);*/

//Quien tiene ticket sin resolver
/*db.tickets.aggregate([
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
]).forEach(printjson);*/

//En que zona hay mas clientes
/*db.clientes.aggregate([
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
]).forEach(printjson);*/

//Que cliente es ademas empleado y genero ticket
/*db.tickets.aggregate([
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
]).forEach(printjson);*/