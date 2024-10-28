import { MongoClient } from 'mongodb';
import { config } from '../config/index.js';

// * Codificar las credenciales de la base de datos para incluirlas en la URI de conexión
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const HOST = encodeURIComponent(config.dbHost);
const DATABASE = encodeURIComponent(config.dbName);

// * Construcción de la URI de conexión a MongoDB con las credenciales proporcionadas
const URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DATABASE}`;

/**
 * ! Clase para manejar las conexiones y operaciones con MongoDB
 * ? Esta clase maneja las operaciones comunes como conexión, búsqueda, actualización e inserción de datos en MongoDB.
 */
class MongoLib {
  constructor() {
    // * Inicializar el cliente de MongoDB en null hasta que se establezca la conexión
    this.client = null;
    this.database = DATABASE;
    this.connect(); // TODO: Verificar si es necesario establecer la conexión al instanciar la clase
  }

  /**
   * ! Método para conectar a MongoDB.
   * ? Si no existe una conexión activa, establece una nueva conexión utilizando la URI.
   * @returns {MongoClient} Cliente de MongoDB conectado.
   */
  async connect() {
    if (!this.client) {
      try {
        // * Establecer conexión con MongoDB usando URI y opciones para nueva sintaxis y topología unificada
        this.client = await MongoClient.connect(URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        console.log(`Conexión a MongoDB establecida en la base de datos "${this.database}"`);
      } catch (error) {
        // ! Manejo de errores en la conexión a MongoDB
        console.error('Error al conectar con MongoDB:', error);
        throw error;
      }
    }
    return this.client;
  }

  /**
   * ! Método para cerrar la conexión a MongoDB.
   * ? Este método asegura que la conexión se cierre cuando ya no es necesaria, liberando recursos.
   */
  async disconnect() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      console.log("Conexión a MongoDB cerrada.");
    }
  }

  /**
   * ! Método para buscar varios documentos en una colección.
   * ? Realiza una búsqueda en la colección especificada utilizando el filtro (query) proporcionado.
   * @param {string} collection - El nombre de la colección donde buscar.
   * @param {object} query - El filtro de búsqueda.
   * @returns {Array} Arreglo de documentos encontrados.
   */
  async find(collection, query) {
    try {
      return await this.client.db(this.database)
        .collection(collection)
        .find(query)
        .toArray();
    } catch (error) {
      // ! Manejo de errores durante la búsqueda
      console.error(`Error al buscar documentos en la colección "${collection}":`, error);
      throw error;
    }
  }

  /**
   * ! Método para buscar un único documento en una colección.
   * ? Realiza una búsqueda de un solo documento basado en el filtro proporcionado.
   * @param {string} collection - El nombre de la colección donde buscar.
   * @param {object} filter - El filtro para encontrar un documento.
   * @returns {object} Documento encontrado.
   */
  async findOne(collection, filter) {
    try {
      return await this.client.db(this.database)
        .collection(collection)
        .findOne(filter);
    } catch (error) {
      // ! Manejo de errores durante la búsqueda
      console.error(`Error al buscar un documento en la colección "${collection}":`, error);
      throw error;
    }
  }

  /**
   * ! Método para actualizar un documento en una colección.
   * ? Actualiza un documento en la colección basado en el filtro y los nuevos datos proporcionados.
   * @param {string} collection - El nombre de la colección donde actualizar.
   * @param {object} filter - El filtro para encontrar el documento a actualizar.
   * @param {object} data - Los nuevos datos para actualizar el documento.
   * @returns {object} Resultado de la operación de actualización.
   */
  async updateOne(collection, filter, data) {
    try {
      return await this.client.db(this.database)
        .collection(collection)
        .updateOne(filter, { $set: data });
    } catch (error) {
      // ! Manejo de errores durante la actualización
      console.error(`Error al actualizar un documento en la colección "${collection}":`, error);
      throw error;
    }
  }

  /**
   * ! Método para insertar múltiples documentos en una colección.
   * ? Inserta un arreglo de documentos en la colección especificada.
   * @param {string} collectionName - El nombre de la colección donde insertar los datos.
   * @param {Array} data - Arreglo de datos que se desean insertar.
   */
  async insertData(collectionName, data) {
    try {
      const collection = this.client.db(this.database).collection(collectionName);
      await collection.insertMany(data);
      console.log(`Datos insertados en la colección "${collectionName}" de la base de datos "${this.database}" correctamente.`);
    } catch (error) {
      // ! Manejo de errores durante la inserción de datos
      console.error('Error al insertar datos en MongoDB:', error);
      throw error;
    }
  }
}

// * Exportación de la clase MongoLib y la URI para ser utilizadas en otras partes de la aplicación
export { MongoLib, URI };
