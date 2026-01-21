"use server";
import { loginSchema } from "@/types/login-schema";
import { actionClient } from "./safe-action";
import { db } from "@/server";
import { twoFactorToken, users } from "../schema";
import { eq } from "drizzle-orm";
import {
  generateEmailVerificationToken,
  generateTwoFactorCode,
  getTwoFactorCodeByEmail,
} from "./tokens";
import { sendEmail, sendTwoFactorCodeEmail } from "./emails";
import { signIn } from "../auth";
import { AuthError } from "next-auth";

export const login = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput: { email, password, code } }) => {
    try {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser?.email !== email) {
        return {
          error: "Please check your valid credentials",
        };
      }

      if (!existingUser.password) {
        return {
          error:
            "This email is registered via Google/Github. Please use social login.",
        };
      }

      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(
          existingUser.email
        );
        await sendEmail(
          verificationToken[0].email,
          verificationToken[0].token,
          existingUser.name!?.slice(0, 5)
        );
        return {
          success: "Email verification resent.",
        };
      }

      if (existingUser.isTwoFactorEnabled) {
        if (code) {
          const twoFactorCode = await getTwoFactorCodeByEmail(existingUser.email);

          
          if (!twoFactorCode) {
            return { twoFactor: "Two factor code not found" };
          }

          if (code !== twoFactorCode.token) {
            return { twoFactor: "Two factor code is incorrect" };
          }

          const isExpired = new Date() > new Date(twoFactorCode.expires);

          if (isExpired) {
            return { twoFactor: "Two factor code has expired" };
          }

          await db.delete(twoFactorToken).where(eq(twoFactorToken.id, twoFactorCode.id));
        } else {
          const twoFactorCode = await generateTwoFactorCode(existingUser.email);

          if (!twoFactorCode) {
            return { twoFactor: "Failed to generate two factor code" };
          }

          await sendTwoFactorCodeEmail(
            twoFactorCode[0].email,
            twoFactorCode[0].token
          );
          return { twoFactor: "Two Factor code sent to your email" };
        }
      }
      await signIn("credentials", { email, password, redirectTo: "/" });

      return { success: "Login successful" };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid email or password" };
          case "OAuthSignInError":
            return { error: error.message };
          default:
            return { error: "An unknown authentication error occurred." };
        }
      }
      throw error;
    }
  });
