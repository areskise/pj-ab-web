import axiosClient from "./axiosClient";

const AuthAPI = {
    login: (body) => {
        return axiosClient.post(`/auth/login`, body);
    },

    refresh: (body) => {
        return axiosClient.put(`/auth/refresh`, body);
    },
}

export default AuthAPI;