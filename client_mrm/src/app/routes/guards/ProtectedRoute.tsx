import { Navigate } from "react-router-dom"
import { useAppSelector } from "@/hooks/redux"
import type { ReactNode } from "react"
import { ROUTES } from "@/constants/routes"

interface Props {
  children: ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const { user} = useAppSelector((state) => state.auth)

  if (!user) {
    return <Navigate to={ROUTES.ROOT} replace />
  }

  return children
}
