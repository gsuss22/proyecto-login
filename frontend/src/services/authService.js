// src/services/authService.js
import axios from 'axios';

// Creamos una instancia de axios con la URL base de nuestra API
// para no tener que repetirla en cada llamada.
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
});

// Función para registrar un nuevo usuario
export const register = (userData) => {
    // userData es un objeto con: nombre, paterno, materno, etc.
    return apiClient.post('/register', userData);
};

// Función para iniciar sesión
export const login = (credentials) => {
    // credentials es un objeto con: correo y contraseña
    return apiClient.post('/login', credentials);
};