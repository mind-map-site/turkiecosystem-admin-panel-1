/* eslint-disable prettier/prettier */

import axiosInstance from "./axiosInstance";

/* eslint-disable @typescript-eslint/no-explicit-any */
;
export async function getAboutContent() {
    const { data } = await axiosInstance.get("/abouts");
    return data;
}
export async function sendAboutContent(data) {
    const res = await axiosInstance.post("/abouts", data);
    return res;
}

export async function sendAboutImage(id, data) {
    const res = await axiosInstance.post(`/abouts/${id}/images`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return res;
}

export async function deleteAboutImage(id, publicId) {
    const res = await axiosInstance.delete(`/abouts/${id}/images/${publicId}`);
    return res;
}