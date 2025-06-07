import axiosInstance from "./axiosInstance";

const prefix = "/info-portal"
export const getInfoPortal = async () => {
    const { data } = await axiosInstance.get(prefix);
    return data;
}
export const putInfoPortal = async (id, reqData) => {
    const { data } = await axiosInstance.put(prefix, reqData);
    return data;
}