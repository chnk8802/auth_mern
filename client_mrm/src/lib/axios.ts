// src/lib/axios.ts
import axios from "axios";
import { API_CONFIG } from "@/config/api";

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  // timeout: API_CONFIG.TIMEOUT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add a response error logger or refresh logic
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
