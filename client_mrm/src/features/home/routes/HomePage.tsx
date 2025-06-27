import React from "react"

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard Home</h1>
      <p className="text-muted-foreground">
        Welcome to your admin dashboard. Use the sidebar to navigate.
      </p>
    </div>
  )
}
