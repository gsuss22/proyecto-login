// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { register } from '../services/authService'; // Importamos nuestra función de registro

function RegisterForm() {
    // Usamos un solo estado que es un objeto para todos los campos del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        paterno: '',
        materno: '',
        telefono: '',
        correo: '',
        pass_hash: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Manejador para actualizar el estado cuando el usuario escribe en un input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, // Mantenemos los valores anteriores
            [name]: value, // Actualizamos el campo que cambió
        });
    };

    // Manejador para cuando se envía el formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitamos que la página se recargue
        setError(''); // Limpiamos errores previos
        setSuccess('');

        try {
            const response = await register(formData);
            setSuccess(response.data.message); // Mostramos mensaje de éxito
        } catch (err) {
            // Si hay un error, lo mostramos
            setError(err.response?.data?.error || 'Ocurrió un error al registrarse.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registro</h2>
            {/* Mostramos mensajes de error o éxito */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            {/* Creamos un input para cada campo del formulario */}
            <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
            <input type="text" name="paterno" placeholder="Apellido Paterno" onChange={handleChange} required />
            <input type="text" name="materno" placeholder="Apellido Materno" onChange={handleChange} />
            <input type="tel" name="telefono" placeholder="Teléfono" onChange={handleChange} />
            <input type="email" name="correo" placeholder="Correo Electrónico" onChange={handleChange} required />
            <input type="password" name="pass_hash" placeholder="Contraseña" onChange={handleChange} required />

            <button type="submit">Registrarse</button>
        </form>
    );
}

export default RegisterForm;