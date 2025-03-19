import axiosInstance from "./axiosInstance";

export const getInitiativeContent = async () => {
    const { data } = await axiosInstance.get("/initiative");
    return data;
}

export const getSingleInitiativeById = async (id) => {
    const { data } = await axiosInstance.get(`/initiative/${id}`);
    return data;
}

export async function sendInitiativeContent(data) {
    const res = await axiosInstance.post("/initiative", data);
    return res;
}

export async function updateInitiativeContent(id, data) {
    const res = await axiosInstance.put(`/initiative/${id}`, data,);
    return res;
}

export async function sendInitiativeImage(id, data) {
    const res = await axiosInstance.post(`/initiative/${id}/image`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return res;
}

export async function deleteInitiativeImage(id, publicId) {
    const res = await axiosInstance.delete(`/initiative/${id}/image/${publicId}`);
    return res;
}

export async function deleteInitiativeContent(id) {
    const res = await axiosInstance.delete(`/initiative/${id}`);
    return res;
}