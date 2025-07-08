import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { fetchCurrentUser } from "@/features/auth/api/authApi";
import { loginSuccess, logout } from "@/features/auth/store/authSlice";
import { toast } from "sonner";

export const AuthLoader = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const res = await fetchCurrentUser();
        if (!res || !res.data || res.data.length === 0) {
          throw new Error("No user data found");
        }
        const user = res.data[0];
        if (!user) {
          dispatch(logout());
        }
        dispatch(loginSuccess(user));
      } catch (error: any) {
        console.error("AuthLoader: Failed to fetch user", error);
        toast.error(error.response.data.message || "Failed to fetch user data");
        dispatch(logout());
      }
    };

    initializeAuth();
  }, [dispatch]);

  return null;
};
