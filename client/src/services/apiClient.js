import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://chatflow-7can.onrender.com/api'
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default apiClient;