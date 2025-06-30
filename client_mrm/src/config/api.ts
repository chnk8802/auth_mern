export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  WITH_CREDENTIALS: true,
  HEADERS: {
    "Content-Type": "application/json"
  },
  TIMEOUT: 10000
}
