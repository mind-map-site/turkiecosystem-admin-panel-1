import axiosInstance from "./axiosInstance";

const prefix = "/privacy-policy"
export const getPrivacyPolicyContent = async () => {
    const { data } = await axiosInstance.get(prefix);
    return data;
}

export const putPrivacyPolicyContent = async (value) => {
    const res = await axiosInstance.put(prefix, {
        html: value
    });
    return res;
}
