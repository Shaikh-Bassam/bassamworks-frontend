import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.example.com", // backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error(err);
    return Promise.reject(err);
  }
);

export default apiClient;
