import { auth } from "@/server/auth";
import { NextResponse } from "next/server";

const ADMIN_ROUTES = [
  "/dashboard/analytics",
  "/dashboard/create-product",
  "/dashboard/products",
];

export default auth((request) => {
  const session = request.auth; 
  const path = request.nextUrl.pathname;

  const isAdminRoute = ADMIN_ROUTES.some((route) => path.startsWith(route));

  if (isAdminRoute) {
    if (!session) {
      return NextResponse.redirect(
        new URL("/", request.url), 
      );
    }

    if (session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
