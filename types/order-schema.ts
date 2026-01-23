import * as z from "zod";
import { orderStatusEnum } from "./order-enum-schema";

export const createOrderSchema = z.object({
  totalPrice: z.number(),
  status: orderStatusEnum,
  paymentId: z.string(),
  products: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number(),
      variantId: z.number(),
    }),
  ),
});