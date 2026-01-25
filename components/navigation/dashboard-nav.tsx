"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";

type Route = {
  label: string;
  path: string;
  icons: React.ReactNode;
};

type DashBoardNavigationProps = {
  routes: Route[];
};

const DashBoardNavigation = ({ routes }: DashBoardNavigationProps) => {
  const pathname = usePathname();

  return (
    <Sidebar className="min-h-screen">
      <SidebarContent className="h-full">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold uppercase tracking-widest py-6">
            Admin Management
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {routes.map((route, index) => {
                const isActive = pathname.startsWith(route.path);

                return (
                  <SidebarMenuItem key={index}>
                    <Link
                      href={route.path}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                        "text-sm font-medium",
                        isActive
                          ? "bg-primary text-white shadow-md"
                          : "text-slate-600 dark:text-white  dark:hover:text-slate-600 hover:bg-slate-100 hover:text-primary",
                      )}
                    >
                      {route.icons}
                      <span>{route.label}</span>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashBoardNavigation;
