import axiosInstance from "./axiosInstance";

export const getNewsContent = async () => {
    const { data } = await axiosInstance.get("/news");
    return data;
}

export const getSingleNewsById = async (id) => {
    const { data } = await axiosInstance.get(`/news/${id}`);
    return data;
}

export async function sendNewsContent(data) {
    const res = await axiosInstance.post("/news", data);
    return res;
}

export async function updateNewsContent(id, data) {
    const res = await axiosInstance.put(`/news/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return res;
}

export async function sendNewsImage(id, data) {
    const res = await axiosInstance.post(`/news/${id}/image`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return res;
}

export async function deleteNewsImage(id, publicId) {
    const res = await axiosInstance.delete(`/news/${id}/image/${publicId}`);
    return res;
}

export async function deleteNewsContent(id) {
    const res = await axiosInstance.delete(`/news/${id}`);
    return res;
}