"use client";

import NavLogo from "./nav-logo";
import CartBtn from "../cart/cart-btn";
import UserButton from "./user-button";
import { ModeToggle } from "@/components/mode-button";
import { Archive, BotIcon, Home, LifeBuoy, Settings2 } from "lucide-react"; 
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const menus = [
  { name: "Home", path: "/", icon: <Home size={22} /> },
  { name: "Support", path: "/support", icon: <LifeBuoy size={22} /> },
  { name: "Orders", path: "/dashboard/orders", icon: <Archive size={22} /> },
  { name: "Settings", path: "/dashboard/settings", icon: <Settings2 size={22} /> },
];

const MobileNav = ({ user }: { user: any }) => {
  const pathname = usePathname();

  return (
    <>
      <div className="md:hidden flex sticky top-0 z-50 w-full h-16 border-b border-border bg-white/80 dark:bg-card backdrop-blur-md items-center justify-between px-4 mb-5">
        <NavLogo />
        <div className="flex items-center gap-2">
          <CartBtn />
          <UserButton user={user} />
          <ModeToggle />
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 w-full z-50">
        <div className="relative flex items-center justify-between rounded-t-4xl backdrop-blur-xl shadow-primary/10 border border-black/5 dark:border-white/10">
          
          <div className="flex flex-1 justify-around items-center">
            {menus.slice(0, 2).map((menu, index) => (
              <Link key={index} href={menu.path} className={cn("flex flex-col items-center gap-1 transition-all", pathname === menu.path ? "text-primary scale-110" : "text-black dark:text-white")}>
                {menu.icon}
                <span className="text-[10px] font-medium">{menu.name}</span>
              </Link>
            ))}
          </div>

          <div className="relative -top-6">
             <Link href="/ai-assistant">
                <div className="bg-primary p-4 rounded-full shadow-lg shadow-primary/40 border-4 border-background animate-pulse-slow">
                   <BotIcon className="text-white" size={28} />
                </div>
             </Link>
          </div>

          <div className="flex flex-1 justify-around items-center">
            {menus.slice(2, 4).map((menu, index) => (
              <Link key={index} href={menu.path} className={cn("flex flex-col items-center gap-1 transition-all", pathname === menu.path ? "text-primary scale-110" : "text-black dark:text-white")}>
                {menu.icon}
                <span className="text-[10px] font-medium">{menu.name}</span>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default MobileNav;