import axiosClient from "./axiosClient";

const MenuAPI = {
    getDefault: async () =>  {
        return await axiosClient.get(`/menu/getDefault`);
    },
}

export default MenuAPI;