import axiosClient from "./axiosClient";

const CompanyAPI = {
    getAll: async () =>  {
        return axiosClient.get(`/organization/getAll`);
    },

    getList: async (data) =>  {
        return axiosClient.get(`/organization/list?page=${data.page}&limit=${data.limit}&money=${data.money}&startDate=${data.startDate}&status=${data.status}`);
    },

    getById: async (id) => {
        return axiosClient.get(`/organization?id=${id}`);
    },

    getAllUsers: async (data) =>  {
        return axiosClient.get(`/organization/getAllUsers?limit=${data.limit}&page=${data.page}`);
    },

    getUsers: async (data) => {
        return axiosClient.get(`/organization/getUsers?limit=${data.limit}&page=${data.page}&organizationId=${data.id}&status=${data.status}`);
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