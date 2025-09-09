import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { fetchCurrentUser } from "@/features/auth/api/authApi";
import {
  loginSuccess,
  logout,
  setBootstrapped,
} from "@/features/auth/store/authSlice";
import { toast } from "sonner";
import type { AuthUser } from "@/features/auth/types";

export const AuthLoader = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const res = await fetchCurrentUser();
        // console.log("AuthLoader: fetchCurrentUser response", res);
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
      } catch (error) {
        // console.error("AuthLoader: Unexpected error", error);
        toast.error("Unexpected error occurred while loading auth");
        dispatch(logout());
      } finally {
        dispatch(setBootstrapped(true));
      }
    };

    initializeAuth();
  }, [dispatch]);

  return null;
};
