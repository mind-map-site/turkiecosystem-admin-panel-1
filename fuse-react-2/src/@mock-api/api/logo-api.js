import axiosInstance from "./axiosInstance";

const prefix = "/logo"
export const getLogo = async () => {
    const { data } = await axiosInstance.get(prefix);
    return data;
}
export const postLogo = async (formData) => {
    const { data } = await axiosInstance.post(prefix, formData);
    return data;
}