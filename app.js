require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
	inquirerMenu,
	pausa,
	leerInput,
	listadoTareasBorrar,
	confirmar,
	mostrarListadoChecklist,
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {
	let opt = '';
	const tareas = new Tareas();
	const tareasDB = leerDB();

	if (tareasDB) {
		tareas.cargarTareasFromArray(tareasDB);
	}

	do {
		//  Imprime el menu
		opt = await inquirerMenu();
		switch (opt) {
			case '1':
				//  Crear tarea
				const desc = await leerInput('Descripción: ');
				tareas.crearTarea(desc);
				console.log(desc);
				break;

			case '2':
				//  Listar tareas
				console.log(tareas.listadoCompleto());
				break;

			case '3':
				//	Listar tareas completadas
				console.log(tareas.listarPendientesCompletadas(true));
				break;

			case '4':
				//	Listar tareas pendientes
				console.log(tareas.listarPendientesCompletadas(false));
				break;

			case '5':
				//	Completado | Pendiente
				const ids = await mostrarListadoChecklist(tareas.listadoArr);
				tareas.toggleCompletadas(ids);
				break;

			case '6':
				//	Borrar tarea
				const id = await listadoTareasBorrar(tareas.listadoArr);
				if (id !== '0') {
					const ok = await confirmar('¿Está seguro de borrar la tarea?');
					if (ok) tareas.borrarTarea(id);
				}
				break;
		}

		guardarDB(tareas.listadoArr);

		await pausa();
	} while (opt !== '0');
};

main();
