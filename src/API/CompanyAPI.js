import axiosClient from "./axiosClient";

const CompanyAPI = {
    getAll: async () =>  {
        return axiosClient.get(`/organization/getAll`);
    },

    getById: async (id) => {
        return axiosClient.get(`/organization?id=${id}`);
    },

    getUsers: async (id) => {
        return axiosClient.get(`/organization/getUsers?id=${id}`);
    },

    getRoles: async (id) => {
        return axiosClient.get(`/organization/getRoles?id=${id}`);
    },

    create: async (body) => {
        return axiosClient.post(`/organization`, body);
    },

    update: async (body) => {
        return axiosClient.put(`/organization`, body);
    },
}

export default CompanyAPI;