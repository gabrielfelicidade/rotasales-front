import axios from "axios";

const BASE_URL = 'https://calm-brook-27784.herokuapp.com'
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