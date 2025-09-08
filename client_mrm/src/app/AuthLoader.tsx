import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { fetchCurrentUser } from "@/features/auth/api/authApi";
import { loginSuccess, logout } from "@/features/auth/store/authSlice";
import { toast } from "sonner";
import type { AuthUser } from "@/features/auth/types";

export const AuthLoader = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const res = await fetchCurrentUser();
      console.log("AuthLoader: fetchCurrentUser response", res);
      if (res.meta.status !== "success" || !res.data) {
        toast.error(res.message || "Failed to fetch user data");
        dispatch(logout());
        return;
      }

      const user: AuthUser = Array.isArray(res.data) ? res.data[0] : res.data;

      if (!user) {
        toast.error("No user data found");
        dispatch(logout());
        return;
      }

      dispatch(loginSuccess(user));
    };

    initializeAuth().catch((err) => {
      console.error("AuthLoader: Unexpected error", err);
      toast.error("Unexpected error occurred while loading auth");
      dispatch(logout());
    });
  }, [dispatch]);

  return null;
};
