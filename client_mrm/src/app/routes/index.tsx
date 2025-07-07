// src/routes.tsx
import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/routes/routes";

export const AppRoutes: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
