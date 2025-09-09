import { Loading } from "@/components/common/Loading";
import React from "react";

export const DashboardHomePage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard Home</h1>
      <div className="text-muted-foreground">
        Welcome to your admin dashboard. Use the sidebar to navigate.
        <Loading fullscreen={false} />
      </div>
    </div>
  );
};
