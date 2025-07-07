import api from "@/lib/axios";
import type { AuthUser } from "@/features/auth/types";

// Login
export const loginUser = async (credentials: { email: string; password: string }): Promise<AuthUser> => {
  const res = await api.post("/auth/login", credentials);
  return res.data.data[0];
};

// Register
export const registerUser = async (payload: {
  email: string;
  password: string;
  role: string;
}): Promise<AuthUser> => {
  const res = await api.post("/auth/register", payload);
  return res.data.user;
};

// Get current user
export const fetchCurrentUser = async (): Promise<AuthUser> => {
  const res = await api.get("/auth/me");
  console.log("res", res)
  return res.data.data[0];
};

// Logout (optional)
export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
};
