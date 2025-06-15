import axiosInstance from "./axiosInstance";

const prefix = "/adverts"
export const getAdverts = async () => {
    const { data } = await axiosInstance.get(prefix);
    return data;
}
export const getSingleAdvert = async (advertId) => {
    const { data } = await axiosInstance.get(`${prefix}/${advertId}`);
    return data;
}
export const sendAdverts = async (advertsImages) => {
    const { data } = await axiosInstance.post(prefix, advertsImages);
    return data;
}
export const deleteAdvert = async (advertId, publicId) => {
    const { data } = await axiosInstance.delete(`${prefix}/${advertId}/${publicId}`);
    return data;
}