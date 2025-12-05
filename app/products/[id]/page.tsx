import ImageSlider from "@/components/products/image-slider";
import VariantPicker from "@/components/products/variant-picker";
import { Button } from "@/components/ui/button";
import formatCurrency from "@/lib/formatCurrency";
import { db } from "@/server";
import { productVariants } from "@/server/schema";
import { eq } from "drizzle-orm";
import { ShoppingBasket } from "lucide-react";
import React from "react";

type ProductDetailsPageProps = {
  params: { id: number };
};

export async function generateStaticParams() {
  const data = await db.query.productVariants.findMany({
    with: {
      product: true,
      variantImages: true,
      variantTags: true,
    },
  });

  return data?.map((item) => ({ id: item.id.toString() })) ?? [];
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const productWithVariants = await db.query.productVariants.findFirst({
    where: eq(productVariants.id, params.id),
    with: {
      product: {
        with: {
          productVariants: {
            with: {
              variantImages: true,
              variantTags: true,
            },
          },
        },
      },
    },
  });

  if (!productWithVariants) return null;

  const { product } = productWithVariants;

  return (
    <main className="md:flex gap-10 justify-between">

      <div className="md:flex-1">
        <ImageSlider variants={product.productVariants} />
      </div>

 
      <div className="md:flex-1 space-y-6 mt-6 md:mt-0">

   
        <h1 className="text-3xl font-semibol">
          {product.title}
        </h1>


        <div
          className="prose prose-neutral max-w-none"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />


        <div className="font-bold">
          Color: <span>{productWithVariants.productType}</span>
        </div>

 
        <div className="space-y-2">
          <div className="flex flex-wrap gap-4">
            {product.productVariants.map((v) => (
              <VariantPicker
                key={v.id}
                {...v}
                title={product.title}
                price={product.price}
                image={v.variantImages?.[0]?.image_url}
                productId={v.productId}
              />
            ))}
          </div>
        </div>


        <p className="text-3xl font-semibold">
          {formatCurrency(product.price)}
        </p>


        <Button className="w-full">
          <ShoppingBasket className="mr-2" /> Add to Cart
        </Button>

      </div>
    </main>
  );
};

export default ProductDetailsPage;
