// constants/routes.ts
// Only for frontend
export const ROUTES = {
  GUEST_PATHS: {
    ROOT: "/",
    AUTH: "/auth",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },

  DASHBOARD: "/dashboard",

  USERS: {
    ME: "/dashboard/users/me",
    LIST: "/dashboard/users",
    EDIT: (id: string) => `/dashboard/users/${id}/edit`,
    DETAILS: (id: string) => `/dashboard/users/${id}`,
  },
  CUSTOMERS: {
    NEW: "/dashboard/customers/new",
    LIST: "/dashboard/customers",
    EDIT: (id: string) => `/dashboard/customers/${id}/edit`,
    DETAILS: (id: string) => `/dashboard/customers/${id}`,
  },
  REPAIR_JOBS: {
    NEW: "/dashboard/repairjobs/new",
    LIST: "/dashboard/repairjobs",
    EDIT: (id: string) => `/dashboard/repairjobs/${id}/edit`,
    DETAILS: (id: string) => `/dashboard/repairjobs/${id}`,
  },

  PAYMENTS: {
    LIST: "/payments",
    DETAILS: (id: string) => `/payments/${id}`,
  },

  SETTINGS: "/settings",
  NOT_FOUND: "*",
};
