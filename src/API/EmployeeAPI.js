import axiosClient from "./axiosClient";

const EmployeeAPI = {
    getAll: async (data) =>  {
        return axiosClient.get(`/user/list?limit=${data.limit}&page=${data.page}&status=${data.status}`);
    },

    getById: async (id) => {
        return axiosClient.get(`/user/list?id=${id}`);
    },

    getOrganizations: async (id) => {
        return axiosClient.get(`/user/getOrganizations?id=${id}`);
    },

    create: async (body) => {
        return axiosClient.post(`/user`, body);
    },

    update: async (body) => {
        return axiosClient.put(`/user`, body);
    },

    changePass: async (body) => {
        return axiosClient.put(`/user/password`, body);
    },

    setPass: async (body) => {
        return axiosClient.put(`/user/setPassword`, body);
    },
}

export default EmployeeAPI;