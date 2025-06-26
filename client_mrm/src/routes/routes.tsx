// src/routes.tsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element:  <div className="min-h-screen flex items-center justify-center flex-col text-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-lg text-gray-700">Oops! Page not found.</p>
    </div>,
  },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
