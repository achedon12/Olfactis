import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate } from 'react-router-dom';
import {Loader} from "./index.js";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return <Loader />
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;