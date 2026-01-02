"use server";

import { paymentSchema } from "@/types/payment-schema";
import { actionClient } from "./safe-action";
import { auth } from "../auth";
import Stripe from "stripe";
import { orderProduct, orders } from "../schema";
import { db } from "..";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const processPayment = actionClient
  .schema(paymentSchema)
  .action(async ({ parsedInput }) => {
    const { amount, currency, cart } = parsedInput;

  
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "You need to be logged in" };
    }

    if (!amount || cart.length === 0) {
      return { error: "Cart is empty" };
    }

    try {

      const paymentIntent = await stripe.paymentIntents.create(
        {
          amount: Math.round(amount),
          currency: currency.toLowerCase(),
          automatic_payment_methods: { enabled: true },
        },
        {
          idempotencyKey: randomUUID(), 
        }
      );

      const existingOrder = await db.query.orders.findFirst({
        where: eq(orders.paymentIntentId, paymentIntent.id),
      });

      if (!existingOrder) {

        const [order] = await db
          .insert(orders)
          .values({
            userID: session.user.id,
            total: amount / 100,
            status: "pending",
            paymentIntentId: paymentIntent.id,
          })
          .returning({ id: orders.id });

      
        await db.insert(orderProduct).values(
          cart.map((item) => ({
            orderID: order.id,
            productID: item.productId,
            quantity: item.quantity,
            productVariantID: item.variantId ?? null,
          }))
        );
      }

    
      return {
        success: {
          paymentIntentId: paymentIntent.id,
          clientSecret: paymentIntent.client_secret, 
          user_email: session.user.email,
        },
      };
    } catch (error: any) {
      if (error?.code === "23505") {
        return { error: "Duplicate payment attempt blocked" };
      }

      console.error("Stripe / Payment Error:", error);
      return { error: "Payment failed. Please try again." };
    }
  });
