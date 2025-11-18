import * as z from "zod";

export const ProductSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(3, {
        message: "Title must be at least 3 characters long",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters long",
    }),
    price: z.number().min(1, {
        message: "Price must be at least 1",
    }),
})