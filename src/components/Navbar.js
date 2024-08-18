import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [hasUsers, setHasUsers] = useState(true); // Por defecto, asumimos que hay usuarios
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        // Verificar si ya existen usuarios en la base de datos
        const checkUsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/check-users');
                const data = await response.json();
                setHasUsers(data.hasUsers); // Actualizar el estado basado en la respuesta del servidor
            } catch (error) {
                console.error('Error al verificar usuarios:', error);
            }
        };

        checkUsers();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Mi App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to="/productos-publico">Listado de productos</Link>
                        </li>

                        {/* Mostrar "Registrar Usuario" solo si no hay usuarios y no hay un token */}
                        {!token && !hasUsers && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/primer-usuario">Registrar primer usuario</Link>
                            </li>
                        )}
                        {token ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Main">Producto</Link>
                                </li>
                                {user && user.rol === 'Administrador' && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/usuarios">Usuarios</Link>
                                        </li>
                                    </>
                                )}
                                <li className="nav-item">
                                    <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
