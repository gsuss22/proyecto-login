// Importamos las herramientas que necesitamos
const bcrypt = require('bcryptjs'); // Para hashear contraseñas
const jwt = require('jsonwebtoken'); // Para crear JSON Web Tokens
const db = require('../db'); // Nuestro módulo de conexión a la BD

// --- Controlador para registrar un nuevo usuario ---
const registerUser = async (req, res) => {
    try {
        // 1. Desestructuramos el cuerpo de la petición para obtener los datos
        const { nombre, paterno, materno, telefono, correo, contraseña } = req.body;

        // 2. Verificamos si el correo ya existe en la base de datos
        const userExists = await db.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        // 3. Hasheamos la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10); // Generamos un 'salt' para mayor seguridad
        const contraseña_hasheada = await bcrypt.hash(contraseña, salt);

        // 4. Insertamos el nuevo usuario en la base de datos
        const newUser = await db.query(
            'INSERT INTO usuarios (nombre, paterno, materno, telefono, correo, contraseña_hasheada) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, correo, rol',
            [nombre, paterno, materno, telefono, correo, contraseña_hasheada]
        );

        // 5. Enviamos una respuesta de éxito
        res.status(201).json({
            message: 'Usuario registrado exitosamente.',
            user: newUser.rows[0],
        });

    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ error: 'Hubo un error en el servidor.' });
    }
};

// --- Controlador para iniciar sesión ---
const loginUser = async (req, res) => {
    try {
        // 1. Obtenemos el correo y la contraseña del cuerpo de la petición
        const { correo, contraseña } = req.body;

        // 2. Buscamos al usuario por su correo
        const user = await db.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Credenciales inválidas.' }); // Mensaje genérico por seguridad
        }

        // 3. Comparamos la contraseña enviada con la hasheada en la BD
        const validPassword = await bcrypt.compare(contraseña, user.rows[0].contraseña_hasheada);
        if (!validPassword) {
            return res.status(400).json({ error: 'Credenciales inválidas.' });
        }

        // 4. Si todo es correcto, creamos el JSON Web Token (JWT)
        const token = jwt.sign(
            { id: user.rows[0].id, rol: user.rows[0].rol }, // Payload del token
            process.env.JWT_SECRET, // Clave secreta desde .env
            { expiresIn: '1h' } // El token expira en 1 hora
        );

        // 5. Enviamos el token al cliente
        res.json({ token });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Hubo un error en el servidor.' });
    }
};

// Exportamos los controladores
module.exports = {
    registerUser,
    loginUser,
};