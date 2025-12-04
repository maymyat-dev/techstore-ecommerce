import VariantPicker from "@/components/products/variant-picker";
import formatCurrency from "@/lib/formatCurrency";
import { db } from "@/server";
import { productVariants } from "@/server/schema";
import { eq } from "drizzle-orm";
import React from "react";

type ProductDetailsPageProps = {
  params: {
    id: number;
  };
};

export async function generateStaticParams() {
  const data = await db.query.productVariants.findMany({
    with: {
      product: true,
      variantImages: true,
      variantTags: true,
    },
  });
  if (data) {
    const idArr = data.map((product) => ({
      id: product.id.toString(),
    }));
    return idArr;
  }
  return {};
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
  return (
    <>
      {productWithVariants && (
        <main>
          <div></div>
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 truncate">
              {productWithVariants.product.title}
            </h2>

            <div
              className="prose prose-neutral max-w-none text-neutral-700"
              dangerouslySetInnerHTML={{
                __html: productWithVariants.product.description,
              }}
            />

            <p className="text-sm text-neutral-600">
              {productWithVariants.productType}
            </p>

            <p className="text-2xl font-semibold text-neutral-800">
              {formatCurrency(productWithVariants.product.price)}
            </p>

            <div className="space-y-2">
              <p className="text-sm font-medium text-neutral-700">Colors</p>
              <div className="flex flex-wrap gap-3">
                {productWithVariants.product.productVariants.map((v) => (
                  <VariantPicker
                    key={v.id}
                    {...v}
                    title={productWithVariants.product.title}
                    price={productWithVariants.product.price}
                    image={v.variantImages[0]?.image_url}
                    productId={v.productId}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default ProductDetailsPage;
