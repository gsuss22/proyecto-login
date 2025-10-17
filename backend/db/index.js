// Importamos el paquete pg
const { Pool } = require('pg');

// Importamos dotenv para usar las variables de entorno
require('dotenv').config();

// Creamos una instancia de Pool con la configuración desde las variables de entorno
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Exportamos una función para hacer consultas a la base de datos
module.exports = {
    query: (text, params) => pool.query(text, params),
};