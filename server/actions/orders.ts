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
      console.log("Products from Frontend:", products);
      const session = await auth();

      if (!session)
        return { error: "You must be logged in to create an order." };

      const order = await db
        .insert(orders)
        .values({
          userID: session.user.id as string,
          total: totalPrice,
          status,
          paymentIntentId: paymentId,
        })
        .returning();

      await Promise.all(
        products.map((product) =>
          db.insert(orderProduct).values({
            quantity: product.quantity,
            productID: product.productId,
            productVariantID: product.variantId,
            orderID: order[0].id,
          })
        )
      );

      return { success: "Order created successfully" };
    }
  );
