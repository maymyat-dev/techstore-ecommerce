"use client";
import AuthForm from "@/components/auth/auth-form";
import React, { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerSchema } from "@/types/register-schema";
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
import { register } from "@/server/actions/register-action";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { execute, status, result } = useAction(register, {
    onSuccess: ({ data }) => {
      form.reset();
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data?.success, {
          action: {
            label: "Open Gmail",
            onClick: () => {
              window.open("https://mail.google.com", "_blank");
            },
          },
        });
      }
      form.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    const { name, email, password } = values;
    execute({ name, email, password });
  };
  return (
    <AuthForm
      formTitle="Create an account"
      formText="Enter your details to create your account"
      showProvider={true}
      footerLabel="Already have an account"
      footerHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">UserName</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Hla Hla" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pt-4">Email</FormLabel>
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
                  <FormLabel className="pt-4">Password</FormLabel>
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
          <Button
            type="submit"
            className={cn(
              "w-full bg-primary mt-5",
              status === "executing" && "animate-pulse"
            )}
            disabled={status === "executing"}
          >
            Register
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};

export default Register;
