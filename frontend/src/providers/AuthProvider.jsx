import React, {createContext, useState, useEffect} from 'react';
import config from "./apiConfig.js";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && token !== 'undefined') {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const register = async (firstname, lastname, email, password) => {
        const response = await fetch(`${config.apiBaseUrl}/auth/register`, {
            method: 'POST',
            headers: config.getHeaders(),
            body: JSON.stringify({firstname, lastname, email, password})
        });
        console.log('Register response:', response);

        if (response.ok) {
            const data = await response.json();
            console.log('Register data:', data);
            handleStoreData(data);
        }
    }

    const login = async (email, password) => {
        const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
            method: 'POST',
            headers: config.getHeaders(),
            body: JSON.stringify({email, password})
        });

        if (response.ok) {
            const data = await response.json();
            handleStoreData(data);
        }
    };

    const handleStoreData = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('bookings', JSON.stringify(data.bookings));
        localStorage.setItem('loans', JSON.stringify(data.loans));
        localStorage.setItem('loansReturned', JSON.stringify(data.loansReturned));
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('bookings');
        localStorage.removeItem('loans');
        localStorage.removeItem('loansReturned');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, register, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
};