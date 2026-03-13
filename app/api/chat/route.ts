import { db } from "@/server";
import { products, productVariants, variantImages } from "@/server/schema";

import { google } from "@ai-sdk/google";
import { generateText, tool } from "ai";

import { z } from "zod";
import { ilike, eq, and, lte, or, desc, gte } from "drizzle-orm";

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
You are TechStore AI, a helpful assistant for a tech store.
သင်သည် TechStore AI ဖြစ်ပြီး နည်းပညာပစ္စည်းများ ရောင်းချသော store အတွက် customer များကို ကူညီပေးသော assistant ဖြစ်သည်။

IMPORTANT RULES / အရေးကြီးသော စည်းမျဉ်းများ:

1. SEARCH TRIGGER: If the user mentions a product name OR a color (e.g., iPhone, iPad, Orange, Black, Pink), you MUST call the searchProducts tool. 
   User က product name သို့မဟုတ် အရောင် (ဥပမာ iPhone, Orange, Black) တစ်ခုခုပြောပါက searchProducts tool ကို မဖြစ်မနေ သုံးရမည်။

2. DATABASE STRUCTURE: In our store, color names (like 'orange', 'black', 'pink') are stored in the "productType" field. When a user asks for a color, use that color name as the 'query' or 'type' parameter.
   ကျွန်ုပ်တို့ store တွင် အရောင်အမည်များကို "productType" field ထဲ၌ သိမ်းဆည်းထားသည်။ User က အရောင်မေးပါက ထိုအရောင်ကို tool သို့ ပေးပို့ရမည်။

3. DO NOT HALLUCINATE: Do not rely on general knowledge. If the database returns no "Orange iPhone," tell the user it is unavailable, even if Apple officially makes one.
   Apple အကြောင်း သင့်အထွေထွေဗဟုသုတကို မသုံးပါနှင့်။ Database ထဲရှိသည်ကိုသာ ဖြေပါ။

4. COMPARISON: If comparing, search for both first. Explain descriptions in simple terms.

5. SMART CONTEXT UPDATE (STEP-BY-STEP):
   - You must maintain a "State" of the current search.
   - If the user provides a new color (e.g., "Silver"), replace the old 'type' value with "Silver" but KEEP the previous 'query' (e.g., "iPhone 17 Pro Max") and 'minPrice' (e.g., 2000).
   - If the user provides a specific model, update the 'query' but keep the 'type' (color) and 'price' filters active.
   - ALWAYS combine the latest information with the existing context to call the searchProducts tool.
   
   Example Workflow:
   1. User: "iPhone above $2000" -> {query: "iPhone", minPrice: 2000}
   2. User: "Orange" -> {query: "iPhone", minPrice: 2000, type: "orange"}
   3. User: "Black" -> {query: "iPhone", minPrice: 2000, type: "black"}
   4. User: "iPhone 17 Pro Max" -> {query: "iPhone 17 Pro Max", minPrice: 2000, type: "black"}
   5. User: "Silver" -> {query: "iPhone 17 Pro Max", minPrice: 2000, type: "silver"}

   6. FILTER OVERRIDE: If the user explicitly mentions a new specific product name or a full model (e.g., "iPhone 17 Pro Max"), reset the previous color and price filters unless they are mentioned again in the new message. 
   User က product နာမည်အပြည့်အစုံ အသစ်ထပ်ပြောလာရင် အရင်က အရောင်နဲ့ ဈေးနှုန်း filter တွေကို ဖျက်ပြီး အသစ်အနေနဲ့ ရှာပေးရမည်။

STYLE / ပြောဆိုပုံ:
Speak like a friendly store staff member.
Friendly store staff တစ်ယောက်လို ယဉ်ကျေးစွာ ပြောဆိုရမည်။
`,

      tools: {
        searchProducts: tool({
          description: "Search products from TechStore database",

          inputSchema: z.object({
            query: z.string(),
            maxPrice: z.number().optional(),
            minPrice: z.number().optional(),
            type: z.string().optional(),
          }),

          execute: async ({ query, maxPrice, minPrice, type }) => {
            let searchQuery = query.toLowerCase().trim();

            searchQuery = searchQuery
              .replace(/\bphone\b/g, "iphone")
              .replace(/\btablet\b/g, "ipad")
              .replace(/\blaptop\b/g, "macbook")
              .replace(/\bmonitor\b/g, "imac")
              .replace(/\bearphone\b/g, "airpods")
              .replace(/\biwatch\b/g, "apple watch")
              .replace(/\bwatch\b/g, "apple watch");

            const words = searchQuery.split(/\s+/).filter((w) => w.length > 0);

            const priceStopWords = [
              "under",
              "below",
              "above",
              "than",
              "less",
              "more",
              "budget",
              "around",
              "price",
            ];

            const searchWords = words.filter((word) => {
              const cleanWord = word.replace(/[$]/g, "");
              const wordAsNumber = Number(cleanWord);

              const isPriceStopWord = priceStopWords.includes(cleanWord);
              const isPriceValue =
                (!isNaN(wordAsNumber) &&
                  maxPrice !== undefined &&
                  wordAsNumber === maxPrice) ||
                (minPrice !== undefined && wordAsNumber === minPrice);

              return !isPriceStopWord && !isPriceValue;
            });

            let conditions = [];

            if (type) {
              conditions.push(ilike(productVariants.productType, `%${type}%`));
            }

            if (searchWords.length > 0) {
              searchWords.forEach((word) => {
                if (isNaN(Number(word)) && word !== type?.toLowerCase()) {
                  conditions.push(
                    or(
                      ilike(products.title, `%${word}%`),
                      ilike(productVariants.productType, `%${word}%`),
                    ),
                  );
                }
              });
            }

            if (maxPrice !== undefined) {
              conditions.push(lte(products.price, maxPrice));
            }

            if (minPrice !== undefined) {
              conditions.push(gte(products.price, minPrice));
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
              .where(whereCondition)
              .orderBy(desc(products.createdAt))
              .limit(20);

            const uniqueResults = [
              ...new Map(
                results.map((item) => [item.variantId, item]),
              ).values(),
            ];

            console.log("DB results:", uniqueResults);

            foundProducts = uniqueResults;

            return uniqueResults.length > 0
              ? uniqueResults
                  .map((p) => `${p.title} (${p.color}) - $${p.price}`)
                  .join("\n")
              : "No products found matching your search.";
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
