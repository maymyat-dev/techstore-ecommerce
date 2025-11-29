import { db } from '@/server'
import React from 'react'
import { DataTable } from './data-table';
import { columns } from './columns';
import productImage from "@/public/images/image.jpg";

const ProductsPage = async () => {
  const products = await db.query.products.findMany({
    with: {
      productVariants: {
        with: {
          variantImages: true,
          variantTags: true
        }
      }
    },
    orderBy: (products, { desc }) => desc(products.id),
  });

  const productData = products.map((product) => {
    if (product.productVariants.length === 0) { 
      return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      image: productImage.src,
      variants: [],
    };
    }
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.productVariants[0]?.variantImages[0]?.image_url,
      variants: product.productVariants,
    };
  });

  return (
    <main>
      <DataTable columns={columns} data={productData} />
    </main>
  )
}

export default ProductsPage