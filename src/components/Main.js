import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductos = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch('http://localhost:8000/api/productos', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los productos');
                }

                const data = await response.json();
                setProductos(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProductos();
    }, []);


    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:8000/api/productos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }

            // Filtrar los productos para eliminar el producto borrado
            setProductos(productos.filter(producto => producto.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-producto/${id}`);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleAgregarProducto = () => {
        navigate('/agregar-producto');
    };


    const logout = async () => {
        const token = localStorage.getItem('token');

        // Llamar a la API para cerrar la sesión en el backend
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        // Eliminar el token de localStorage
        localStorage.removeItem('token');

        // Redirigir al usuario a la página de login
        navigate('/login');
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!productos.length) {
        return <div>Cargando productos...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Lista de Productos</h2>
            <button 
                className="btn btn-success mb-3"
                onClick={handleAgregarProducto}
            >
                Agregar Producto
            </button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>${producto.Precio}</td>
                            <td>
                                <button 
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(producto.id)}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(producto.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    );
};

export default Dashboard;
