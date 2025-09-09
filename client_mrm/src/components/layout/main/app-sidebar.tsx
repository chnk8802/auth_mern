import * as React from "react";
import { Bot, Folder, Settings2, Wrench } from "lucide-react";

import { NavMain } from "@/components/layout/main/nav-main";
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/layout/main/nav-user";
import { TeamSwitcher } from "@/components/layout/main/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/hooks/redux";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

// This is sample data.
const data = {
  user: {
    _id: "123456",
    fullName: "shadcn",
    email: "m@example.com",
    role: "technician",
    address: {
      street: "44",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      zip: "110011",
    },
  },
  teams: [
    {
      name: "MRM Inc",
      logo: Wrench,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Modules",
      url: "#",
      icon: Folder,
      isActive: true,
      items: [
        {
          title: "Repair Jobs",
          url: ROUTES.REPAIR_JOBS.LIST,
        },
        {
          title: "Customers",
          url: ROUTES.CUSTOMERS.LIST,
        },
        {
          title: "Users",
          url: ROUTES.USERS.LIST,
        },
        {
          title: "Spare Parts",
          url: ROUTES.SPARE_PARTS.LIST,
        },
        {
          title: "Spare Part Entry",
          url: ROUTES.SPARE_PART_ENTRY.LIST,
        },
        {
          title: "Supplier",
          url: ROUTES.SUPPLIERS.LIST,
        },
        {
          title: "Payments",
          url: ROUTES.PAYMENTS.LIST,
        },
        {
          title: "Payment Entry",
          url: ROUTES.PAYMENT_ENTRY.LIST,
        },
      ],
    },
    {
      title: "FLD Generator",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Form",
          url: "/dashboard/form-generator",
        },
        {
          title: "List",
          url: "/dashboard/list-generator",
        },
        {
          title: "Details",
          url: "/dashboard/details-generator",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings/general",
        },
        {
          title: "Users",
          url: "/dashboard/users",
        }
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link to={ROUTES.DASHBOARD}>
          <TeamSwitcher teams={data.teams} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {user ? <NavUser user={user} /> : <NavUser user={data.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
