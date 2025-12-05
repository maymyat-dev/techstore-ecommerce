import { VariantsWithProduct } from "@/lib/infer-types";
import React from "react";
import Image from "next/image";
import formatCurrency from "@/lib/formatCurrency";
import Link from "next/link";

type ProductsProps = {
  productWithVariants: VariantsWithProduct[];
};

const Products = ({ productWithVariants }: ProductsProps) => {

  const PLACEHOLDER_IMAGE = "/images/placeholder-product.png"; 

  return (
    <main className="grid grid-cols-2 lg:grid-cols-3  gap-4">
      {productWithVariants.map((p) => {
        
        const imageUrl = p.variantImages[0]?.image_url ?? PLACEHOLDER_IMAGE;

        return (
         
          <Link 
            key={p.id} 
            className="bg-white dark:bg-gray-800 rounded-sm p-4 block hover:shadow-lg transition-shadow duration-200"
            href={{ 
              pathname: `/products/${p.id}`,
              query: {
                productId: p.product.id,
                type: p.productType,
                image: imageUrl, 
                title: p.product.title,
                price: p.product.price,
              },
            }}
          >
            <Image
              src={imageUrl}
              alt={p.product.title}
              width={500}
              height={300}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="w-full h-48 object-contain rounded-md"
              priority={false}
            />
            
            <div className="border-t pt-2 mt-2">
              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                {p.product.title}
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-semibold">
                {formatCurrency(p.product.price)}
              </p>
            </div>
          </Link>
        );
      })}
    </main>
  );
};

export default Products;