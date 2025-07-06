import "@/styles/App.css";
import { AppRoutes } from "@/app/routes/index";
import { AuthLoader } from "./AuthLoader";

export const App = () => {
  console.log("App loaded on", window.location.pathname)

  return (
    <>
      <AuthLoader />
      <AppRoutes />
    </>
  );
};
