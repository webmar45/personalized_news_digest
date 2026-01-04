import axios from "axios";

const API = window.location.origin.includes('localhost') 
  ? 'http://localhost:5000/api' 
  : '/api';

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
