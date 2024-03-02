import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ user, redirectPath = '/signin' }) => {
    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
