import { createBrowserRouter, Outlet } from "react-router-dom";
import { ROUTES } from "@/constants/routes.constants";
import { NotFound } from "@/app/NotFound";

// Layouts
import { MainLayout } from "@/layouts/main/MainLayout";
import { GuestLayout } from "@/layouts/guest/GuestLayout";
import { AuthLayout } from "@/layouts/auth/AuthLayout";

// Guest
import { HomePage } from "@/features/home/routes/HomePage";

// Auth
import { ProtectedRoute } from "./guards/ProtectedRoute";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

// Dashboard
import { DashboardHomePage } from "@/features/dashboardHome/routes/DashboardHomePage";

// Modules
// User
import { UsersListPage } from "@/features/users/routes/UserListPage";
import { UserDetailPage } from "@/features/users/routes/UserDetailsPage";
import { UserEditPage } from "@/features/users/routes/UserEditPage";
// Repair Job
import { RepairJobListPage } from "@/features/repairJob/routes/RepairJobListPage";
import { RepairJobDetailPage } from "@/features/repairJob/routes/RepairJobDetailsPage";
import { RepairJobEditPage } from "@/features/repairJob/routes/RepairJobEditPage";
import { RepairJobAddPage } from "@/features/repairJob/routes/RepairJobAddPage";
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
// Supplier
import { SupplierListPage } from "@/features/supplier/routes/SupplierListPage";
import { SupplierDetailPage } from "@/features/supplier/routes/SupplierDetailsPage";
import { SupplierEditPage } from "@/features/supplier/routes/SupplierEditPage";
import { SupplierAddPage } from "@/features/supplier/routes/SupplierAddPage";
// Spare Part Entry
import { SparePartEntryListPage } from "@/features/sparePartEntries/routes/SparePartEntryListPage";
import { SparePartEntryDetailPage } from "@/features/sparePartEntries/routes/SparePartEntryDetailsPage";
import { SparePartEntryAddPage } from "@/features/sparePartEntries/routes/SparePartEntryAddPage";
import { SparePartEntryEditPage } from "@/features/sparePartEntries/routes/SparePartEntryEditPage";
// Payment
import { PaymentListPage } from "@/features/payments/routes/PaymentListPage";
import { PaymentDetailPage } from "@/features/payments/routes/PaymentDetailsPage";
import { PaymentEditPage } from "@/features/payments/routes/PaymentEditPage";
import { PaymentAddPage } from "@/features/payments/routes/PaymentAddPage";
// Form Generator
import { FormGeneratorPage } from "@/lib/form-generator/demo/FormGeneratorPage";
import { TestListPage } from "@/lib/form-generator/demo/ListGeneratorPage";
import { DetailsGeneratorPage } from "@/lib/form-generator/demo/DetailsGeneratorPage";
import { RegisterPage } from "@/features/auth/routes/RegisterPage";
import { LoginPage } from "@/features/auth/routes/LoginPage";

// Others
import { TechniciansPage } from "@/features/technicians/routes/TechniciansPage";
import { PermissionDenied } from "@/app/PermissionDenied";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
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
        element: <LoginPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
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
        element: <Outlet />,
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
        element: <Outlet />,
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
        element: <Outlet />,
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
        path: "suppliers",
        element: <Outlet />,
        handle: {
          breadcrumb: () => "Suppliers",
        },
        children: [
          {
            index: true,
            element: <SupplierListPage />,
            handle: {
              breadcrumb: "Suppliers List",
            },
          },
          {
            path: ":supplierId",
            element: <SupplierDetailPage />,
            handle: {
              breadcrumb: ({ params }: { params: { supplierId: string } }) =>
                `${params.supplierId}`,
            },
          },
          {
            path: ":supplierId/edit",
            element: <SupplierEditPage />,
            handle: {
              breadcrumb: ({ params }: { params: { supplierId: string } }) =>
                `Edit ${params.supplierId}`,
            },
          },
          {
            path: "new",
            element: <SupplierAddPage />,
            handle: {
              breadcrumb: "New Supplier",
            },
          },
        ],
      },
      {
        path: "spareparts",
        element: <Outlet />,
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
        element: <Outlet />,
        handle: {
          breadcrumb: () => "Spare Part Entries",
        },
        children: [
          {
            index: true,
            element: <SparePartEntryListPage />,
            handle: {
              breadcrumb: "Spare Part Entry List",
            },
          },
          {
            path: ":sparePartEntryId",
            element: <SparePartEntryDetailPage />,
            handle: {
              breadcrumb: ({
                params,
              }: {
                params: { sparePartEntryId: string };
              }) => `${params.sparePartEntryId}`,
            },
          },
          {
            path: ":sparePartEntryId/edit",
            element: <SparePartEntryEditPage />,
            handle: {
              breadcrumb: ({
                params,
              }: {
                params: { sparePartEntryId: string };
              }) => `Edit ${params.sparePartEntryId}`,
            },
          },
          {
            path: "new",
            element: <SparePartEntryAddPage />,
            handle: {
              breadcrumb: "New Spare Part Entry",
            },
          },
        ],
      },
      {
        path: "payments",
        element: <Outlet />,
        handle: {
          breadcrumb: () => "Payments",
        },
        children: [
          {
            index: true,
            element: <PaymentListPage />,
            handle: {
              breadcrumb: "Payment List",
            },
          },
          {
            path: ":paymentId",
            element: <PaymentDetailPage />,
            handle: {
              breadcrumb: ({ params }: { params: { paymentId: string } }) =>
                `${params.paymentId}`,
            },
          },
          {
            path: ":paymentId/edit",
            element: <PaymentEditPage />,
            handle: {
              breadcrumb: ({ params }: { params: { paymentId: string } }) =>
                `Edit ${params.paymentId}`,
            },
          },
          {
            path: "new",
            element: <PaymentAddPage />,
            handle: {
              breadcrumb: "New Payment",
            },
          },
        ],
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
