import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Wrench } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export const Navbar = () => {
  return (
    <nav className="w-full border-b bg-background px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Menu className="h-6 w-6 md:hidden" />

        <Link to="/" className="hidden md:flex text-xl font-bold">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Wrench />
          </div>
          <div className="pl-2">MyApp</div>
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-4">
        <Link
          to={ROUTES.DASHBOARD}
          className="text-sm font-medium hover:underline"
        >
          Dashboard
        </Link>
      </div>
      <Link to={ROUTES.LOGIN}>
        <Button variant="outline" size="sm">
          Login
        </Button>
      </Link>
    </nav>
  );
};
