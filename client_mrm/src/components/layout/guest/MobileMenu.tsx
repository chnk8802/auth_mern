import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/common/ModeToggle";
import { Logo } from "@/components/common/Logo";
import { useAppSelector } from "@/hooks/redux";
import { LoginButton } from "@/components/common/LoginButton";
import { ROUTES } from "@/constants/routes.constants";
import { WEBSITE_MAIN_MENU } from "@/constants/menu.constants";

export function MobileMenu() {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">
            <Logo size="sm" />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4">
          {WEBSITE_MAIN_MENU.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-2 pl-4 hover:underline"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex h-full items-end p-4 gap-2 hover:underline">
          <ModeToggle />
          {!user && <LoginButton />}
          {user && (
            <Button asChild size="sm">
              <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
