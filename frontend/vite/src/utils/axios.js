import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

axiosInstance.interceptors.request.use(async (config) => {
  const access = localStorage.getItem("access");
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response.data?.code === "token_not_valid" &&
      error.response.data?.messages?.[0]?.message === "Token is expired" &&
      !originalRequest._retry &&
      localStorage.getItem("refresh")
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");
        const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
          refresh,
        });

        const newAccess = res.data.access;
        localStorage.setItem("access", newAccess);

        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
        localStorage.clear();
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
