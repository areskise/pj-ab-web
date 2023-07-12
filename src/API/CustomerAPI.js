import axiosClient from "./axiosClient";

const CustomerAPI = {
    get: async (id) =>  {
        return await axiosClient.get(`/cus?id=${id}`);
    },

    getList: async (body) => {
        const {limit, page, status, organizationId} = body
        console.log(organizationId);
        return await axiosClient.get(`/cus/list?organizationId=${organizationId}`);
    },

    getCount: async () => {
        return await axiosClient.get(`/cus/count`);
    },

    create: async (body) => {
        return await axiosClient.post(`/cus`, body);
    },

    update: async (body) => {
        return await axiosClient.put(`/cus`, body);
    },
}

export default CustomerAPI;