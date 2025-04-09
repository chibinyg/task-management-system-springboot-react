import axios from "axios";
import { getToken } from "./AuthService.js";

const API_URL = "http://localhost:8080";

// Add a request interceptor
axios.interceptors.request.use(function (config) {

    config.headers['Authorization'] = getToken();

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export const getTasks = () => axios.get(`${API_URL}/tasks`);

export const getTaskById = (id) => axios.get(`${API_URL}/tasks/${id}`);

export const addTask = (categoryId, task) => axios.post(`${API_URL}/categories/${categoryId}/tasks`, task);

export const updateTask = (id, task) => axios.put(`${API_URL}/tasks/${id}`, task);

export const deleteTask = (id) => axios.delete(`${API_URL}/tasks/${id}`);