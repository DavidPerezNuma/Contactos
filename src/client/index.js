import axios from 'axios';
import readline from 'readline';
import { config } from '../config/index.js'; 

// * Crear la URL de la API usando los valores de configuración.
// * Se utiliza la configuración importada para construir la URL de la API
const API_URL = `http://${config.host}:${config.port}/api/v1/contactos`;  

// * Crear una interfaz de entrada y salida para interactuar con el usuario a través de la consola.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * ! Función para mostrar el menú de opciones al usuario y capturar su selección.
 * ? Dependiendo de la opción seleccionada, se ejecutará la operación correspondiente.
 */
function menu() {
  console.log(`
  Opciones:
  1. Ver todos los contactos
  2. Agregar un contacto
  3. Buscar contacto por nombre
  4. Buscar contacto por teléfono
  5. Buscar contacto por email
  6. Eliminar contacto por ID
  7. Salir
  `);
  rl.question('Seleccione una opción: ', handleUserChoice);
}

/**
 * ! Función que maneja las opciones seleccionadas por el usuario en el menú.
 * ? Dependiendo de la opción, invoca la función correspondiente para realizar la operación de contactos.
 * 
 * @param {string} option - La opción seleccionada por el usuario.
 */
async function handleUserChoice(option) {
  switch (option) {
    case '1':
      await verContactos();
      break;
    case '2':
      await agregarContacto();
      break;
    case '3':
      rl.question('Ingrese el nombre del contacto: ', async (nombre) => {
        await buscarContactoPorNombre(nombre);
      });
      break;
    case '4':
      rl.question('Ingrese el número de teléfono del contacto: ', async (telefono) => {
        await buscarContactoPorTelefono(telefono);
      });
      break;
    case '5':
      rl.question('Ingrese el email del contacto: ', async (email) => {
        await buscarContactoPorEmail(email);
      });
      break;
    case '6':
      rl.question('Ingrese el ID del contacto que desea eliminar: ', async (id) => {
        await eliminarContacto(id);
      });
      break;
    case '7':
      rl.close();
      return;
    default:
      console.log('Opción no válida. Intente de nuevo.');
  }
  // * Mostrar nuevamente el menú tras realizar la operación
  menu();  
}

/**
 * ! Función que realiza una solicitud GET para obtener y mostrar todos los contactos.
 * ? Si ocurre un error durante la solicitud, se maneja adecuadamente y se muestra en la consola.
 */
async function verContactos() {
  try {
    const response = await axios.get(API_URL);
    console.log('Contactos:', response.data);
  } catch (error) {
    console.error('Error al obtener contactos:', error.response?.data?.message || error.message);
  }
}

/**
 * ! Función que solicita los datos del contacto al usuario y realiza una solicitud POST
 * ? para agregar un nuevo contacto a la base de datos.
 */
async function agregarContacto() {
  rl.question('Nombre: ', (nombre) => {
    rl.question('Teléfono: ', (telefono) => {
      rl.question('Email: ', async (email) => {
        try {
          const response = await axios.post(API_URL, { nombre, telefono, email });
          console.log('Contacto agregado:', response.data);
        } catch (error) {
          console.error('Error al agregar contacto:', error.response?.data?.message || error.message);
        }
        // * Mostrar nuevamente el menú tras agregar el contacto
        menu();
      });
    });
  });
}

/**
 * ! Función que realiza una solicitud GET para buscar un contacto por nombre.
 * @param {string} nombre - El nombre del contacto a buscar.
 */
async function buscarContactoPorNombre(nombre) {
  try {
    const response = await axios.get(`${API_URL}/nombre/${nombre}`);
    console.log('Contacto encontrado:', response.data);
  } catch (error) {
    console.error('Error al buscar contacto:', error.response?.data?.message || error.message);
  }
}

/**
 * ! Función que realiza una solicitud GET para buscar un contacto por número de teléfono.
 * @param {string} telefono - El número de teléfono del contacto a buscar.
 */
async function buscarContactoPorTelefono(telefono) {
  try {
    const response = await axios.get(`${API_URL}/telefono/${telefono}`);
    console.log('Contacto encontrado:', response.data);
  } catch (error) {
    console.error('Error al buscar contacto:', error.response?.data?.message || error.message);
  }
}

/**
 * ! Función que realiza una solicitud GET para buscar un contacto por email.
 * @param {string} email - El email del contacto a buscar.
 */
async function buscarContactoPorEmail(email) {
  try {
    const response = await axios.get(`${API_URL}/email/${email}`);
    console.log('Contacto encontrado:', response.data);
  } catch (error) {
    console.error('Error al buscar contacto:', error.response?.data?.message || error.message);
  }
}

/**
 * ! Función que realiza una solicitud DELETE para eliminar un contacto por ID.
 * @param {string} id - El ID del contacto a eliminar.
 */
async function eliminarContacto(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log('Contacto eliminado:', response.data);
  } catch (error) {
    console.error('Error al eliminar contacto:', error.response?.data?.message || error.message);
  }
}

// * Exportar la función para iniciar el cliente desde Express
export function iniciarCliente() {
  menu();
}
