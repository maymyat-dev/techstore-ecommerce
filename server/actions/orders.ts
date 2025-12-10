"use server";
import { db } from "@/server";
import { auth } from "../auth";
import { orderProduct, orders } from "../schema";
import { actionClient } from "./safe-action";
import { createOrderSchema } from "@/types/order-schema";

export const createOrder = actionClient
  .schema(createOrderSchema)
  .action(
    async ({ parsedInput: { products, totalPrice, status, paymentId } }) => {
      const session = await auth();

      if (!session)
        return { error: "You must be logged in to create an order." };

      const order = await db
        .insert(orders)
        .values({
          userID: session.user.id,
          total: totalPrice,
          status,
        })
        .returning();

      products.map(async (product) => {
        await db.insert(orderProduct).values({
          quantity: product.quantity,
          productID: product.productId,
          productVariantID: product.variantId,
          orderID: order[0].id,
        });
      });
      return { success: "Order created successfully" };
    }
  );
