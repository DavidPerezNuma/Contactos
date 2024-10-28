import express from 'express';
import dotenv from 'dotenv';
import { config } from './config/index.js';
import { URI } from './libs/mongoDB/data/conexion.js';
import { RouterApi } from './routers/index.js';

import { logErrors, errorHanlder, boomError } from './middlewares/index.js';

// * Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// ! Middleware para parsear las solicitudes en formato JSON
app.use(express.json());

const PORT = config.port;
const hostname = config.host;

/**
 * ! Configura las rutas de la API
 * ? Se llama a la función RouterApi que organiza las rutas bajo '/api/v1'.
 */
RouterApi(app);

// ! Middleware de manejo de errores
app.use(logErrors); // * Registra los errores en la consola
app.use(boomError); // * Maneja errores específicos del tipo Boom
app.use(errorHanlder); // * Devuelve errores generales en formato JSON

/**
 * ! Iniciar el servidor Express
 * ? El servidor escucha en el puerto configurado y muestra la URL de conexión y el link de MongoDB.
 */
app.listen(PORT, () => {
  console.log(`Server on: http://${hostname}:${PORT}/api/v1`); // * Muestra el link de acceso a la API
  console.log(`Mongo link: ${URI}`); // * Muestra la URI de conexión a MongoDB
});
