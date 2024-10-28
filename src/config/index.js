import dotenv from 'dotenv';

dotenv.config();

const config = {
  env: process.env.NODE_ENV || "",
  host: process.env.HOST || "",
  port: process.env.PORT || "",
  dbUser: process.env.DB_USER || "",
  dbPassword: process.env.DB_PASSWORD || "",
  dbHost: process.env.DB_HOST || "",
  dbName: process.env.DB_NAME || "",
  dbPort: process.env.DB_PORT || "",

};

export { config };