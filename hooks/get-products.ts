"use server";

import { db } from "@/server";
import { productVariants, variantTags } from "@/server/schema";
import { count, desc, eq, and, ilike } from "drizzle-orm";

export const getProducts = async (
  page: number = 1,
  limit: number = 6,
  tag?: string
) => {
  try {
    const offset = (page - 1) * limit;

    
    const tagCondition = tag ? ilike(variantTags.tag, tag) : undefined;

    const totalCountResult = await db
      .select({ value: count() })
      .from(productVariants)
      .leftJoin(variantTags, eq(productVariants.id, variantTags.variantId))
      .where(tagCondition);

    const totalCount = totalCountResult[0].value;
    const totalPages = Math.ceil(totalCount / limit);

    
    const products = await db.query.productVariants.findMany({
      where: (variants, { exists }) => {
        if (!tag) return undefined;
        return exists(
          db
            .select()
            .from(variantTags)
            .where(
              and(
                eq(variantTags.variantId, variants.id),
                ilike(variantTags.tag, tag) 
              )
            )
        );
      },
      limit: limit,
      offset: offset,
      orderBy: [desc(productVariants.id)],
      with: {
        product: true,
        variantImages: true,
        variantTags: true,
      },
    });

    return { success: products, totalPages, currentPage: page };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Failed to fetch products" };
  }
};
