import axiosClient from "./axiosClient";

const AuthAPI = {
    login: async (body) => {
        return axiosClient.post(`/auth/login`, body);
    },

    refresh: async (body) => {
        return axiosClient.post(`/auth/refresh`, body);
    },
}

export default AuthAPI;