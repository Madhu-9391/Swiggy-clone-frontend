import axios from "axios";
console.log(process.env.REACT_APP_BACKEND_URL);
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

// ✅ Auto-refresh expired token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post("/swiggy/refresh");
        return api(originalRequest); // retry the original request
      } catch (refreshError) {
        console.error("Session expired");
        window.location.href = "/swiggy/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
