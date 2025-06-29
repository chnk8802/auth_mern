import React from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "@/constants/routes"

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-4">
      <Link to={ROUTES.DASHBOARD} >Dashboard</Link>
      <br />
      <Link to={ROUTES.LOGIN} >Login</Link>
    </div>
  )
}
