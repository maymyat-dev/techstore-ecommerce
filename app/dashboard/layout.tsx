import DashBoardNavigation from "@/components/navigation/dashboard-nav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/server/auth";
import {
  Archive,
  BarChart2,
  Package,
  PackageCheck,
  Settings2,
} from "lucide-react";
import React from "react";

const adminRoutes = [
  {
    label: "Analytics",
    path: "/dashboard/analytics",
    icons: <BarChart2 size={16} />,
  },
  {
    label: "Create Product",
    path: "/dashboard/create-product",
    icons: <PackageCheck size={16} />,
  },
  {
    label: "Products",
    path: "/dashboard/products",
    icons: <Package size={16} />,
  },
];
const commonRoutes = [
  {
    label: "Orders",
    path: "/dashboard/orders",
    icons: <Archive size={16} />,
  },
  {
    label: "Settings",
    path: "/dashboard/settings",
    icons: <Settings2 size={16} />,
  },
];
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const isAdmin = session?.user.role === "admin";
  const routes = isAdmin ? [...adminRoutes, ...commonRoutes] : commonRoutes;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {isAdmin && <DashBoardNavigation routes={routes} />}

        <main className="flex flex-col flex-1 w-full overflow-x-hidden">
          {isAdmin && (
            <>
              <header className="flex items-center gap-2 p-4 border-b bg-white md:hidden">
                <SidebarTrigger />
                <span className="font-semibold text-sm">Dashboard</span>
              </header>

              <div className="hidden md:flex items-center px-4">
                <SidebarTrigger />
              </div>
            </>
          )}

          <section className="flex-1 max-w-7xl mx-auto w-full px-6 py-4">
            {children}
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
}
