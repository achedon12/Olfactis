const config = {
    apiBaseUrl: 'http://localhost:2501/api',
    baseUrl: 'http://localhost:2501/',
    getHeaders: () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
    }),
};

export default config;