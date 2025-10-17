// Importamos dotenv para cargar las variables de entorno del archivo .env
require('dotenv').config();

// Importamos express
const express = require('express');
// Importamos cors
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

// Creamos la aplicación de express
const app = express();

// Configuramos CORS para permitir peticiones desde nuestro frontend
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones a JSON
app.use(express.json());

// Definimos una ruta de prueba
app.get('/', (req, res) => {
    res.send('¡El servidor backend está funcionando!');
});

// Rutas para el login
app.use('/api/auth', authRoutes);

// Definimos el puerto en el que correrá el servidor
const PORT = process.env.PORT || 3000;

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});