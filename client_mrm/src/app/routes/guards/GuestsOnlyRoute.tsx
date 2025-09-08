import { useAppSelector } from "@/hooks/redux";
import { Navigate } from "react-router-dom";

const GuestOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading.login) {
    return null;
  }

  if (user) {
    return <Navigate to={location} replace />;
  }

  return <>{children}</>;
};

export default GuestOnlyRoute;
