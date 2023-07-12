import axiosClient from "./axiosClient";

const RoleAPI = {
    getAll: async () =>  {
        return await axiosClient.get(`/role/getAll`);
    },

    getById: async (id) => {
        return await axiosClient.get(`/role?id=${id}`);
    },

    getByCompany: async (organizationId) => {
        return await axiosClient.get(`/role?organizationId=${organizationId}`);
    },

    create: async (body) => {
        return await axiosClient.post(`/role`, body);
    },

    update: async (body) => {
        return await axiosClient.put(`/role`, body);
    },
}

export default RoleAPI;