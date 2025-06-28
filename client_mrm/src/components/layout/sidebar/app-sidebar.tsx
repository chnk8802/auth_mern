import * as React from "react";
import {
  Bot,
  Folder,
  Frame,
  Map,
  PieChart,
  Settings2,
  Wrench,
} from "lucide-react";

import { NavMain } from "@/components/layout/sidebar/nav-main";
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/layout/sidebar/nav-user";
import { TeamSwitcher } from "@/components/layout/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/hooks/redux";

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
      zip: "110011"
    }
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
          url: "/dashboard/repairjobs",
        },
        {
          title: "Customers",
          url: "/dashboard/customers",
        },
        {
          title: "Technicians",
          url: "/dashboard/technicians",
        },
        {
          title: "Payments",
          url: "/dashboard/payments",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Users",
          url: "/dashboard/users",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector((state) => state.auth.user)
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <a href="/dashboard">
          <TeamSwitcher teams={data.teams} />
        </a>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
      {user ? <NavUser user={user} /> : <NavUser user={data.user} /> };
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
