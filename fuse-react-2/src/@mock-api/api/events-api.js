import axiosInstance from "./axiosInstance";

export const getEventsContent = async () => {
    const { data } = await axiosInstance.get("/events");
    return data;
}

export const getSingleEventsById = async (id) => {
    const { data } = await axiosInstance.get(`/events/${id}`);
    return data;
}

export async function sendEventsContent(data) {
    const res = await axiosInstance.post("/events", data);
    return res;
}

export async function updateEventsContent(id, data) {
    const res = await axiosInstance.put(`/events/${id}`, data,);
    return res;
}

export async function sendEventsImage(id, data) {
    const res = await axiosInstance.post(`/events/${id}/image`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return res;
}

export async function deleteEventsImage(id, publicId) {
    const res = await axiosInstance.delete(`/events/${id}/image/${publicId}`);
    return res;
}

export async function deleteEventsContent(id) {
    const res = await axiosInstance.delete(`/events/${id}`);
    return res;
}