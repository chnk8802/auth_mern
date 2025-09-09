import { useAppSelector } from "@/hooks/redux";
import { ROUTES } from "@/constants/routes";
import { Navigate } from "react-router-dom";
import { RegisterForm } from "../components/register-form";

export const RegisterPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (user) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  return <RegisterForm />;
};
