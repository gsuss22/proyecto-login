// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { login } from '../services/authService'; // Importamos la función de login

function LoginForm() {
    const [formData, setFormData] = useState({
        correo: '',
        pass_hash: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, // Mantenemos los valores anteriores
            [name]: value, // Actualizamos el campo que cambió
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await login(formData);
            // Si el login es exitoso, el backend nos da un token
            const { token } = response.data;

            // Guardamos el token en el almacenamiento local del navegador
            // Esto nos mantendrá "logueados"
            localStorage.setItem('token', token);

            // Opcional: Redirigir al usuario a un dashboard o página principal
            alert('¡Inicio de sesión exitoso!');
            // window.location.href = '/dashboard'; // Descomentar para redirigir
        } catch (err) {
            setError(err.response?.data?.error || 'Ocurrió un error al iniciar sesión.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input type="email" name="correo" placeholder="Correo Electrónico" onChange={handleChange} required />
            <input type="password" name="pass_hash" placeholder="Contraseña" onChange={handleChange} required />

            <button type="submit">Entrar</button>
        </form>
    );
}

export default LoginForm;