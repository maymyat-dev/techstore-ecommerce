"use client";
import AuthForm from "@/components/auth/auth-form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginSchema } from "@/types/login-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { login } from "@/server/actions/login-action";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";



const Login = () => {
  const searchParams = useSearchParams();
const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [isTwoFactorOn, setIsTwoFactorOn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

const { execute, status } = useAction(login, {
  onSuccess: async ({ data }) => {
    if (data?.error) {
      toast.error(data.error);
      form.reset();
      return;
    }

    if (data?.twoFactor) {
      toast.success(data.twoFactor);
      setIsTwoFactorOn(true);
      return;
    }

  },
});


  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const { email, password, code } = values;
    execute({ email, password, code });
  };
  return (
    <AuthForm
          formTitle={isTwoFactorOn ? "Two Factor Authentication" : "Login to your account"}
          formText={isTwoFactorOn ? "Enter the code sent to your email" : "Welcome back! Please sign in to your account"}
      showProvider={true}
      footerLabel="Don't have an account?"
      footerHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {isTwoFactorOn && (
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex justify-center flex-col items-center">
                  <FormLabel>We have sent a code to your email</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      disabled={status === "executing"}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {!isTwoFactorOn && (
            <div>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pt-5">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isVisible ? "text" : "password"}
                          placeholder="********"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setIsVisible((p) => !p)}
                          className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                        >
                          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end mt-2">
                <Link
                  href="/auth/reset"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          )}
          <Button
            className={cn(
              "w-full bg-primary mt-5",
              status === "executing" && "animate-pulse"
            )}
            disabled={status === "executing"}
          >
            {isTwoFactorOn ? "Verify Code" : "Login"}
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};

export default Login;
