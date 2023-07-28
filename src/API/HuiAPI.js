import axiosClient from "./axiosClient";

const HuiAPI = {
    get: async (id) =>  {
        return await axiosClient.get(`/hui?id=${id}`);
    },

    getList: async (body) =>  {
        const {limit, page, status, organizationId} = body
        return await axiosClient.get(`/hui/list?organizationId=${organizationId}&page=${page}&limit=${limit}`);
    },

    getConst: async () => {
        return await axiosClient.get(`/const/list`);
    },

    getCount: async () => {
        return await axiosClient.get(`/hui/count`);
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