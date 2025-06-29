// constants/routes.ts
// Only for frontend
export const ROUTES = {
  ROOT: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD:"/auth/forgot-password",
  
  DASHBOARD: "/dashboard",

  USERS: {
    LIST: "/users",
    ME: "/users/me",
    DETAILS: (id: string | number) => `/users/${id}`,
  },

  PAYMENTS: {
    LIST: "/payments",
    DETAILS: (id: string | number) => `/payments/${id}`,
  },

  SETTINGS: "/settings",
  NOT_FOUND: "*",
};
