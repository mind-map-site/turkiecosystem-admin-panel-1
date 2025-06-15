import axiosInstance from "./axiosInstance";


export const getEcosystemContent = async (page) => {
    const { data } = await axiosInstance.get(`/ecosystem?page=${page}`);
    return data;
}

export const getSingleEcosystemById = async (id) => {
    const { data } = await axiosInstance.get(`/ecosystem/${id}`);
    return data;
}

export async function sendEcosystemContent(data) {
    const res = await axiosInstance.post("/ecosystem", data);
    return res;
}

export async function updateEcosystemContent(id, data) {
    const res = await axiosInstance.put(`/ecosystem/${id}`, data,);
    return res;
}

export async function sendEcosystemImage(id, data) {
    const res = await axiosInstance.post(`/ecosystem/${id}/image`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return res;
}

export async function deleteEcosystemImage(id, publicId) {
    const res = await axiosInstance.delete(`/ecosystem/${id}/image/${publicId}`);
    return res;
}

export async function deleteEcosystemContent(id) {
    const res = await axiosInstance.delete(`/ecosystem/${id}`);
    return res;
}

export async function getTagProfiles() {
    const res = axiosInstance.get("/profile");
    return res;
}
export async function getTagProfile(id) {
    const res = axiosInstance.get(`/profile/${id}`);
    return res;
}
export async function postTagProfiles(data) {
    const res = axiosInstance.post(`/profile`, data);
    return res;
}
export async function putTagProfiles(id, data) {
    const res = axiosInstance.put(`/profile/${id}`, data);
    return res;
}
export async function deleteTagProfiles(id) {
    const res = axiosInstance.delete(`/profile/${id}`);
    return res;
}

export async function getTagCountry() {
    const res = axiosInstance.get("/country");
    return res;
}
export async function getSingleTagCountry(id) {
    const res = axiosInstance.get(`/country/${id}`);
    return res;
}

export async function postTagCountry(data) {
    const res = axiosInstance.post(`/country`, data);
    return res;
}
export async function putTagCountry(id, data) {
    const res = axiosInstance.put(`/country/${id}`, data);
    return res;
}
export async function deleteTagCountry(id) {
    const res = axiosInstance.delete(`/country/${id}`);
    return res;
}
export async function getTagIndustry() {
    const res = axiosInstance.get("/industry");
    return res;
}
export async function getSingleTagIndustry(id) {
    const res = axiosInstance.get(`/industry/${id}`);
    return res;
}
export async function postTagIndustry(data) {
    const res = axiosInstance.post(`/industry`, data);
    return res;
}
export async function putTagIndustry(id, data) {
    const res = axiosInstance.put(`/industry/${id}`, data);
    return res;
}
export async function deleteTagIndustry(id) {
    const res = axiosInstance.delete(`/industry/${id}`);
    return res;
}

export async function getFilterData() {
    const res = axiosInstance.get("/ecosystem/filter-data")
    return res;
}

export async function filterEcosystem(country, profile, industry,) {
    const res = axiosInstance.get(`/ecosystem?country=${country}&profile=${profile}&industry=${industry}`);
    return res;
}