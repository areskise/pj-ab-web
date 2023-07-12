import axiosClient from './axiosClient';

const ApplicationAPI = {
    getAll: async () => {
        return await axiosClient.get(`/application/all`);
    },

    getById: async (id) => {
        return await axiosClient.get(`/application?id=${id}`);
    },
}

export default ApplicationAPI;