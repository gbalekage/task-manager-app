import api from "../lib/axios";

export const login = (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const register = (data) => {
  return api.post("/auth/register", data);
};

export const logout = () => {
  return api.post("/auth/logout");
};

export const getLoggedInUser = () => {
  return api.get("/auth/me");
};
