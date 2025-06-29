import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { fetchCurrentUser } from "@/features/auth/api/authApi";
import { loginSuccess, logout } from "@/features/auth/store/authSlice";

export const AuthLoader = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchCurrentUser();
        if (!user) throw new Error("Not authenticated");
        dispatch(loginSuccess(user));
      } catch (error) {
        const err = error as Error;
        console.error("Failed to fetch current user:", err.message);
        dispatch(logout());
      }
    };

    loadUser()
  }, [dispatch]);
  return null;
};