"use client";
import { VariantsWithProduct } from "@/lib/infer-types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import formatCurrency from "@/lib/formatCurrency";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductPagination from "./product-pagination";

type ProductsProps = {
  productWithVariants: VariantsWithProduct[];
};

const Products = ({ productWithVariants }: ProductsProps) => {
  const PLACEHOLDER_IMAGE = "/images/placeholder-product.png";
  const params = useSearchParams();
  const tagParams = params.get("tag") || "iphone";

  const [filterProducts, setFilterProducts] = useState<VariantsWithProduct[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filterProducts.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filterProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    const filtered = productWithVariants.filter(
      (item) => item.variantTags[0]?.tag.toLowerCase() === tagParams
    );

    setFilterProducts(filtered);
    setCurrentPage(1);
    setLoading(false);
  }, [tagParams, productWithVariants]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-neutral-500">
        Loading...
      </div>
    );
  }

  if (filterProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center opacity-80">
        <Image
          src="/images/empty-cart.png"
          alt="No Products"
          width={160}
          height={160}
          className="mb-4 opacity-70"
        />
        <p className="text-neutral-700 dark:text-neutral-300 font-medium">
          No products available for this category.
        </p>
      </div>
    );
  }

  return (
    <main>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {paginatedProducts.map((p) => {
        const imageUrl = p.variantImages[0]?.image_url ?? PLACEHOLDER_IMAGE;

        return (
          <Link
            key={p.id}
            className="bg-white dark:bg-gray-800 rounded-sm p-4 block hover:shadow-md transition-all duration-200"
            href={{
              pathname: `/products/${p.id}`,
              query: {
                vid: p.id,
                productId: p.productId,
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
              priority
              className="w-full h-48 object-contain rounded-md"
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
      
      </div>
      <ProductPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </main>
  );
};

export default Products;
