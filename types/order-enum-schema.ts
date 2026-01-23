import * as z from "zod";

export const orderStatusEnum = z.enum([
  "pending",
  "shipped",
  "completed",
  "cancelled",
]);

export type OrderStatus = z.infer<typeof orderStatusEnum>;