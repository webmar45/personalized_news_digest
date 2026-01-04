// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  // Use relative path for production, localhost for dev
  baseURL: import.meta.env.VITE_API_URL || '/api', 
});

export default API;