import axiosClient from "./axiosClient";

const ReportAPI = {
    insure: async (id) => {
        return await axiosClient.get(`/hui/report?id=${id}`);
    },
    history: async (body) => {
        const {limit, page, huiId, cusId} = body
        // return await axiosClient.get(`hisHuiPoint/list?query={"huiId":"${huiId}","cusId":"${cusId}"}&page=${page}&limit=${limit}`);
        return await axiosClient.get(`hisHuiPoint/list?query={"huiId":"64dda29f7753d6fbc7ff1d23", "cusId":"64c9361ae610f09c16f83662"}&page=${page}&limit=${limit}`);
    },
}

export default ReportAPI;