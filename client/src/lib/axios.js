import axios from "axios";
import * as jwt_decode from "jwt-decode";
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default api;
