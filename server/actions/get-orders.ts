"use server";

import { db } from "@/server";
import { auth } from "@/server/auth";
import { orders } from "@/server/schema";
import { count, eq, desc } from "drizzle-orm";

export const getOrders = async (page: number = 1, limit: number = 10) => {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const offset = (page - 1) * limit;
  const isAdmin = session.user.role === "admin";

 
  const filterCondition = isAdmin
    ? undefined
    : eq(orders.userID, session.user.id);

 
  const totalOrdersResult = await db
    .select({ value: count() })
    .from(orders)
    .where(filterCondition);

  const totalCount = totalOrdersResult[0].value;
  const totalPages = Math.ceil(totalCount / limit);

 
  const customerOrders = await db.query.orders.findMany({
    where: filterCondition,
    limit: limit,
    offset: offset,
    orderBy: [desc(orders.id)],
    with: {
      orderProduct: {
        with: {
          product: true,
          productVariants: {
            with: { variantImages: true },
          },
          order: true,
        },
      },
    },
  });

  return { customerOrders, totalPages, currentPage: page };
};
