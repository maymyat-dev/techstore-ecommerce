import Benefits from "@/components/benefits";
import MainVisual from "@/components/mainvisual";
import Products from "@/components/products";
import SearchBox from "@/components/products/search-box";
import TagFilter from "@/components/products/tag-filter";
import TradeInSection from "@/components/trade-product";
import { db } from "@/server";

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string; tag?: string };
}) {
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
      <MainVisual />
      <Benefits />
      <div className="flex justify-between md:flex-row-reverse flex-col gap-4 mb-5">
        <SearchBox productWithVariants={products} />
      <TagFilter />
      </div>
      <Products searchParams={searchParams} />
      <TradeInSection />
    </main>
  );
}
