import axios from "axios";
import { environment } from "../environment/Environment"

const axiosInstance = axios.create({
    baseURL: environment.API_URL
});

export default axiosInstance

export const setupInterceptors = (logoff) => {
    axiosInstance.interceptors.response.use((response) => {
        return response
    }, async (error) => {
        if (error.response.status === 401) {
            logoff();
        }

        return Promise.reject(error);
    });
}