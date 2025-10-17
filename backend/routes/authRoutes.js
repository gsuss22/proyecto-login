// Importamos express y su funcionalidad de Router
const { Router } = require('express');
const router = Router();

// Importamos los controladores que manejarán la lógica
const { registerUser, loginUser } = require('../controllers/authController');

// Definimos las rutas y el método HTTP correspondiente
// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Exportamos el router para poder usarlo en nuestro archivo principal
module.exports = router;