"use client"
import z from 'zod'
import { ProductSchema } from '@/types/product-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';
import Tiptap from './tip-tap';


const CreateProductForm = () => {
    
    const form = useForm({
      resolver: zodResolver(ProductSchema),
      defaultValues: {
        title: "",
        description: "",
        price: 0,
      },
    })
  
  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    const { title, description, price } = values;
    console.log({ title, description, price });
  }
  return (
    <>
      <Card className='w-full shadow-[0_0_15px_rgba(255,255,255,0.05)]'>
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
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
              <FormLabel>Product Description</FormLabel>
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
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </div>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
              />
        <Button type="submit" className='w-full'>Submit</Button>
      </form>
    </Form>
        </CardContent>
      </Card></>
  )
}

export default CreateProductForm