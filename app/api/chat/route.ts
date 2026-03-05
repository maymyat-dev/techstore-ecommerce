import { db } from "@/server";
import { products, productVariants } from "@/server/schema";

import { google } from "@ai-sdk/google";
import { generateText, tool } from "ai";

import { z } from "zod";
import { ilike, eq, and, lte } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];

    const result = await generateText({
      model: google("gemini-2.5-flash"),

      messages,

      system: `
You are TechStore AI Assistant.

Your job is to help users find products.

Rules:
- If the user asks about products, use the searchProducts tool.
- Recommend products clearly.
- Mention product name, price, and features.
- Be friendly and concise.
`,

      tools: {
        searchProducts: tool({
          description: "Search products from TechStore database",

          inputSchema: z.object({
            query: z.string(),
            maxPrice: z.number().optional(),
          }),

          execute: async ({ query, maxPrice }) => {
            try {
              const conditions = [ilike(products.title, `%${query}%`)];

              if (maxPrice !== undefined) {
                conditions.push(lte(products.price, maxPrice));
              }

              const results = await db
                .select({
                  id: products.id,
                  title: products.title,
                  description: products.description,
                  price: products.price,
                  color: productVariants.color,
                  type: productVariants.productType,
                })
                .from(products)
                .leftJoin(
                  productVariants,
                  eq(products.id, productVariants.productId),
                )
                .where(and(...conditions))
                .limit(5);

              return results;
            } catch (error) {
              console.error("DB search error:", error);
              return [];
            }
          },
        }),
      },
    });

    return Response.json({
      text: result.text ?? "I couldn't find any products. Please try again.",
    });
  } catch (error) {
    console.error("AI Chat Error:", error);

    return Response.json({ error: "AI Server Error" }, { status: 500 });
  }
}
