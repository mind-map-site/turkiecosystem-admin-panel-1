import axiosInstance from "./axiosInstance";

export const getIncentiveContent = async (page) => {
    const { data } = await axiosInstance.get(`/incentive?page=${page}`);
    return data;
}

export const getSingleIncentiveById = async (id) => {
    const { data } = await axiosInstance.get(`/incentive/${id}`);
    return data;
}

export async function sendIncentiveContent(data) {
    const res = await axiosInstance.post("/incentive", data);
    return res;
}

export async function updateIncentiveContent(id, data) {
    const res = await axiosInstance.put(`/incentive/${id}`, data, );
    return res;
}

export async function sendIncentiveImage(id, data) {
    const res = await axiosInstance.post(`/incentive/${id}/image`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return res;
}

export async function deleteIncentiveImage(id, publicId) {
    const res = await axiosInstance.delete(`/incentive/${id}/image/${publicId}`);
    return res;
}

export async function deleteIncentiveContent(id) {
    const res = await axiosInstance.delete(`/incentive/${id}`);
    return res;
}