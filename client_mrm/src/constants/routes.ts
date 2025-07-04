// constants/routes.ts
// Only for frontend
export const ROUTES = {
  ROOT: "/",
  AUTH: "/auth",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD:"/auth/forgot-password",
  
  DASHBOARD: "/dashboard",

  USERS: {
    ME: "/dashboard/users/me",
    LIST: "/dashboard/users",
    EDIT: (id: string | number) => `/dashboard/users/${id}/edit`,
    DETAILS: (id: string | number) => `/dashboard/users/${id}`,
  },

  PAYMENTS: {
    LIST: "/payments",
    DETAILS: (id: string | number) => `/payments/${id}`,
  },

  SETTINGS: "/settings",
  NOT_FOUND: "*",
};
