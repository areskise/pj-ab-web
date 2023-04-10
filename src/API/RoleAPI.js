import axiosClient from "./axiosClient";

const RoleAPI = {
    getAll: async () =>  {
        return axiosClient.get(`/role/getAll`);
    },

    getById: async (id) => {
        return axiosClient.get(`/role?id=${id}`);
    },

    getByCompany: async (organizationId) => {
        return axiosClient.get(`/role?organizationId=${organizationId}`);
    },

    create: async (body) => {
        return axiosClient.post(`/role`, body);
    },

    update: async (body) => {
        return axiosClient.put(`/role`, body);
    },
}

export default RoleAPI;