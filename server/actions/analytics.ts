"use server"

import { eq, between } from "drizzle-orm"
import { db } from ".."
import { orders, products, users } from "../schema"
import { format, subDays } from "date-fns"

export const analytics = async () => {
    try {
        const pendingOrders = await db.select().from(orders).where(eq(orders.status, "pending"))

        const completedOrders = await db.select().from(orders).where(eq(orders.status, "completed"))

        const totalUsers = await db.select().from(users)

        const productCount = await db.select().from(products)

        return {
            pendingOrders: pendingOrders.length,
            completedOrders: completedOrders.length,
            totalUsers: totalUsers.length,
            productCount: productCount.length
        }

    } catch (error) {
        console.log(error)
    }
}


export const weeklyAnalytics = async () => {
    try {
        const today = new Date();
        const days = Array.from({ length: 7 }, (_, index) => {
          return  format(subDays(today,index), "dd-MM-yyyy");
        }).reverse();

        const data = await Promise.all(
            days.map(async (day) => {
                const startDay = new Date(day);
                const endDay = new Date(day);
                endDay.setDate(endDay.getDate() + 1);

                const orderData = await db.select().from(orders).where(
                    between(orders.created, startDay, endDay)
                )

                return orderData
            })
        )
        return data;
    }
    catch (error) {
        console.log(error)
    }
}