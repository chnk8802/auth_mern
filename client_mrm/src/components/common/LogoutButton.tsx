import { Button } from "@/components/ui/button"
import { logout } from "@/features/auth/store/authSlice"
import { useAppDispatch } from "@/hooks/redux"
import { LogOut } from "lucide-react"

export function LogoutButton() {
    const dispatch = useAppDispatch()
  return (
    <Button variant="destructive" size="sm" className="gap-2" onClick={() => {
        dispatch(logout())
    }}>
        <LogOut className="h-4 w-4" />
    </Button>
  )
}
