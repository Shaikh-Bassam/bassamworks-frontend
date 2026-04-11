import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  timeout: 12000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("bassamworks-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const fallbackMessage = "Unable to complete request right now. Please try again.";
    const normalizedError = new Error(
      err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        fallbackMessage
    );

    return Promise.reject(normalizedError);
  }
);

export default apiClient;
