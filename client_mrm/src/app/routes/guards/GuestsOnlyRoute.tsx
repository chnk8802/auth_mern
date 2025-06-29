import { ROUTES } from "@/constants/routes";
import { useAppSelector } from "@/hooks/redux";
import { Navigate } from "react-router-dom";

const GuestOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.auth.user);

  if (user) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
};

export default GuestOnlyRoute;
