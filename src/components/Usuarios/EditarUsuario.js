import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarUsuario = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('Empleado');
    const [password, setPassword] = useState('');
    const [sexo, setSexo] = useState('Masculino');
    const [area, setArea] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuario = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`http://localhost:8000/api/VerPro/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener el usuario');
                }

                const data = await response.json();
                setNombre(data.name);
                setApellido(data.apellido);
                setEmail(data.email);
                setArea(data.area);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUsuario();
    }, [id]);

    const handleActualizarUsuario = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:8000/api/EditarUser/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name: nombre, apellido, email, rol, sexo, area }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el usuario');
            }

            navigate('/Usuarios');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Editar Usuario</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleActualizarUsuario}>
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
                    <label>Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                
                <div className="form-group mb-3">
                    <label>Rol</label>
                    <select
                        className="form-control"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        required
                    >
                        <option value="Empleado" selected>Empleado</option>
                        <option value="Administrador">Administrador</option>
                        
                    </select>
                </div>

                <div className="form-group mb-3">
                    <label>Sexo</label>
                    <select
                        className="form-control"
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                        required
                    >

                        <option value="Masculino" selected>Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </div>


                <div className="form-group mb-3">
                    <label>Area</label>
                    <input
                        type="text"
                        className="form-control"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Actualizar Usuario
                </button>
            </form>
        </div>
    );
};

export default EditarUsuario;
