// import AppRoutes from "@/app/routes";
import React from "react";
import { fetchCurrentUser } from "@/features/auth/api/authApi";
import { loginSuccess, logout } from "@/features/auth/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import "@/styles/App.css";
import { useEffect } from "react";
import { toast } from "sonner";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/routes/routes";

const App: React.FC = () => {
  console.log("App mounted");
  const dispatch = useAppDispatch();
  const initialized = useAppSelector((state) => state.auth.initialized);
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    // if (initialized) return;
    const fetchUser = async () => {
      try {
        const user = await fetchCurrentUser();
        if (!user) throw new Error("Not authenticated");
        dispatch(loginSuccess(user));
        console.log(user, authState);
      } catch (error) {
        const err = error as Error;
        console.error("Failed to fetch current user:", err.message);
        toast.error("Session expired");
        dispatch(logout());
      }
    };

    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    console.log("Auth state changed:", authState);
  }, [authState]);

  if (!initialized) {
    return <div>Loading authentication...</div>;
  }

  return <RouterProvider router={router} />;
};

export default App;
