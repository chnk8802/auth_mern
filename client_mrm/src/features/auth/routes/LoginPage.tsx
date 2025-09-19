import { useAppSelector } from "@/hooks/redux";
import { LoginForm } from "../components/login-form"
import { ROUTES } from "@/constants/routes.constants";
import { Navigate } from "react-router-dom";

export const LoginPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (user) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  return <LoginForm />;
}