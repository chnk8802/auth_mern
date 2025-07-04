import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import {NotFound} from "@/app/NotFound";

// Layouts
import { MainLayout } from "@/layouts/MainLayout";
import { GuestLayout } from "@/layouts/GuestLayout";
import { AuthLayout } from "@/layouts/AuthLayout";

// Guest
import { HomePage } from "@/features/home/routes/HomePage";

// Auth
import { ProtectedRoute } from "./guards/ProtectedRoute";
import GuestOnlyRoute from "./guards/GuestsOnlyRoute";
import { LoginForm } from "@/features/auth/components/login-form";
import { RegisterForm } from "@/features/auth/components/register-form";

// Dashboard
import { DashboardHomePage } from "@/features/dashboardHome/routes/DashboardHomePage";

// Modules
// User
import { UsersPage } from "@/features/users/routes/UserListPage";
import {UserDetailPage} from "@/features/users/routes/UserDetailsPage";
import {UserEditPage} from "@/features/users/routes/UserEditPage";
// Others
import { CustomersPage } from "@/features/customers/routes/CustomersPage";
import { RepairJobPage } from "@/features/repairJob/routes/RepairJobPage";
import { TechniciansPage } from "@/features/technician/routes/TechniciansPage";
import { PaymentsPage } from "@/features/payment/routes/PaymentsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      // Unknown Routes
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: ROUTES.AUTH,
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <GuestOnlyRoute>
            <LoginForm />
          </GuestOnlyRoute>
        ),
      },
      {
        path: "login",
        element: (
          <GuestOnlyRoute>
            <LoginForm />
          </GuestOnlyRoute>
        ),
      },
      {
        path: "register",
        element: (
          <GuestOnlyRoute>
            <RegisterForm />
          </GuestOnlyRoute>
        ),
      },
    ],
  },
  // Protected Routes
  {
    path: ROUTES.DASHBOARD,
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHomePage />,
      },
      {
        path: "repairjobs",
        element: <RepairJobPage />,
      },
      {
        path: "users",
        children: [
          {
            index: true,
            element: <UsersPage />,
          },
          {
            path: ":userId",
            element: <UserDetailPage />,
          },
          {
            path: ":userId/edit",
            element: <UserEditPage />,
          },
        ],
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
      {
        path: "technicians",
        element: <TechniciansPage />,
      },
      {
        path: "payments",
        element: <PaymentsPage />,
      },
    ],
  },
]);
