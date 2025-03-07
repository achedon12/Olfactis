import React, { createContext, useState, useEffect } from 'react';
import config from "./apiConfig.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstname, lastname, email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
        }
    }

    const login = async (email, password) => {
        const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, register, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};