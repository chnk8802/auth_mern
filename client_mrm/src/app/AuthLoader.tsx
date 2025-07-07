import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { fetchCurrentUser } from "@/features/auth/api/authApi";
import { loginSuccess, logout } from "@/features/auth/store/authSlice";

export const AuthLoader = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await fetchCurrentUser();
        if (user) {
          dispatch(loginSuccess(user));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("AuthLoader: Failed to fetch user", error);
        dispatch(logout());
      }
    };

    initializeAuth();
  }, [dispatch]);

  return null;
};
