import axios from "axios";
import store from '../app/store'

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const accessToken = state.auth.accessToken
    config.headers.Authorization = `Bearer ${accessToken}`
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
