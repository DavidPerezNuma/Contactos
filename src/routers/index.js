import contactos from './ContactosRouters.js';
import express from 'express';

/**
 * ! Función RouterApi
 * ? Configura y gestiona todas las rutas de la API.
 * ? Se encarga de agrupar las rutas de contactos bajo la versión '/api/v1'.
 * @param {object} app - Instancia de la aplicación Express.
 */
function RouterApi(app) {
    const router = express.Router();

    // * Definir la versión base de la API y utilizar el enrutador de contactos
    app.use('/api/v1', router);

    // * Registrar las rutas de contactos bajo la ruta '/contactos'
    router.use('/contactos', contactos);
}

// * Exportar RouterApi para que sea utilizado en el archivo principal (app.js)
export { RouterApi };
