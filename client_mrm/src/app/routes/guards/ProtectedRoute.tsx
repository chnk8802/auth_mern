import { Navigate } from "react-router-dom"
import { useAppSelector } from "@/hooks/redux"
import type { ReactNode } from "react"
import { ROUTES } from "@/constants/routes"
import { Loading } from "@/components/common/Loading"

interface Props {
  children: ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const { user, bootstrapped } = useAppSelector((state) => state.auth)

  if (!bootstrapped) {
    return <Loading fullscreen={true} />;
  }

  if (!user) {
    return <Navigate to={ROUTES.GUEST_PATHS.LOGIN} replace />
  }

  return children
}
