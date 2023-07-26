import axiosClient from "./axiosClient";

const HuiAPI = {
    get: async (body) =>  {
        const {limit, page, status, id} = body
        return await axiosClient.get(`/hui?id=${id}`);
    },

    getList: async (body) =>  {
        const {limit, page, status, organizationId} = body
        return await axiosClient.get(`/hui/list?organizationId=${organizationId}`);
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