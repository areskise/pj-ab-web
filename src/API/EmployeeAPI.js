import axiosClient from "./axiosClient";

const EmployeeAPI = {
    getAll: async (data) =>  {
        return axiosClient.get(`/user/list?limit=${data.limit}&page=${data.page}&status=${data.status}`);
    },

    getById: async (id) => {
        return await axiosClient.get(`/user/list?id=${id}`);
    },

    getOrganizations: async (id) => {
        return await axiosClient.get(`/user/getOrganizations?id=${id}`);
    },

    getRoles: async (id) => {
        return await axiosClient.get(`/user/getRoles?id=${id}`);
    },

    create: async (body) => {
        return await axiosClient.post(`/user`, body);
    },

    update: async (body) => {
        return await axiosClient.put(`/user`, body);
    },

    updateRole: async (body) => {
        return await axiosClient.put(`/user/updateRole`, body);
    },

    changePass: async (body) => {
        return await axiosClient.put(`/user/password`, body);
    },

    setPass: async (body) => {
        return await axiosClient.put(`/user/setPassword`, body);
    },
}

export default EmployeeAPI;