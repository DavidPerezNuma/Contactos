import express from 'express';
const router = express.Router();
import { ContactsServices } from '../services/contactoServices.js';
const service = new ContactsServices();

/**
 * ! Ruta para obtener todos los contactos
 * ? Recupera todos los contactos almacenados en la base de datos y los devuelve en formato JSON.
 * @returns {Array} Arreglo de contactos
 */
router.get('/', async (req, res, next) => {
    try {
        const contactos = await service.verContactos();
        res.status(200).json(contactos);
    } catch (error) {
        // ! Manejo de errores en la búsqueda de contactos
        next(error);
    }
});

/**
 * ! Ruta para agregar un nuevo contacto
 * ? Inserta un nuevo contacto en la base de datos con los datos proporcionados en el cuerpo de la solicitud (req.body).
 * @returns {object} El contacto agregado
 */
router.post('/', async (req, res, next) => {
    try {
        const nuevoContacto = await service.agregarContacto(req.body);
        res.status(201).json(nuevoContacto); // * 201 - Creado
    } catch (error) {
        // ! Manejo de errores al agregar un nuevo contacto
        next(error);
    }
});

/**
 * ! Ruta para eliminar un contacto por ID
 * ? Elimina un contacto de la base de datos basado en su ID único.
 * @param {string} id - ID del contacto que se desea eliminar (pasado en los parámetros de la URL)
 * @returns {object} Mensaje de éxito si el contacto fue eliminado
 */
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const resultado = await service.eliminarContacto(id);
        res.status(200).json(resultado);
    } catch (error) {
        // ! Manejo de errores al eliminar un contacto
        next(error);
    }
});

/**
 * ! Ruta para buscar un contacto por nombre
 * ? Busca un contacto en la base de datos utilizando el nombre proporcionado en los parámetros de la URL.
 * @param {string} nombre - Nombre del contacto que se desea buscar
 * @returns {object} El contacto encontrado
 */
router.get('/nombre/:nombre', async (req, res, next) => {
    const { nombre } = req.params;
    try {
        const contacto = await service.buscarContactoPorNombre(nombre);
        res.status(200).json(contacto);
    } catch (error) {
        // ! Manejo de errores en la búsqueda de contacto por nombre
        next(error);
    }
});

/**
 * ! Ruta para buscar un contacto por teléfono
 * ? Busca un contacto utilizando el número de teléfono proporcionado en los parámetros de la URL.
 * @param {string} telefono - Número de teléfono del contacto que se desea buscar
 * @returns {object} El contacto encontrado
 */
router.get('/telefono/:telefono', async (req, res, next) => {
    const { telefono } = req.params;
    try {
        const contacto = await service.buscarContactoPorTelefono(telefono);
        res.status(200).json(contacto);
    } catch (error) {
        // ! Manejo de errores en la búsqueda de contacto por teléfono
        next(error);
    }
});

/**
 * ! Ruta para buscar un contacto por email
 * ? Busca un contacto utilizando el correo electrónico proporcionado en los parámetros de la URL.
 * @param {string} email - Dirección de correo electrónico del contacto que se desea buscar
 * @returns {object} El contacto encontrado
 */
router.get('/email/:email', async (req, res, next) => {
    const { email } = req.params;
    try {
        const contacto = await service.buscarContactoPorEmail(email);
        res.status(200).json(contacto);
    } catch (error) {
        // ! Manejo de errores en la búsqueda de contacto por email
        next(error);
    }
});

// * Exportar el enrutador para manejar las rutas relacionadas con contactos
export default router;
