
import Image from "next/image";
import formatCurrency from "@/lib/formatCurrency";
import Link from "next/link";
import CommonPagination from "./common-pagination";
import { getProducts } from "@/hooks/get-products";

const Products = async ({ 
  searchParams = {}
}: { 
  searchParams: { page?: string; tag?: string } 
}) => {
  const PLACEHOLDER_IMAGE = "/images/placeholder-product.png";
  
  const page = Number(searchParams.page) || 1;
  const tag = searchParams.tag || "iphone";


  const res = await getProducts(page, 6, tag);

  if (res.error) return <div className="p-10 text-center text-red-500">{res.error}</div>;

  const products = res.success || [];
  const totalPages = res.totalPages || 1;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 opacity-80">
        <Image src="/images/empty-cart.png" alt="No Products" width={160} height={160} className="mb-4 opacity-70" />
        <p className="text-neutral-700 font-medium">No products available for this tag.</p>
      </div>
    );
  }

  return (
    <main>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((p) => {
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
                className="w-full h-48 object-contain rounded-md"
              />

              <div className="text-center pt-2 mt-2">
                <h3 className="text-sm font-medium truncate">{p.product.title}</h3>
                <p className="text-lg font-semibold">{formatCurrency(p.product.price)}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <CommonPagination 
          totalPages={totalPages} 
          currentPage={page} 
        />
      </div>
    </main>
  );
};

export default Products;