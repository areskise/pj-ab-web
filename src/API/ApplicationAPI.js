import axiosClient from './axiosClient';

const ApplicationAPI = {
    getAll: async () => {
        return axiosClient.get(`/application/all`);
    },

    getById: async (id) => {
        return axiosClient.get(`/application?id=${id}`);
    },
}

export default ApplicationAPI;