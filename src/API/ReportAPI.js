import axiosClient from "./axiosClient";

const ReportAPI = {
    insure: async (id) => {
        return await axiosClient.get(`/hui/report?id=${id}`);
    },
    history: async (body) => {
        const {limit, page, huiId, cusId} = body
        if (cusId) {
            return await axiosClient.get(`hisHuiPoint/list?query={"huiId":"${huiId}","cusId":"${cusId}"}&page=${page}&limit=${limit}`);     
        } else {
            return await axiosClient.get(`hisHuiPoint/list?query={"huiId":"${huiId}"}&page=${page}&limit=${limit}`); 
        }
    },
}

export default ReportAPI;