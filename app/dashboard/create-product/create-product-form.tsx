"use client";
import z from "zod";
import { ProductSchema } from "@/types/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import Tiptap from "./tip-tap";
import { useAction } from "next-safe-action/hooks";
import { getSingleProduct, updateProduct } from "@/server/actions/products";
import { toast } from "sonner";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const CreateProductForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editIdParams = searchParams.get("edit_id") || null;
  const [editProduct, setEditProduct] = useState<string>("");

  const isProductExist = async (id: string) => { 
    if (editIdParams) {
      const res = await getSingleProduct(Number(id));
      if (res.error) {
        toast.error(res.error);
        router.push("/dashboard/products");
        return;
      }
      if (res.success) {
        setEditProduct(res.data.title);
        form.setValue("title", res.data.title);
        form.setValue("description", res.data.description);
        form.setValue("price", res.data.price);
        form.setValue("id", res.data.id);
      }
    }
  }


  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
  });

  const { execute, status, result } = useAction(updateProduct, {
    onSuccess: ({ data }) => {

      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data.success);
        router.push(`/dashboard/products`);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    const { id, title, description, price } = values;
    execute({ id, title, description, price });
  };

  useEffect(() => {
    if (editIdParams) {
      isProductExist(editIdParams);
    }
  },[])


  return (
    <>
      <Card className="w-full shadow-[0_0_15px_rgba(255,255,255,0.05)]">
        <CardHeader>
          <CardTitle>{ editIdParams ? "Edit Product" : "Create Product" }</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Title</FormLabel>
                    <FormControl>
                      <Input placeholder="eg. phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Tiptap field={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          min={0}
                          step="1"
                          className="pl-9"
                          placeholder="Price in USD"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit"  disabled={status === "executing"} className={cn("w-full bg-primary mt-5 cursor-pointer",
              status === "executing" && "animate-pulse")} >
                { editIdParams ? "Update Product" : "Create Product" }
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateProductForm;
