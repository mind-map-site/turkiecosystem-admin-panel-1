import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
console.log(BASE_URL);
const axiosInstance = axios.create({
  baseURL: "https://api.turkiccluster.com/api/v1",
});
// eslint-disable-next-line no-unused-expressions
axiosInstance.interceptors.request.use((config) => {
  return config;
  // eslint-disable-next-line no-sequences
}),
  (err) => Promise.reject(err);

export default axiosInstance;
