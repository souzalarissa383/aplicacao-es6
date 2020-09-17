import axios from 'axios';

// criar config 
const api = axios.create({
    baseURL: 'https://api.github.com',
});

export default api;