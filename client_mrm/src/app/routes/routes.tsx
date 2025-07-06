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
// Customer
import { CustomersPage } from "@/features/customers/routes/CustomerListPage";
import { CustomerDetailPage } from "@/features/customers/routes/CustomerDetailsPage";
import { CustomerEditPage } from "@/features/customers/routes/CustomerEditPage";
// Others
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
    path: ROUTES.GUEST_PATHS.AUTH,
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
    handle: {
    breadcrumb: () => "Dashboard",
  },
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
            handle: {
              breadcrumb: "Users",
            },
          },
          {
            path: ":userId",
            element: <UserDetailPage />,
            handle: {
              breadcrumb: ({ params }: { params: { userId: string } }) => `User ${params.userId}`,
            },
          },
          {
            path: ":userId/edit",
            element: <UserEditPage />,
            handle: {
              breadcrumb: ({ params }: { params: { userId: string } }) => `Edit User ${params.userId}`,
            },
          },
        ],
      },
      {
        path: "customers",
        handle: {
    breadcrumb: () => "Customers",
  },
        children: [
          {
            index: true,
            element: <CustomersPage />,
            handle: {
              breadcrumb: "Customers List",
            },
          },
          {
            path: "new",
            element: <CustomerEditPage />,
            handle: {
              breadcrumb: "New Customer",
            },
          },
          {
            path: ":customerId",
            element: <CustomerDetailPage />,
            handle: {
              breadcrumb: ({ params }: { params: { customerId: string } }) => `${params.customerId}`,
            },
          },
          {
            path: ":customerId/edit",
            element: <CustomerEditPage />,
            handle: {
              breadcrumb: ({ params }: { params: { customerId: string } }) => `Edit ${params.customerId}`,
            },
          },
        ],
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
