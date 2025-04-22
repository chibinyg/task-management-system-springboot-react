import axios from "axios";
import { getToken } from "./AuthService.js";

const API_URL = "http://localhost:8080/user";

// Add a request interceptor
axios.interceptors.request.use(function (config) {

    config.headers['Authorization'] = getToken();

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export const getUser = () => axios.get(API_URL)

export const updateUser = (user) => axios.put(`${API_URL}/update-user`, user)