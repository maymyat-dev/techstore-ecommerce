import Image from "next/image";
import CommonPagination from "./common-pagination";
import { getProducts } from "@/hooks/get-products";
import { ProductCard } from "./product-card";

const Products = async ({
  searchParams = {},
}: {
  searchParams: { page?: string; tag?: string };
}) => {
  const PLACEHOLDER_IMAGE = "/images/placeholder-product.png";

  const page = Number(searchParams.page) || 1;
  const tag = searchParams.tag || "iphone";

  const res = await getProducts(page, 6, tag);

  if (res.error)
    return <div className="p-10 text-center text-red-500">{res.error}</div>;

  const products = res.success || [];
  const totalPages = res.totalPages || 1;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 opacity-80">
        <Image
          src="/images/empty-cart.png"
          alt="No Products"
          width={160}
          height={160}
          className="mb-4 opacity-70"
        />
        <p className="text-neutral-700 font-medium">
          No products available for this tag.
        </p>
      </div>
    );
  }

  return (
    <main>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <CommonPagination totalPages={totalPages} currentPage={page} />
      </div>
    </main>
  );
};

export default Products;
