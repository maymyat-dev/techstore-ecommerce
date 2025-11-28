"use server"

import { actionClient } from "./safe-action"
import { db } from "@/server"
import { VariantSchema } from "@/types/variant-schema"
import { eq } from "drizzle-orm"
import { products, productVariants, variantImages, variantTags } from "../schema"
import { revalidatePath } from "next/cache"

export const createVariant = actionClient
    .schema(VariantSchema)
.action(async({parsedInput: {color, tags, id, variantImage : vImgs, editMode, productType, productId}}) => {
    try {
        if (editMode && id) {
           console.log("update variant")
        } 
        if (!editMode) {
            const variant = await db.insert(productVariants).values({
                color,
                productType,
                productId
            }).returning()
            const product = await db.query.products.findFirst({
                where: eq(products.id, productId)
            })
            await db.insert(variantTags).values(tags.map((tag) => {
                return {
                    tag,
                    variantId: variant[0].id

                }
            }))
            await db.insert(variantImages).values(
                vImgs.map((img, index) => {
                    return {
                        image_url: img.url,
                        name: img.name,
                        size: img.size.toString(),
                        order: index,
                        variantId: variant[0].id
                    }
                })
            )
            revalidatePath("/dashboard/products")
            return {success: "Variant created successfully"}
        }
        
    } catch (error) {
        console.log(error)
        return {error: "Something went wrong"}
   }
})


