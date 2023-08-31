import axiosClient from "./axiosClient";

const MenuAPI = {
    getDefault: async () =>  {
        return await axiosClient.get(`/menu/getDefault`);
    },

    getMenu: async () =>  {
        return await axiosClient.get(`/menu`);
    },
}

export default MenuAPI;