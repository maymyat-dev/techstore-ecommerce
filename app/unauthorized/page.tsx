import React from "react";
import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">
          403 – Access Denied
        </h1>

        <p className="text-muted-foreground">
          You don’t have permission to access this page.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="px-4 py-2 rounded bg-black text-white"
          >
            Go Home
          </Link>

          <Link
            href="/dashboard/orders"
            className="px-4 py-2 rounded border"
          >
            My Orders
          </Link>
        </div>
      </div>
    </main>
  );
};

export default UnauthorizedPage;
