import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.PROD
        ? 'https://nebs-it-notice-board.onrender.com/api' // Live Backend
        : 'http://localhost:5000/api', // Local Backend
});

export default api;
