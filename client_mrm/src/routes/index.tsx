// src/routes.tsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "@/features/auth/routes/LoginPage";
import { RegisterPage } from "@/features/auth/routes/RegisterPage";
import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "@/features/home/routes/HomePage";
import { UsersPage } from "@/features/users/routes/UsersPage";
import { CustomersPage } from "@/features/customers/routes/CustomersPage";
import { RepairJobPage } from "@/features/repairJob/routes/RepairJobPage";
import { TechniciansPage } from "@/features/technician/routes/TechniciansPage";
import { PaymentsPage } from "@/features/payment/routes/PaymentsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <div><a href="/dashboard">Dashboard</a>
      </div>
      <div><a href="/login">Login</a></div>
    </div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  // Protected Routes
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
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

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
