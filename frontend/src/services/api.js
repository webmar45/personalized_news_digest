// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  // Use relative path for production, localhost for dev
  baseURL: '/api', 
});

export default API;