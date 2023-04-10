import axiosClient from "./axiosClient";

const EmployeeAPI = {
    getAll: async () =>  {
        return axiosClient.get(`/user/list`);
    },

    getById: async (id) => {
        return axiosClient.get(`/user/list?id=${id}`);
    },

    create: async (body) => {
        return axiosClient.post(`/user`, body);
    },

    update: async (body) => {
        return axiosClient.put(`/user`, body);
    },

    changePass: async (body) => {
        return axiosClient.put(`/user/password`, body);
    },

    setPass: async (body) => {
        return axiosClient.put(`/user/setPassword`, body);
    },
}

export default EmployeeAPI;