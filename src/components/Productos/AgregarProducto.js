import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgregarProducto = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAgregarProducto = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:8000/api/Agregar_producto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ nombre, descripcion, precio }),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el producto');
            }

            // Redirigir al dashboard después de agregar el producto
            navigate('/Main');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Agregar Producto</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleAgregarProducto}>
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
                    Agregar Producto
                </button>
            </form>
        </div>
    );
};

export default AgregarProducto;
