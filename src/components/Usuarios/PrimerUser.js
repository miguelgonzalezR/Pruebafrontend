import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AgregarUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('Administrador');
    const [password, setPassword] = useState('');
    const [sexo, setSexo] = useState('Masculino');
    const [area, setArea] = useState('');
    const [error, setError] = useState('');
    const [hasUsers, setHasUsers] = useState(false);
    const navigate = useNavigate();

    // Verificar si ya existen usuarios
    useEffect(() => {
        const checkUsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/check-users');
                const data = await response.json();
                if (data.hasUsers) {
                    setHasUsers(true);
                    navigate('/login'); // Redirigir si ya existen usuarios
                }
            } catch (err) {
                console.error('Error al verificar usuarios:', err);
            }
        };

        checkUsers();
    }, [navigate]);

    const handleAgregarUsuario = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/PrimerUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: nombre, apellido, email, password, rol, sexo, area }),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el usuario');
            }

            navigate('/login'); // Redirigir al login después de agregar el usuario
        } catch (err) {
            setError(err.message);
        }
    };

    // Si ya existen usuarios, no renderizar nada
    if (hasUsers) return null;

    return (
        <div className="container mt-5">
            <h2>Agregar primer usuario</h2>
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
                        minLength="8"
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
                        <option value="Masculino">Masculino</option>
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
