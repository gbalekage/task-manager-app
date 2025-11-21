import axios from "axios";
import * as jwt_decode from "jwt-decode";
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwt_decode.default(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/auth/sign-in";
        return Promise.reject(new Error("Token expired"));
      }

      config.headers.Authorization = `Bearer ${token}`;
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth/sign-in";
      return Promise.reject(new Error("Invalid token"));
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth/sign-in";
    }
    return Promise.reject(error);
  }
);

export default api;
