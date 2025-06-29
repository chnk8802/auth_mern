import { fetchCurrentUser } from "@/features/auth/api/authApi";
import { loginSuccess, logout } from "@/features/auth/store/authSlice";
import { useAppDispatch } from "@/hooks/redux";
import { useEffect } from "react";
import { toast } from "sonner";

export const AuthLoader = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchCurrentUser();
        if (!user) throw new Error("Not authenticated");
        dispatch(loginSuccess(user));
        console.log(user);
      } catch (error) {
        const err = error as Error;
        console.error("Failed to fetch current user:", err.message);
        toast.error("Session expired");
        dispatch(logout());
      }
    };

    loadUser()
  }, [dispatch]);
  return null;
};
