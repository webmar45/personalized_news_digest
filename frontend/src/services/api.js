// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  // Use relative path for production, localhost for dev
  baseURL: '/api', 
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Sending Token:", token); // CHECK THIS IN YOUR CONSOLE
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default API;