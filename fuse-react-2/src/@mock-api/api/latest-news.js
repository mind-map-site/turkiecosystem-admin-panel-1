import axiosInstance from "./axiosInstance";

const prefix = "/latest-news"

export const getLatestNews = async () => {
    const { data } = await axiosInstance.get(prefix);
    return data;
}

export const getSingleLatestNews = async (id) => {
    const { data } = await axiosInstance.get(`${prefix}/${id}`);
    return data;
}

export const postLatestNews = async (data) => {
    const res = await axiosInstance.post(prefix, data);
    return res;
}

export const putLatestNews = async (id, data) => {
    const res = await axiosInstance.put(`${prefix}/${id}`, data);
    return res;
}

export const deleteLatestNews = async (id) => {
    const res = await axiosInstance.delete(`${prefix}/${id}`);
    return res;
}