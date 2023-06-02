import axiosClient from "./axiosClient";

const MenuAPI = {
    getDefault: async () =>  {
        return axiosClient.get(`/menu/getDefault`);
    },
}

export default MenuAPI;