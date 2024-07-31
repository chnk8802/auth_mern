import axios from "axios";
import store from "../app/store";
import {
  login,
  logout,
} from "../app/features/authentication/authenticationSlice";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

instance.defaults.withCredentials = true

const refreashToken = async () => {
  try {
    const response = await instance.post("users/refresh-token");
    console.log({response})
  } catch (error) {
    console.error("Token refresh failed", error);
  }
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // await refreashToken()
    if (error.response.status === 401) {
      await refreashToken()
      console.log(401)
    }
    console.log({"response_interceptor_error": error})
  }
);

export default instance;
