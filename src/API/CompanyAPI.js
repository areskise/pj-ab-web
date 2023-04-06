import axiosClient from "./axiosClient";

const CompanyAPI = {
    getAll: () =>  {
        return axiosClient.get(`/organization/getAll`);
    },

    getById: (id) => {
        return axiosClient.get(`/organization?id=${id}`);
    },

    getUsers: (id) => {
        return axiosClient.get(`/organization/getUsers?id=${id}`);
    },

    getRoles: (id) => {
        return axiosClient.get(`/organization/getRoles?id=${id}`);
    },

    create: (body) => {
        return axiosClient.post(`/organization`, body);
    },

    update: (body) => {
        return axiosClient.put(`/organization`, body);
    },
}

export default CompanyAPI;