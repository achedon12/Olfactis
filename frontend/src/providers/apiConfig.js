const config = {
    apiBaseUrl: 'http://localhost:2501/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    }
};

export default config;