import axios from "axios";
import { getToken } from "./AuthService.js";

const API_URL = "http://localhost:8080/categories";

// Add a request interceptor
axios.interceptors.request.use(function (config) {

    config.headers['Authorization'] = getToken();

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export const getCategories = () => axios.get(API_URL)

export const getCategoryById = (id) => axios.get(`${API_URL}/${id}`)

export const addCategory = (category) => axios.post(API_URL, category)

export const updateCategory = (id, category) => axios.put(`${API_URL}/${id}`, category)

export const deleteCategory = (id) => axios.delete(`${API_URL}/${id}`)