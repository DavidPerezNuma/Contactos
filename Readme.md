# 📒 Proyecto Agenda de Contactos

Este proyecto es una **agenda de contactos** que permite a los usuarios **agregar**, **eliminar**, **buscar** y **ver contactos**. Cada contacto incluye un **nombre**, **número de teléfono** y **dirección de correo electrónico**. El sistema está basado en una API construida con **Node.js** y utiliza **MongoDB** como base de datos. Además, se proporciona un cliente interactivo para manejar los contactos desde la consola.

## 🗂️ Estructura del Proyecto

```
contactos/
│
├── src/
│   ├── client/
│   │   └── index.js             # 🖥️ Cliente interactivo en consola
│   ├── config/
│   │   └── index.js             # ⚙️ Configuración de las variables de entorno
│   ├── libs/
│   │   └── index.js             # 🔌 Configuración de conexión y librerías adicionales
│   ├── middlewares/
│   │   └── index.js             # 🚨 Middlewares para manejo de errores
│   ├── routers/
│   │   └── ContactosRouters.js  # 🛣️ Rutas específicas para el manejo de contactos
│   │   └── index.js             # 🚦 Enrutador principal
│   ├── services/
│   │   └── ContactoServices.js   # 📚 Lógica de negocio para la gestión de contactos
│
├── .dockerignore                 # 🐳 Archivos y carpetas ignorados por Docker
├── .env.example                  # 📝 Ejemplo de archivo de variables de entorno
├── docker-compose.yml            # 📦 Configuración de Docker Compose
├── Dockerfile                    # 📄 Dockerfile para construir la aplicación
├── package.json                  # 📦 Dependencias y scripts del proyecto
├── package-lock.json             # 🔒 Archivo de dependencias generado automáticamente
├── App.js                        # 🚀 Punto de entrada de la aplicación
├── .gitignore                    # 🚫 Archivos y carpetas ignorados por Git
└── README.md                     # 📖 Documentación del proyecto
```

## 📋 Requisitos Previos

- **🐳 Docker** y **Docker Compose** instalados.
- **Node.js** y **npm** instalados si deseas ejecutar el proyecto sin Docker.
- Copiar el archivo `.env.example` a `.env` con tus propias credenciales.

## ⚙️ Variables de Entorno

Para que la aplicación funcione correctamente, debes copiar el archivo `.env.example` y renombrarlo a `.env` en la raíz del proyecto, con las siguientes variables:

```
NODE_ENV=dev
HOST=127.0.0.1
PORT=3000

DB_USER=<tu_usuario_mongo>
DB_PASSWORD=<tu_password_mongo>
DB_HOST=<tu_host_mongo>
DB_NAME=<nombre_de_base_de_datos>
DB_PORT=27017
```

### 💡 Comando para copiar el archivo `.env.example`:
```bash
cp .env.example .env
```

## 🐳 Contenedores Docker

Este proyecto utiliza Docker y Docker Compose para manejar el despliegue de la aplicación y su base de datos de manera sencilla y consistente.

### Contenedores en uso:

1. **ExpressApp**:
   - **Imagen**: `node`
   - **Función**: Ejecuta la aplicación Node.js que contiene la API REST para manejar los contactos.
   - **Puertos**: 
     - Mapea el puerto `3000` del contenedor al puerto `3000` del host.
   - **Volumen**: El código fuente de la aplicación se monta en `/usr/src/app` dentro del contenedor para permitir la edición en tiempo real.
   - **Comando**: Usa `npm run dev` para iniciar la aplicación en modo desarrollo.

2. **MongoDB**:
   - **Imagen**: `mongo`
   - **Función**: Contenedor que ejecuta la base de datos MongoDB donde se almacenan los contactos.
   - **Puertos**: 
     - Mapea el puerto `27017` del contenedor al puerto `27017` del host, permitiendo conexiones locales a MongoDB.
   - **Volumen**: La carpeta `mongo_data` en el host se monta en `/data/db` dentro del contenedor, asegurando que los datos de MongoDB persistan.

3. **Console**:
   - **Función**: Permite interactuar con la API a través de un cliente en consola.
   - **Puertos**: Usa el puerto `3001` para evitar conflictos con la API principal.
   - **Comando**: Ejecuta `node src/client/index.js` para iniciar el cliente interactivo.

## 🚀 Pasos para Ejecutar el Proyecto

### Opción 1: Usar Docker

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/DavidPerezNuma/Contactos.git
   cd Contactos
   ```

2. **Crear el archivo `.env`**:
   Copia el archivo `.env.example` y renómbralo como `.env`:
   ```bash
   cp .env.example .env
   ```

3. **Configurar tus credenciales en el archivo `.env`**.

4. **Construir y ejecutar los contenedores**:
   ```bash
   docker-compose up --build
   ```

   Esto levantará tanto la aplicación en Node.js como una instancia de MongoDB dentro de contenedores.

5. **Acceso a la API**:
   La API estará disponible en `http://127.0.0.1:3000/api/v1/contactos`.

6. **Ejecutar el cliente interactivo**:
   Abre otro terminal y ejecuta el siguiente comando para interactuar con la API:
   ```bash
   docker-compose run console
   ```

### Opción 2: Ejecutar sin Docker

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/DavidPerezNuma/Contactos.git
   cd Contactos
   ```

2. **Instalar las dependencias**:
   ```bash
   npm install
   ```

3. **Crear el archivo `.env`**:
   Copia el archivo `.env.example` y renómbralo como `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Configurar tus credenciales en el archivo `.env`**.

5. **Levantar la aplicación**:
   ```bash
   npm run dev
   ```

   La API estará disponible en `http://127.0.0.1:3000/api/v1/contactos`.

6. **Ejecutar el cliente interactivo**:
   Para interactuar con la API desde la consola, ejecuta:
   ```bash
   npm run client
   ```

## 🔌 Endpoints de la API

- **GET /contactos**: Obtener todos los contactos.
- **POST /contactos**: Agregar un nuevo contacto. Se requiere enviar un JSON con `nombre`, `telefono`, y `email`.
- **DELETE /contactos/:id**: Eliminar un contacto por ID.
- **GET /contactos/nombre/:nombre**: Buscar un contacto por nombre.
- **GET /contactos/telefono/:telefono**: Buscar un contacto por teléfono.
- **GET /contactos/email/:email**: Buscar un contacto por correo electrónico.

## ✨ Autores

- **David Pérez Numa**  
  Email: [juperez49@unisalle.edu.co](mailto:juperez49@unisalle.edu.co)

- **Anner Alexis Carabali**  
  Email: [acarabali68@unisalle.edu.co](mailto:acarabali68@unisalle.edu.co)

- **Andrés Felipe Rodríguez Martínez**  
  Email: [androdriguez48@unisalle.edu.co](mailto:androdriguez48@unisalle.edu.co)
