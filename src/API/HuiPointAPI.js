import axiosClient from "./axiosClient";

const HuiPointAPI = {
    getList: async () =>  {
        return await axiosClient.get(`/huiPoint/list`);
    },

    getById: async (id) =>  {
        return await axiosClient.get(`/huiPoint?id=${id}`);
    },

    getChains: async (body) =>  {
        const {huiId, periodicHui} = body
        return await axiosClient.get(`/huiPoint/chains?huiId=${huiId}&periodicHui=${periodicHui}`); 
    },

    confirm: async (body) => {
        return await axiosClient.post(`/huiPoint/confirm`, body);
    },

    unConfirm: async (body) => {
        return await axiosClient.post(`/huiPoint/unConfirm`, body);
    },

    push: async (body) => {
        return await axiosClient.put(`/huiPoint/push`, body);
    },

    create: async (body) => {
        return await axiosClient.post(`/huiPoint`, body);
    },

    update: async (body) => {
        return await axiosClient.put(`/huiPoint`, body);
    },

    delete: async (id) => {
        return await axiosClient.delete(`/huiPoint?id=${id}`);
    },
}

export default HuiPointAPI;