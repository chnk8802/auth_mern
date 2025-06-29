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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginForm />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
    ],
  },
  // Protected Routes
  {
    path: "/dashboard",
    // element: <MainLayout/>,
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
  // Unknown Routes
  {
    path: "*",
    element: (
      <div className="min-h-screen flex items-center justify-center flex-col text-center p-4">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-lg text-gray-700">Oops! Page not found.</p>
      </div>
    ),
  },
]);
