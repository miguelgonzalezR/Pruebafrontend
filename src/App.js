import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/Main';
import PrivateRoute from './components/PrivateRoute';
import AgregarProducto from './components/Productos/AgregarProducto'; 
import EditarProducto from './components/Productos/EditarProducto'; 
import Usuarios from './components/Usuarios/Usuarios'; 
import AddUsuarios from './components/Usuarios/AgregarUsuario';
import EditUsuarios from './components/Usuarios/EditarUsuario';
import PrimerUser from './components/Usuarios/PrimerUser';
import ProductosPublico from './components/Productos/Productos';
import Navbar from './components/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
    const [hasUsers, setHasUsers] = useState(true); // Estado para verificar si hay usuarios en la BD
    const isAuthenticated = !!localStorage.getItem('token'); // Verificar si el usuario está autenticado

    useEffect(() => {
        const checkUsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/check-users');
                const data = await response.json();
                setHasUsers(data.hasUsers);
            } catch (error) {
                console.error('Error al verificar usuarios:', error);
            }
        };

        checkUsers();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remover el token de localStorage
        window.location.href = '/login'; // Redirigir al login
    };

    return (
        <Router>
            <div>
                <Navbar />

                <Routes>
                    {/* Ruta para el login */}
                    <Route path="/login" element={<Login />} />

                    {/* Ruta solo accesible si no hay usuarios en la base de datos */}
                    {!hasUsers && (
                        <Route path="/primer-usuario" element={<PrimerUser />} />
                    )}

                    {/* Ruta pública para ver productos */}
                    <Route path="/productos-publico" element={<ProductosPublico />} />

                    {/* Rutas protegidas */}
                    <Route path="/Main" element={<PrivateRoute element={Dashboard} />} />
                    <Route path="/agregar-producto" element={<PrivateRoute element={AgregarProducto} />} />
                    <Route path="/edit-producto/:id" element={<PrivateRoute element={EditarProducto} />} />
                    <Route path="/Usuarios" element={<PrivateRoute element={Usuarios} role="Administrador" />} />
                    <Route path="/agregar-Usuarios" element={<PrivateRoute element={AddUsuarios} role="Administrador" />} />
                    <Route path="/edit-Usuarios/:id" element={<PrivateRoute element={EditUsuarios} role="Administrador" />} />

                    {/* Redireccionar a /login por defecto si no está autenticado */}
                    <Route path="/" element={isAuthenticated ? <Navigate to="/Main" /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
