import Boom from "@hapi/boom";
import { MongoLib } from "../libs/index.js";

/**
 * ! Clase ContactsServices para manejar las operaciones CRUD relacionadas con contactos
 * ? Esta clase utiliza MongoLib para interactuar con la base de datos MongoDB y manejar
 * ? operaciones como agregar, eliminar, buscar y ver contactos.
 */
class ContactsServices {
  constructor() {
    // * Definir el nombre de la colección de contactos y la instancia de MongoLib
    this.collection = "contactos";
    this.mongoDB = new MongoLib();
  }

  /**
   * ! Método para agregar un nuevo contacto
   * ? Valida que los campos necesarios estén presentes y luego inserta el contacto en la base de datos.
   * @param {object} data - Objeto que contiene los datos del nuevo contacto (nombre, telefono, email).
   * @returns {object} Resultado de la operación de inserción.
   * @throws {Boom} Si faltan campos obligatorios o si ocurre un error en la operación.
   */
  async agregarContacto(data) {
    const { nombre, telefono, email } = data;

    // TODO: Validar todos los campos obligatorios antes de proceder
    if (!nombre || !telefono || !email) {
      throw Boom.badRequest('Nombre, teléfono y correo electrónico son obligatorios');
    }

    const nuevoContacto = { nombre, telefono, email };

    try {
      const result = await this.mongoDB.insertData(this.collection, [nuevoContacto]);
      return result;
    } catch (error) {
      console.error("Error al agregar el contacto:", error);
      throw Boom.serverUnavailable("Error interno del servidor");
    }
  }

  /**
   * ! Método para eliminar un contacto por ID
   * ? Elimina un contacto basado en su ID único. Lanza un error si el contacto no es encontrado.
   * @param {string} id - ID del contacto que se desea eliminar.
   * @returns {object} Mensaje de éxito si el contacto fue eliminado.
   * @throws {Boom} Si el contacto no existe o si ocurre un error en la operación.
   */
  async eliminarContacto(id) {
    try {
      const ObjectId = require("mongodb").ObjectId;
      const result = await this.mongoDB.client.db(this.mongoDB.database).collection(this.collection).deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        throw Boom.notFound(`No se encontró un contacto con el ID: ${id}`);
      }

      return { message: "Contacto eliminado correctamente" };
    } catch (error) {
      console.error(`Error al eliminar el contacto con ID: ${id}`, error);
      throw Boom.serverUnavailable("Error interno del servidor");
    }
  }

  /**
   * ! Método para buscar un contacto por nombre
   * ? Busca un contacto específico en la base de datos basado en su nombre.
   * @param {string} nombre - El nombre del contacto que se desea buscar.
   * @returns {object} El contacto encontrado.
   * @throws {Boom} Si no se encuentra el contacto o si ocurre un error en la operación.
   */
  async buscarContactoPorNombre(nombre) {
    try {
      const contacto = await this.mongoDB.findOne(this.collection, { nombre });
      if (!contacto) {
        throw Boom.notFound(`No se encontró un contacto con el nombre: ${nombre}`);
      }
      return contacto;
    } catch (error) {
      console.error(`Error al buscar el contacto con nombre: ${nombre}`, error);
      throw Boom.serverUnavailable("Error interno del servidor");
    }
  }

  /**
   * ! Método para buscar un contacto por teléfono
   * ? Busca un contacto en la base de datos utilizando su número de teléfono.
   * @param {string} telefono - El número de teléfono del contacto.
   * @returns {object} El contacto encontrado.
   * @throws {Boom} Si no se encuentra el contacto o si ocurre un error en la operación.
   */
  async buscarContactoPorTelefono(telefono) {
    try {
      const contacto = await this.mongoDB.findOne(this.collection, { telefono });
      if (!contacto) {
        throw Boom.notFound(`No se encontró un contacto con el teléfono: ${telefono}`);
      }
      return contacto;
    } catch (error) {
      console.error(`Error al buscar el contacto con teléfono: ${telefono}`, error);
      throw Boom.serverUnavailable("Error interno del servidor");
    }
  }

  /**
   * ! Método para buscar un contacto por email
   * ? Busca un contacto en la base de datos utilizando su dirección de correo electrónico.
   * @param {string} email - La dirección de correo electrónico del contacto.
   * @returns {object} El contacto encontrado.
   * @throws {Boom} Si no se encuentra el contacto o si ocurre un error en la operación.
   */
  async buscarContactoPorEmail(email) {
    try {
      const contacto = await this.mongoDB.findOne(this.collection, { email });
      if (!contacto) {
        throw Boom.notFound(`No se encontró un contacto con el email: ${email}`);
      }
      return contacto;
    } catch (error) {
      console.error(`Error al buscar el contacto con email: ${email}`, error);
      throw Boom.serverUnavailable("Error interno del servidor");
    }
  }

  /**
   * ! Método para ver todos los contactos
   * ? Recupera todos los contactos almacenados en la base de datos.
   * @returns {Array} Arreglo de contactos encontrados.
   * @throws {Boom} Si no se encuentran contactos o si ocurre un error en la operación.
   */
  async verContactos() {
    try {
      const contactos = await this.mongoDB.find(this.collection, {});
      if (contactos.length === 0) {
        throw Boom.notFound("No se encontraron contactos");
      }
      return contactos;
    } catch (error) {
      console.error("Error al obtener los contactos:", error);
      throw Boom.serverUnavailable("Error interno del servidor");
    }
  }
}

// * Exportar la clase ContactsServices para su uso en otras partes de la aplicación
export { ContactsServices };
