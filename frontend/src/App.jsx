// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div>
      {/* Menú de navegación simple */}
      <nav>
        <Link to="/login">Iniciar Sesión</Link> | <Link to="/register">Registrarse</Link>
      </nav>

      <hr />

      {/* Área donde se renderizará el componente de la ruta actual */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;