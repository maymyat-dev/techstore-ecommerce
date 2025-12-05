
import Products from "@/components/products";
import { db } from "@/server";

export default async function Home() {
  const products = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true
    },
    orderBy: (products, {desc}) => [
      desc(products.id)
    ],
  })
  
  return (
    <main>
      <Products productWithVariants={products}/>
    </main>
  );
}
