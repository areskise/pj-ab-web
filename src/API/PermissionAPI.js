import axiosClient from "./axiosClient";

const PermissionAPI = {
    getAll: async () =>  {
        return axiosClient.get(`/permission/getAll`);
    },

    getById: async (id) => {
        return axiosClient.get(`/permission?id=${id}`);
    },

    getByRole: async (role) => {
        return axiosClient.get(`/permission?role=${role}`);
    },
}

export default PermissionAPI;