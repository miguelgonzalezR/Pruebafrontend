// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, role, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Verifica si el usuario es administrador
    if (role && user.rol !== role) {
        return <Navigate to="/Main" />;
    }

    return <Component {...rest} />;
};

export default PrivateRoute;
