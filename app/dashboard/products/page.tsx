import { db } from '@/server'
import React from 'react'
import { DataTable } from './data-table';
import { columns } from './columns';
import productImage from "@/public/images/image.jpg";

const ProductsPage = async () => {
  const products = await db.query.products.findMany({
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });

  const productData = products.map((product) => {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      image: productImage.src,
      variants: []
    };
  });

  return (
    <main>
      <DataTable columns={columns} data={productData} />
    </main>
  )
}

export default ProductsPage