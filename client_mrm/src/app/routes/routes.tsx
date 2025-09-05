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
import { CustomerAddPage } from "@/features/customers/routes/CustomerAddPage";
import { CustomerDetailPage } from "@/features/customers/routes/CustomerDetailsPage";
import { CustomerEditPage } from "@/features/customers/routes/CustomerEditPage";
import { CustomersListPage } from "@/features/customers/routes/CustomerListPage";
// Spare Parts
import { SparePartListPage } from "@/features/spareParts/routes/SparePartListPage";
import { SparePartAddPage } from "@/features/spareParts/routes/SparePartAddPage";
import { SparePartDetailPage } from "@/features/spareParts/routes/SparePartDetailsPage";
import { SparePartEditPage } from "@/features/spareParts/routes/SparePartEditPage";
// Others
import { RepairJobListPage } from "@/features/repairJob/routes/RepairJobListPage";
import { TechniciansPage } from "@/features/technicians/routes/TechniciansPage";
import { PaymentsPage } from "@/features/payments/routes/PaymentsPage";
import { PermissionDenied } from "@/app/PermissionDenied";
import { RepairJobDetailPage } from "@/features/repairJob/routes/RepairJobDetailsPage";
import { RepairJobAddPage } from "@/features/repairJob/routes/RepairJobAddPage";
// Form Generator
import { FormGeneratorPage } from "@/lib/form-generator/demo/FormGeneratorPage";
import { TestListPage } from "@/lib/form-generator/demo/ListGeneratorPage";
import { DetailsGeneratorPage } from "@/lib/form-generator/demo/DetailsGeneratorPage";
import { RepairJobEditPage } from "@/features/repairJob/routes/RepairJobEditPage";
import GuestOnlyRoute from "./guards/GuestsOnlyRoute";

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
    element: (
      <GuestOnlyRoute>
        <AuthLayout />
      </GuestOnlyRoute>
    ),
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
      {
        path: "forgot-password",
        element: <ForgotPasswordForm />,
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
            element: <RepairJobEditPage />,
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
            element: <CustomersListPage />,
            handle: {
              breadcrumb: "Customers List",
            },
          },
          {
            path: ":customerId",
            element: <CustomerDetailPage />,
            handle: {
              breadcrumb: ({ params }: { params: { customerId: string } }) =>
                `${params.customerId}`,
            },
          },
          {
            path: ":customerId/edit",
            element: <CustomerEditPage />,
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
        path: "spareparts",
        handle: {
          breadcrumb: () => "Spare Parts",
        },
        children: [
          {
            index: true,
            element: <SparePartListPage />,
            handle: {
              breadcrumb: "Spare Part List",
            },
          },
          {
            path: ":sparePartId",
            element: <SparePartDetailPage />,
            handle: {
              breadcrumb: ({ params }: { params: { sparePartId: string } }) =>
                `${params.sparePartId}`,
            },
          },
          {
            path: ":sparePartId/edit",
            element: <SparePartEditPage />,
            handle: {
              breadcrumb: ({ params }: { params: { sparePartId: string } }) =>
                `Edit ${params.sparePartId}`,
            },
          },
          {
            path: "new",
            element: <SparePartAddPage />,
            handle: {
              breadcrumb: "New Spare Part",
            },
          },
        ],
      },
      {
        path: "sparepartentries",
        handle: {
          breadcrumb: () => "Spare Part Entries",
        },
        children: [
          {
            index: true,
            element: <SparePartListPage />,
            handle: {
              breadcrumb: "Spare Part Entry List",
            },
          },
          {
            path: ":sparePartEntryId",
            element: <SparePartDetailPage />,
            handle: {
              breadcrumb: ({ params }: { params: { sparePartEntryId: string } }) =>
                `${params.sparePartEntryId}`,
            },
          },
          {
            path: ":sparePartEntryId/edit",
            element: <SparePartEditPage />,
            handle: {
              breadcrumb: ({ params }: { params: { sparePartEntryId: string } }) =>
                `Edit ${params.sparePartEntryId}`,
            },
          },
          {
            path: "new",
            element: <SparePartAddPage />,
            handle: {
              breadcrumb: "New Spare Part",
            },
          },
        ],
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
      {
        path: "list-generator",
        element: <TestListPage />,
        handle: {
          breadcrumb: () => "List Generator",
        },
      },
      {
        path: "details-generator",
        element: <DetailsGeneratorPage />,
        handle: {
          breadcrumb: () => "Details Generator",
        },
      },
    ],
  },
]);
