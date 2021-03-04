import axios from "axios";

const BASE_URL = 'http://localhost:8080'
const axiosInstance = axios.create({
    baseURL: BASE_URL
});

export default axiosInstance

axiosInstance.interceptors.response.use((response) => {
    return response
}, async (error) => {
    if (error.response.status === 403) {
        localStorage.removeItem('token');
    }

    return Promise.reject(error);
})