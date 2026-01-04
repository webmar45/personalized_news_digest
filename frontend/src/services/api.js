import axios from "axios";

const API = import.meta.env.PROD
  ? "/api"
  : "http://localhost:3000/api";

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
