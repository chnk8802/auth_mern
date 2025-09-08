import { Navigate } from "react-router-dom"
import { useAppSelector } from "@/hooks/redux"
import type { ReactNode } from "react"
import { ROUTES } from "@/constants/routes"
import { Loading } from "@/components/common/Loading"

interface Props {
  children: ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAppSelector((state) => state.auth)

  if (user && loading.login) return <Loading fullscreen={true} />

  if (!user) {
    console.log("No user found....redirecting to login")
    return <Navigate to={ROUTES.GUEST_PATHS.LOGIN} replace />
  }

  return children
}
