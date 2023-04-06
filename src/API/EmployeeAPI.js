import axiosClient from "./axiosClient";

const EmployeeAPI = {
    getAll: () =>  {
        return axiosClient.get(`/user/list`);
    },

    getById: (id) => {
        return axiosClient.get(`/user/list?id=${id}`);
    },

    create: (body) => {
        return axiosClient.post(`/user`, body);
    },

    update: (body) => {
        return axiosClient.put(`/user`, body);
    },

    changePass: (body) => {
        return axiosClient.put(`/user/password`, body);
    },

    setPass: (body) => {
        return axiosClient.put(`/user/setPassword`, body);
    },
}

export default EmployeeAPI;