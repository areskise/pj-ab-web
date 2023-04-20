import axiosClient from "./axiosClient";

const CompanyAPI = {
    getAll: async (data) =>  {
        return axiosClient.get(`/organization/getAll?page=${data.page}&limit=${data.limit}`);
    },

    getList: async () =>  {
        return axiosClient.get(`/organization/list`);
    },

    getById: async (id) => {
        return axiosClient.get(`/organization?id=${id}`);
    },

    getUsers: async (data) => {
        return axiosClient.get(`/organization/getUsers?limit=${data.limit}&page=${data.page}&query={"organizationId":${data.id}}`);
    },

    getRoles: async (id) => {
        console.log(id);
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