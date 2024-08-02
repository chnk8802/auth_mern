import axios from "axios";
import store from "../app/store";
import {
  login,
  logout,
} from "../app/features/authentication/authenticationSlice";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
instance.interceptors.response.use(null, (error)=>{
  console.log(error)
})
export default instance;
