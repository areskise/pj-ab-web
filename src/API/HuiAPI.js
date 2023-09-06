import axiosClient from "./axiosClient";

const HuiAPI = {
    get: async (id) =>  {
        return await axiosClient.get(`/hui?id=${id}`);
    },

    getList: async (body) =>  {
        const {limit, page, organizationId} = body
        if(organizationId) {
            return await axiosClient.get(`/hui/list?query={"organizationId":"${organizationId}"}&page=${page}&limit=${limit}`);
        }
        return await axiosClient.get(`/hui/list?page=${page}&limit=${limit}`); 
    },

    getListComingSoon: async () => {
        return await axiosClient.get(`/hui/getListComingSoon`);
    },

    getConst: async () => {
        return await axiosClient.get(`/const/list`);
    },

    getCount: async () => {
        return await axiosClient.get(`/hui/count`);
    },

    getReport: async (id) => {
        return await axiosClient.get(`/hui/report?id=${id}`);
    },

    create: async (body) => {
        return await axiosClient.post(`/hui`, body);
    },

    update: async (body) => {
        return await axiosClient.put(`/hui`, body);
    },

    delete: async (id) => {
        return await axiosClient.delete(`/hui?id=${id}`);
    },
}

export default HuiAPI;