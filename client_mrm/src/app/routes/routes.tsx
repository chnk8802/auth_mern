import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { NotFound } from "@/app/NotFound";

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
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

// Dashboard
import { DashboardHomePage } from "@/features/dashboardHome/routes/DashboardHomePage";

// Modules
// User
import { UsersListPage } from "@/features/users/routes/UserListPage";
import { UserDetailPage } from "@/features/users/routes/UserDetailsPage";
import { UserEditPage } from "@/features/users/routes/UserEditPage";
// Customer
import { CustomersPage } from "@/features/customers/routes/CustomerListPage";
// import { CustomerAddPage } from "@/features/customers/routes/CustomerAddPage";
import { CustomerAddPage } from "@/features/customers/components/form/CustomerAddPage2";
import { CustomerDetailPage } from "@/features/customers/routes/CustomerDetailsPage";
import { CustomerDetailPage2 } from "@/features/customers/components/form/CustomerDetailsPage2";
import { CustomerEditPage2 } from "@/features/customers/components/form/CustomerEditPage2";
import { CustomerEditPage } from "@/features/customers/routes/CustomerEditPage";
// Others
import { RepairJobListPage } from "@/features/repairJob/routes/RepairJobListPage";
import { TechniciansPage } from "@/features/technician/routes/TechniciansPage";
import { PaymentsPage } from "@/features/payment/routes/PaymentsPage";
import { PermissionDenied } from "@/app/PermissionDenied";
import { RepairJobDetailPage } from "@/features/repairJob/routes/RepairJobDetailsPage";
import { RepairJobAddPage } from "@/features/repairJob/routes/RepairJobAddPage";
// Form Generator
import { FormGeneratorPage } from "@/lib/form-generator/demo/FormGeneratorPage";
import { CustomersListPage2 } from "@/features/customers/components/form/CustomerListPage2";

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
      {
        path: "forgot-password",
        element: (
          <GuestOnlyRoute>
            <ForgotPasswordForm />
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
        handle: {
          breadcrumb: "Home",
        },
      },
      {
        path: "repairjobs",
        handle: {
          breadcrumb: () => "Repair Job",
        },
        children: [
          {
            index: true,
            element: <RepairJobListPage />,
            handle: {
              breadcrumb: "Repair Jobs List",
            },
          },
          {
            path: ":repairJobId",
            element: <RepairJobDetailPage />,
            handle: {
              breadcrumb: ({ params }: { params: { repairJobId: string } }) =>
                `${params.repairJobId}`,
            },
          },
          {
            path: ":repairJobId/edit",
            element: <RepairJobDetailPage />,
            handle: {
              breadcrumb: ({ params }: { params: { repairJobId: string } }) =>
                `Edit ${params.repairJobId}`,
            },
          },
          {
            path: "new",
            element: <RepairJobAddPage />,
            handle: {
              breadcrumb: "Repair Job",
            },
          },
        ],
      },
      {
        path: "users",
        handle: {
          breadcrumb: "Users",
        },
        children: [
          {
            index: true,
            element: <UsersListPage />,
            handle: {
              breadcrumb: "Users List",
            },
          },
          {
            path: ":userId",
            element: <UserDetailPage />,
            handle: {
              breadcrumb: ({ params }: { params: { userId: string } }) =>
                `${params.userId}`,
            },
          },
          {
            path: ":userId/edit",
            element: <UserEditPage />,
            handle: {
              breadcrumb: ({ params }: { params: { userId: string } }) =>
                `Edit ${params.userId}`,
            },
          },
          {
            path: "new",
            element: <PermissionDenied />,
            handle: {
              breadcrumb: "New User",
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
            element: <CustomersListPage2 />,
            handle: {
              breadcrumb: "Customers List",
            },
          },
          {
            path: ":customerId",
            element: <CustomerDetailPage2 />,
            handle: {
              breadcrumb: ({ params }: { params: { customerId: string } }) =>
                `${params.customerId}`,
            },
          },
          {
            path: ":customerId/edit",
            element: <CustomerEditPage2 />,
            handle: {
              breadcrumb: ({ params }: { params: { customerId: string } }) =>
                `Edit ${params.customerId}`,
            },
          },
          {
            path: "new",
            element: <CustomerAddPage />,
            handle: {
              breadcrumb: "New Customer",
            },
          },
        ],
      },
      {
        path: "technicians",
        element: <TechniciansPage />,
        handle: {
          breadcrumb: () => "Technicians",
        },
      },
      {
        path: "payments",
        element: <PaymentsPage />,
        handle: {
          breadcrumb: () => "Payments",
        },
      },
      {
        path: "form-generator",
        element: <FormGeneratorPage />,
        handle: {
          breadcrumb: () => "Form Generator",
        },
      },
    ],
  },
]);
