import { db } from "@/server";
import { products, productVariants, variantImages } from "@/server/schema";

import { google } from "@ai-sdk/google";
import { generateText, tool } from "ai";

import { z } from "zod";
import { ilike, eq, and, lte, or } from "drizzle-orm";

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
When products are found, list their names, product types and prices.
`,

      tools: {
        searchProducts: tool({
          description: "Search products from TechStore database",

          inputSchema: z.object({
            query: z.string(),
            maxPrice: z.number().optional(),
            type: z.string().optional(),
          }),

          execute: async ({ query, maxPrice }) => {
           let searchQuery = query.toLowerCase().trim();

           searchQuery = searchQuery
             .replace(/\bphone\b/g, "iphone")
             .replace(/\btablet\b/g, "ipad")
             .replace(/\blaptop\b/g, "macbook")
              .replace(/\bmonitor\b/g, "imac")
              .replace(/\bearphone\b/g, "airpods")
              .replace(/\biwatch\b/g, "apple watch");

           const words = searchQuery.split(/\s+/).filter((w) => w.length > 0);

           let conditions = [];

           words.forEach((word) => {
             conditions.push(
               or(
                 ilike(products.title, `%${word}%`),
                 ilike(productVariants.productType, `%${word}%`),
               ),
             );
           });

           if (maxPrice !== undefined) {
             conditions.push(lte(products.price, maxPrice));
           }

           const whereCondition = and(...conditions);

            const results = await db
              .select({
                id: products.id,
                title: products.title,
                description: products.description,
                price: products.price,
                variantId: productVariants.id,
                color: productVariants.color,
                type: productVariants.productType,
                image_url: variantImages.image_url,
                name: variantImages.name,
                size: variantImages.size,
                order: variantImages.order,
              })
              .from(products)
              .leftJoin(
                productVariants,

                eq(products.id, productVariants.productId),
              )
              .leftJoin(
                variantImages,
                eq(productVariants.id, variantImages.variantId),
              )
              .where(whereCondition);
            
          const uniqueResults = [
            ...new Map(results.map((item) => [item.variantId, item])).values(),
          ];

            console.log("DB results:", uniqueResults);

            foundProducts = uniqueResults;

            return uniqueResults
              .map((p) => `${p.title} (${p.color}) - $${p.price}`)
              .join("\n");
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
