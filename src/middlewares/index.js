import Boom from '@hapi/boom';

/**
 * ! Middleware para registrar errores
 * ? Este middleware registra los errores que ocurren en la aplicación y los pasa al siguiente middleware.
 * @param {object} err - El error que ha ocurrido.
 * @param {object} req - El objeto de solicitud HTTP.
 * @param {object} res - El objeto de respuesta HTTP.
 * @param {function} next - Función para pasar el control al siguiente middleware.
 */
function logErrors(err, req, res, next) {
  console.log(err); // * Imprime el error en la consola para depuración
  next(err); // * Pasa el error al siguiente middleware
};

/**
 * ! Middleware para manejar errores tipo Boom
 * ? Si el error es de tipo Boom, devuelve una respuesta con el formato específico de Boom.
 * @param {object} err - El error que ha ocurrido.
 * @param {object} req - El objeto de solicitud HTTP.
 * @param {object} res - El objeto de respuesta HTTP.
 * @param {function} next - Función para pasar el control al siguiente middleware.
 */
function boomError(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err; // * Obtiene el código de estado y el mensaje formateado de Boom
    res.status(output.statusCode).json(output.payload); // * Responde con el error formateado por Boom
  } else {
    next(err); // * Si no es un error Boom, pasa el error al siguiente middleware
  }
};

/**
 * ! Middleware general para manejar errores
 * ? Este middleware devuelve una respuesta de error genérica en formato JSON.
 * @param {object} err - El error que ha ocurrido.
 * @param {object} req - El objeto de solicitud HTTP.
 * @param {object} res - El objeto de respuesta HTTP.
 * @param {function} next - Función para pasar el control al siguiente middleware.
 */
function errorHanlder(err, req, res, next) {
  res.status(500).json({
    message: err.message, // * Devuelve el mensaje del error
    stack: err.stack, // * Devuelve la pila de llamadas para facilitar la depuración
  });
};

// * Exporta los middlewares para ser utilizados en la aplicación
export { logErrors, errorHanlder, boomError };
