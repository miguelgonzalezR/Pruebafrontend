import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgregarUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('Empleado');
    const [password, setPassword] = useState('');
    const [sexo, setSexo] = useState('Masculino');
    const [area, setArea] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAgregarUsuario = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:8000/api/registrarUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name: nombre, apellido, email, password, rol, sexo, area }),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el usuario');
            }

            navigate('/usuarios');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Agregar Usuario</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleAgregarUsuario}>
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
                    <label>Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    Agregar Usuario
                </button>
            </form><br></br>
        </div>
    );
};

export default AgregarUsuario;
