"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";


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
    <nav className="mb-6">
      <div className="flex justify-start gap-2 flex-wrap py-2 px-4 md:rounded-full shadow-sm rounded-sm bg-white dark:bg-gray-800">
        {routes.map((route, index) => (
          <Link href={route.path} key={index} passHref>
            <span
              className={cn(
                "flex items-center gap-2 px-4 py-4 rounded-full cursor-pointer transition-all duration-200",
                "text-sm font-medium transition-all duration-300 ease-in-out",
                pathname === route.path &&
                  "bg-primary text-white dark:bg-primary-600 dark:text-white font-semibold shadow-md shadow-primary/50"
              )}
            >
              {route.icons} {route.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default DashBoardNavigation;
