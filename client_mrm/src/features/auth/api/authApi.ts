import api from "@/lib/axios";
import type { AuthUser } from "@/features/auth/types";
import type { ApiResponse } from "@/types/api";

// Login
export const loginUser = async (credentials: { email: string; password: string }): Promise<ApiResponse<AuthUser[]>> => {
  const res = await api.post("/auth/login", credentials);
  return res.data;
};

// Register
export const registerUser = async (payload: {email: string; password: string; role: string; }): Promise<ApiResponse<AuthUser[]>> => {
  const res = await api.post("/auth/register", payload);
  return res.data;
};

// Get current user
export const fetchCurrentUser = async (): Promise<ApiResponse<AuthUser>> => {
  try {
    const res = await api.get<ApiResponse<AuthUser>>("/auth/me");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch current user:", error);

    return {
      data: null as any,
      message: error instanceof Error ? error.message : "Unknown error",
      meta: {
        code: 500,
        status: "error",
        pagination: {} as any, // or null if optional
        timestamp: new Date().toISOString(),
      },
    };
  }
};

// Logout (optional)
export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
};
