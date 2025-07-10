import axios from "axios"
import { API_CONFIG } from "@/config/api"
import { logout, loginSuccess } from "@/features/auth/store/authSlice"
import { store } from "@/app/store"

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS,
  withCredentials: API_CONFIG.WITH_CREDENTIALS,
  timeout: API_CONFIG.TIMEOUT
})

// This tracks whether we are currently refreshing
let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If it's a 401, and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request if a refresh is already in progress
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const res = await api.post("/auth/refresh-token")
        //         const res = await axios.post(
        //   `${API_CONFIG.BASE_URL}/auth/refresh-token`,
        //   {},
        //   {
        //     headers: API_CONFIG.HEADERS,
        //     withCredentials: API_CONFIG.WITH_CREDENTIALS,
        //     timeout: API_CONFIG.TIMEOUT,
        //   }
        // );

        const user = res.data?.data[0];
        if (!user) {
          throw new Error("No user returned from refresh")
        }

        store.dispatch(loginSuccess(user))

        processQueue(null, null)
        console.log("======")
        return api(originalRequest)

      } catch (refreshError) {
        console.log("+++++++")
        processQueue(refreshError, null)
        store.dispatch(logout())
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
