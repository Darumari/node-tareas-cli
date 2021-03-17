const Tarea = require('./tarea');

class Tareas {
	_listado = {};

	get listadoArr() {
		const listado = [];

		Object.keys(this._listado).forEach((key) => {
			const tarea = this._listado[key];
			listado.push(tarea);
		});

		return listado;
	}

	constructor() {
		this._listado = {};
	}

	borrarTarea(id = '') {
		if (this._listado[id]) {
			delete this._listado[id];
		}
	}

	cargarTareasFromArray(tareas = []) {
		tareas.forEach((tarea) => {
			this._listado[tarea.id] = tarea;
		});
	}

	crearTarea(desc = '') {
		const tarea = new Tarea(desc);
		this._listado[tarea.id] = tarea;
	}

	listadoCompleto() {
		console.log();
		this.listadoArr.forEach((tarea, index) => {
			const indexTarea = `${index + 1}`.cyan;
			const completada = tarea.completadaEn ? 'Completada'.green : 'Pendiente'.red;
			console.log(`${indexTarea} ${tarea.desc} :: ${completada}`);
		});
	}

	listarPendientesCompletadas(completadas = true) {
		console.log();
		const tareasSolicitadas = this.listadoArr.filter((tarea) => {
			if (completadas) return tarea.completadaEn;
			return !tarea.completadaEn;
		});

		tareasSolicitadas.forEach((tarea, index) => {
			const indexTarea = `${index + 1}`.cyan;
			const completada = completadas ? tarea.completadaEn.green : 'Pendiente'.red;
			console.log(`${indexTarea} ${tarea.desc} :: ${completada}`);
		});
	}

	toggleCompletadas(ids = []) {
		ids.forEach((id) => {
			const tarea = this._listado[id];
			if (!tarea.completadaEn) {
				tarea.completadaEn = new Date().toISOString();
			}
		});

		this.listadoArr.forEach((tarea) => {
			if (!ids.includes(tarea.id)) {
				this._listado[tarea.id].completadaEn = null;
			}
		});
	}
}

module.exports = Tareas;
