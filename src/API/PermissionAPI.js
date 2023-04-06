import axiosClient from "./axiosClient";

const PermissionAPI = {
    getAll: () =>  {
        return axiosClient.get(`/permission/getAll`);
    },

    getById: (id) => {
        return axiosClient.get(`/permission?id=${id}`);
    },

    getByRole: (role) => {
        return axiosClient.get(`/permission?role=${role}`);
    },
}

export default PermissionAPI;