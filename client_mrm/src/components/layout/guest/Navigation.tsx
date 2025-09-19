import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { WEBSITE_MAIN_MENU } from "@/constants/menu.constants";

export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {WEBSITE_MAIN_MENU.map((item) => (
          <NavigationMenuItem key={item.to}>
            <NavigationMenuLink asChild>
              <Link to={item.to} className="px-3 py-2 font-medium">
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
