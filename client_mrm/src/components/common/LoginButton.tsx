import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { Link } from "react-router-dom"
import { ROUTES } from "@/constants/routes.constants"

export function LoginButton() {
  return (
    <Button asChild variant="outline" size="sm" className="gap-2">
      <Link to={ROUTES.GUEST_PATHS.LOGIN}>
        <LogIn className="h-4 w-4" />
      </Link>
    </Button>
  )
}