import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarProducto = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducto = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`http://localhost:8000/api/producto/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener el producto');
                }

                const data = await response.json();
                setNombre(data.nombre);
                setDescripcion(data.descripcion);
                setPrecio(data.Precio);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProducto();
    }, [id]);

    const handleActualizarProducto = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:8000/api/productos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ nombre, descripcion, precio }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }

            // Redirigir al dashboard después de actualizar el producto
            navigate('/Main');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Editar Producto</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleActualizarProducto}>
                <div className="form-group mb-3">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Actualizar Producto
                </button>
            </form>
        </div>
    );
};

export default EditarProducto;
