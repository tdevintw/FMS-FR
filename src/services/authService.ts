import axios from 'axios';

const API_URL = 'http://localhost:9999/api/auth/'; // Replace with your actual backend URL

interface RegisterData {
    username: string;
    email: string;
    password: string;
    role: string;
}

interface LoginData {
    username: string;
    password: string;
}

export const authService = {
    register: async (userData: RegisterData) => {

            const response = await axios.post(`${API_URL}register`, userData);
            return response.data;

    },

    login: async (credentials: LoginData) => {

            const response = await axios.post(`${API_URL}login`, credentials);
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;

    },

    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
};