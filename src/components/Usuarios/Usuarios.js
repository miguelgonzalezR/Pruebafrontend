import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch('http://localhost:8000/api/Users', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los usuarios');
                }

                const data = await response.json();
                setUsuarios(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUsuarios();
    }, []);

    const handleEliminar = async (id) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:8000/api/EliminarUser/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el usuario');
            }

            setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditar = (id) => {
        navigate(`/edit-Usuarios/${id}`);
    };

    const handleAgregar = () => {
        navigate('/agregar-Usuarios');
    };

    return (
        <div className="container mt-5">
            <h2>Lista de Usuarios</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-primary mb-3" onClick={handleAgregar}>Agregar Usuario</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.name}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.rol}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEditar(usuario.id)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => handleEliminar(usuario.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Usuarios;
