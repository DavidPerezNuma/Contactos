// * Carga las variables de entorno definidas en el archivo .env
import dotenv from 'dotenv';

// * Inicializa dotenv para cargar las variables de entorno en process.env
dotenv.config();

// * Objeto de configuración que almacena todas las variables de entorno necesarias para la aplicación
// TODO: Asegurarse de que todas las variables críticas estén definidas en .env antes de ejecutar la aplicación
const config = {
  env: process.env.NODE_ENV || "",           // ? Define el entorno de la aplicación (dev, prod, etc.)
  host: process.env.HOST || "",              // ? Define el host donde corre la aplicación
  port: process.env.PORT || "",              // ? Puerto en el que se ejecuta el servidor
  dbUser: process.env.DB_USER || "",         // ? Usuario de la base de datos
  dbPassword: process.env.DB_PASSWORD || "", // ? Contraseña del usuario de la base de datos
  dbHost: process.env.DB_HOST || "",         // ? Host de la base de datos
  dbName: process.env.DB_NAME || "",         // ? Nombre de la base de datos
  dbPort: process.env.DB_PORT || "",         // ? Puerto de conexión a la base de datos
};

// * Exporta el objeto de configuración para que esté disponible en toda la aplicación
export { config };
