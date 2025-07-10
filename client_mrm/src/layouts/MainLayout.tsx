import { Outlet, useMatches, Link } from "react-router-dom";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ModeToggle";

export function MainLayout() {
  const matches = useMatches();

  const breadcrumbs = matches
    .filter((match) => (match.handle as any).breadcrumb)
    .map((match, index, arr) => {
      const isLast = index === arr.length - 1;
      const label =
        typeof (match.handle as any).breadcrumb === "function"
          ? (match.handle as any).breadcrumb(match)
          : (match.handle as any).breadcrumb;

      return (
        <div key={match.pathname} className="flex items-center">
          <BreadcrumbItem>
            {isLast ? (
              <BreadcrumbPage>{label}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link to={match.pathname}>{label}</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {!isLast && <BreadcrumbSeparator />}
        </div>
      );
    });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col sm:w-264">
        <header className="flex h-14 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="gap-2 p-6"><ModeToggle/></div>
        </header>
        <div className="flex flex-1 flex-col px-2 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
