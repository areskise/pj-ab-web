import axiosClient from './axiosClient';

const ApplicationAPI = {
    getAll() {
        return axiosClient.get(`/application/all`);
    },

    getById(id) {
        return axiosClient.get(`/application?id=${id}`);
    },
}

export default ApplicationAPI;