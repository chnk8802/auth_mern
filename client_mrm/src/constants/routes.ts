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
  SPARE_PARTS: {
    NEW: "/dashboard/spareparts/new",
    LIST: "/dashboard/spareparts",
    EDIT: (id: string) => `/dashboard/spareparts/${id}/edit`,
    DETAILS: (id: string) => `/dashboard/spareparts/${id}`,
  },
  SPARE_PART_ENTRY: {
    NEW: "/dashboard/sparepartentries/new",
    LIST: "/dashboard/sparepartentries",
    EDIT: (id: string) => `/dashboard/sparepartentries/${id}/edit`,
    DETAILS: (id: string) => `/dashboard/sparepartentries/${id}`,
  },
  SUPPLIERS: {
    NEW: "/dashboard/suppliers/new",
    LIST: "/dashboard/suppliers",
    EDIT: (id: string) => `/dashboard/suppliers/${id}/edit`,
    DETAILS: (id: string) => `/dashboard/suppliers/${id}`,
  },
  PAYMENTS: {
    NEW: "/dashboard/payments/new",
    LIST: "/dashboard/payments",
    EDIT: (id: string) => `/dashboard/payments/${id}/edit`,
    DETAILS: (id: string) => `/dashboard/payments/${id}`,
  },
  PAYMENT_ENTRY: {
    NEW: "/dashboard/paymententries/new",
    LIST: "/dashboard/paymententries",
    EDIT: (id: string) => `/dashboard/paymententries/${id}/edit`,
    DETAILS: (id: string) => `/dashboard/paymententries/${id}`,
  },

  SETTINGS: "/settings",
  NOT_FOUND: "*",
};
