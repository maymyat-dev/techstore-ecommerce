import React from "react";
import NavLogo from "../nav-logo";
import { ModeToggle } from "@/components/mode-button";
import UserButton from "../user-button";
import CartBtn from "../../cart/cart-btn";
import MenuButton from "./menu-button";

const DesktopNav = async ({ user }: { user: any }) => {
  return (
    <div className="flex sticky top-0 z-50 w-full h-16 border-b border-border bg-white/80 dark:bg-card backdrop-blur-md items-center justify-between px-4 mb-5">
      <NavLogo />
      <MenuButton />
      <div className="flex gap-4 items-center">
        <CartBtn />
        <UserButton user={user} />
        <ModeToggle />
      </div>
    </div>
  );
};

export default DesktopNav;
