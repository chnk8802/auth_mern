import "@/styles/App.css";
import {AppRoutes} from "@/app/routes/index"
import { AuthLoader } from "./AuthLoader";

export const App = () => {
  return <>
  <AuthLoader/>
  <AppRoutes />
  </>;
};
