"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginRequired({ onClose }: { onClose?: () => void }) {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center px-4">
      <Card className="max-w-md w-full shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">
            Login Required
          </CardTitle>
          <p className="text-muted-foreground text-sm mt-1">
            Please sign in to continue. This helps us keep your account and
            orders safe.
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <Link href="/auth/login" className="w-full" onClick={onClose}>
            <Button className="w-full py-5 text-base">
              Log In <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link href="/auth/register" className="w-full">
            <Button
              variant="outline"
              className="w-full py-5 text-base hover:bg-accent"
            >
              Create an Account <UserPlus className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ShieldCheck className="h-3 w-3" />
              SSL Secure
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ShieldCheck className="h-3 w-3" />
              Protected Checkout
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
