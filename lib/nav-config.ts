import { Archive, Home, LifeBuoy, Settings2 } from "lucide-react";

export const desktopMenus = [
  { name: "AI Assistant", path: "/ai-assistant" },
  { name: "Support", path: "/support" },
  { name: "My Orders", path: "/dashboard/orders" },
  { name: "Settings", path: "/dashboard/settings" },
];

export const mobileMenus = [
  { name: "Home", path: "/", icon: Home },
  { name: "Support", path: "/support", icon: LifeBuoy },
  { name: "Orders", path: "/dashboard/orders", icon: Archive },
  { name: "Settings", path: "/dashboard/settings", icon: Settings2 },
];