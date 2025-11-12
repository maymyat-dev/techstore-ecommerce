"use client";

import { settingsSchema } from "@/types/settings-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import z from "zod";
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
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { updateDisplayName } from "@/server/actions/settings";

type ProfileFormProps = {
  name: string;
  email: string;
  setIsOpen: () => void;
};

const ProfileForm = ({ name, email, setIsOpen }: ProfileFormProps) => {
  const form = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name,
      email
    },
  });

  const { execute, status, result } = useAction(updateDisplayName, {
    onSuccess: ({ data }) => {
      form.reset();
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        setIsOpen();
        toast.success(data?.success);
      }
      form.reset();
    },
  });

  function onSubmit(values: z.infer<typeof settingsSchema>) {
    const { name, email } = values;
    execute({ name, email });
  }
  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Hla Hla" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button
            className={cn(
              "w-full bg-primary mt-5",
              status === "executing" && "animate-pulse"
            )}
            disabled={status === "executing"}
          >
            Save
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default ProfileForm;
