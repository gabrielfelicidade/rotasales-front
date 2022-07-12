import axios from "axios";
import { environment } from "../environment/Environment"

const axiosInstance = axios.create({
    baseURL: environment.API_URL
});

export default axiosInstance

export const setupInterceptors = (logoff, requests) => {
    axiosInstance.interceptors.request.use((request) => {
        if (request.method !== 'OPTIONS') {
            requests.newRequest();
        }

        return request
    }, async (error) => {
        requests.endRequest();

        return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use((response) => {
        if (response.method !== 'OPTIONS') {
            requests.endRequest();
        }

        return response
    }, async (error) => {
        requests.endRequest();

        if (error.response.status === 401) {
            logoff();
        }

        return Promise.reject(error);
    });
}