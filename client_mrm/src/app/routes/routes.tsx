import { createBrowserRouter } from "react-router-dom";
import { LoginForm } from "@/features/auth/components/login-form";
import { RegisterForm } from "@/features/auth/components/register-form";
import { MainLayout } from "@/layouts/MainLayout";
import { DashboardHomePage } from "@/features/dashboardHome/routes/DashboardHomePage";
import { UsersPage } from "@/features/users/routes/UsersPage";
import { CustomersPage } from "@/features/customers/routes/CustomersPage";
import { RepairJobPage } from "@/features/repairJob/routes/RepairJobPage";
import { TechniciansPage } from "@/features/technician/routes/TechniciansPage";
import { PaymentsPage } from "@/features/payment/routes/PaymentsPage";
import { AuthLayout } from "@/layouts/AuthLayout";
import { ProtectedRoute } from "./guards/ProtectedRoute";
import { HomePage } from "@/features/home/routes/HomePage";
import GuestOnlyRoute from "./guards/GuestsOnlyRoute";
import { ROUTES } from "@/constants/routes";
import NotFound from "../NotFound";
import { GuestLayout } from "@/layouts/GuestLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout/>,
    children: [
  {
    path: "/",
    element: <HomePage/>,
  },
  // Unknown Routes
  {
    path: "*",
    element: <NotFound/>,
  },]
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
        element: <UsersPage />,
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
