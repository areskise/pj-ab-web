import axiosClient from "./axiosClient";

const RoleAPI = {
    getAll: () =>  {
        return axiosClient.get(`/role/getAll`);
    },

    getById: (id) => {
        return axiosClient.get(`/role?id=${id}`);
    },

    getByCompany: (organizationId) => {
        return axiosClient.get(`/role?organizationId=${organizationId}`);
    },

    create: (body) => {
        return axiosClient.post(`/role`, body);
    },

    update: (body) => {
        return axiosClient.put(`/role`, body);
    },
}

export default RoleAPI;