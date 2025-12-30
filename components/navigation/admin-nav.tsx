import { auth } from "@/server/auth";
import {
  CirclePlus,
  CircleSmall,
  LayoutDashboard,
  ShieldUser,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const AdminNav = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return null;
  }
  return (
    <nav className="bg-black text-white px-6 py-3 shadow-md">
      <div className="hidden sm:flex items-center justify-between">
        <div className="flex items-center sm:gap-6 gap-2 flex-wrap">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <ShieldUser className="w-5 h-5" />
            ADMIN MODE
          </div>

          <div className="w-px h-6 bg-gray-600" />

          <Link
            href="/dashboard/analytics"
            className="flex items-center gap-2 text-sm font-medium truncate text-gray-200 hover:text-primary hover:underline transition"
          >
            <LayoutDashboard className="w-5 h-5" />
            Go to Dashboard
          </Link>

          <Link
            href="/dashboard/create-product"
            className="flex items-center gap-2 text-sm font-medium truncate text-gray-200 hover:text-primary hover:underline transition"
          >
            <CirclePlus className="w-5 h-5" />
            Add New Product
          </Link>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>

            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="hidden lg:inline">System Admin Panel</span>
          <span className="lg:hidden text-emerald-500 font-medium">Active</span>
        </div>
      </div>

      <div className="sm:hidden py-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
            <ShieldUser className="w-4 h-4" />
            ADMIN MODE
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>

            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
            Active
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href="/dashboard/analytics"
            className="flex-1 flex items-center justify-center gap-2 rounded-md bg-white/5 px-3 py-2 text-xs hover:bg-white/10 transition"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>

          <Link
            href="/dashboard/create-product"
            className="flex-1 flex items-center justify-center gap-2 rounded-md bg-white/5 px-3 py-2 text-xs hover:bg-white/10 transition"
          >
            <CirclePlus className="w-4 h-4" />
            Add Product
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
