import axiosClient from "./axiosClient";

const PermissionAPI = {
    getAll: async () =>  {
        return await axiosClient.get(`/permission/getAll`);
    },

    getById: async (id) => {
        return await axiosClient.get(`/permission?id=${id}`);
    },

    getByRole: async (role) => {
        return await axiosClient.get(`/permission?role=${role}`);
    },
}

export default PermissionAPI;