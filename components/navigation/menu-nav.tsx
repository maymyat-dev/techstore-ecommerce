"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    name: "AI Assistant",
    path: "/ai-assistant",
  },
  {
    name: "Support",
    path: "/support",
  },
  {
    name: "My Orders",
    path: "/dashboard/orders",
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
  },
];

const MenuNav = () => {
  const pathname = usePathname();
  return (
    <div>
      <ul className="flex gap-4">
        {menus.map((menu, index) => {
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
    </div>
  );
};

export default MenuNav;
