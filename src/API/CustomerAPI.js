import axiosClient from "./axiosClient";

const CustomerAPI = {
    get: async (id) =>  {
        return await axiosClient.get(`/cus?id=${id}`);
    },

    getList: async (body) => {
        const {limit, page, status, organizationId} = body
        if(organizationId) {
            return await axiosClient.get(`/cus/list?query={"organizationId":"${organizationId}"}&page=${page}&limit=${limit}`);
        }
        return await axiosClient.get(`/cus/list?page=${page}&limit=${limit}`)
    },

    getCount: async (organizationId) => {
        return await axiosClient.get(`/cus/count?organizationId=${organizationId}`);
    },

    create: async (body) => {
        return await axiosClient.post(`/cus`, body);
    },

    update: async (body) => {
        return await axiosClient.put(`/cus`, body);
    },
}

export default CustomerAPI;