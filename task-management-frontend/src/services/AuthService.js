import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const register = (user) => axios.post(`${API_URL}/register`, user);

export const login = (user) => axios.post(`${API_URL}/login`, user);

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (username) => sessionStorage.setItem("authenticatedUser", username);

export const isUserLoggedIn = () => {

    const username = sessionStorage.getItem("authenticatedUser");

    if (username == null) {
        return false;
    }
    else {
        return true;
    }
}

export const getLoggedInUser = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    return username;
}

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}