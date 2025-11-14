"use server";

import { settingsSchema, twoFactorSchema } from "@/types/settings-schema";
import { actionClient } from "./safe-action";
import { db } from "@/server";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateDisplayName = actionClient
  .schema(settingsSchema)
  .action(async ({ parsedInput: { name, email } }) => {
    console.log("existing user", name, email);
    if (!email) {
      return { error: "Email is required" };
    }
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    console.log(existingUser);

    if (!existingUser) {
      return { error: "User not Found" };
    }

    await db.update(users).set({ name }).where(eq(users.email, email));
    revalidatePath("/dashboard/settings");
    return { success: "Name updated successfully" };
  });

export const twoFactorToggler = actionClient
  .schema(twoFactorSchema)
  .action(async ({ parsedInput: { isTwoFactorEnabled, email } }) => {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) {
      return { error: "Something went wrong" };
    }

    await db
      .update(users)
      .set({ isTwoFactorEnabled })
      .where(eq(users.email, email));

    revalidatePath("/dashboard/settings");
    return { success: "Two factor updated successfully" };
  });
