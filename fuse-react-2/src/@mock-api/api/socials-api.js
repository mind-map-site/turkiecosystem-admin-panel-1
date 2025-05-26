import axiosInstance from "./axiosInstance";

const prefix = "/socials"

export const getSocialMedia = async () => {
    const { data } = await axiosInstance.get(prefix);
    return data;
}

export const getSingleSocialMedia = async (id) => {
    const { data } = await axiosInstance.get(`${prefix}/${id}`);
    return data;
}

export const postSocialMedia = async (data) => {
    const res = await axiosInstance.post(prefix, data);
    return res;
}

export const putSocialMedia = async (id, data) => {
    const res = await axiosInstance.put(`${prefix}/${id}`, data);
    return res;
}

export const deleteSocialMedia = async (id) => {
    const res = await axiosInstance.delete(`${prefix}/${id}`);
    return res;
}