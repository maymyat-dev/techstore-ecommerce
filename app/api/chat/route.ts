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

    let foundProducts: any[] = [];

    const result = await generateText({
      model: google("gemini-2.5-flash"),

      messages,
      // @ts-ignore
      maxSteps: 5,
      temperature: 0.7,

      system: `
You are a TechStore AI assistant.
When products are found, list their names and prices.
`,

      tools: {
        searchProducts: tool({
          description: "Search products from TechStore database",

          inputSchema: z.object({
            query: z.string(),
            maxPrice: z.number().optional(),
          }),

          execute: async ({ query, maxPrice }) => {
             let searchQuery = query.toLowerCase();

             if (searchQuery.includes("tablet")) {
               searchQuery = "ipad";
             }

             if (searchQuery.includes("phone")) {
                searchQuery = "iphone";
            }

            if (searchQuery.includes("laptop")) {
              searchQuery = "macbook";
            }
            
            let whereCondition;

            if (maxPrice !== undefined) {
              whereCondition = and(
                ilike(products.title, `%${searchQuery}%`),
                lte(products.price, maxPrice),
              );
            } else {
              whereCondition = ilike(products.title, `%${searchQuery}%`);
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
              .where(whereCondition);

            // console.log("DB results:", results);

            foundProducts = results;

            return results.map((p) => `${p.title} - $${p.price}`).join("\n");
          },
        }),
      },
    });

    return Response.json({
      text: result.text,
      products: foundProducts,
    });
  } catch (error) {
    console.error("AI Chat Error:", error);

    return Response.json({ error: "AI Server Error" }, { status: 500 });
  }
}
