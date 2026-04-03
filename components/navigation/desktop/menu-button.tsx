"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {desktopMenus } from "@/lib/nav-config";

const MenuButton = () => {
  const pathname = usePathname();
  return (
      <ul className="hidden md:flex gap-4">
        {desktopMenus.map((menu, index) => {
          const isActive = pathname === menu.path;
          return (
            <li key={index}>
              <Link
                href={menu.path}
                className={cn("hover:text-primary", isActive && "text-primary")}
              >
                {menu.name}
              </Link>
            </li>
          );
        })}
      </ul>
  );
};

export default MenuButton;
