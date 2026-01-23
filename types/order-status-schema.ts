import * as z from "zod";
import { orderStatusEnum } from "./order-enum-schema";

export const orderStatusSchema = z.object({
  id: z.number(),
  status: orderStatusEnum,
});


