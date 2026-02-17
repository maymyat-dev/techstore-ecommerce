import Image from "next/image";
import formatCurrency from "@/lib/formatCurrency";
import Link from "next/link";
import CommonPagination from "./common-pagination";
import { getProducts } from "@/hooks/get-products";
import { ShoppingBasket } from "lucide-react";

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
        {products.map((p) => {
          const imageUrl = p.variantImages[0]?.image_url ?? PLACEHOLDER_IMAGE;

          return (
            <Link
              key={p.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-3 block border border-neutral-100 dark:border-neutral-800 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
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
              <div className="relative aspect-square overflow-hidden rounded-xl mb-4">
                <Image
                  src={imageUrl}
                  alt={p.product.title}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="space-y-1 px-1">
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest opacity-70">
                  {p.productType}
                </p>
                <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate group-hover:text-primary transition-colors">
                  {p.product.title}
                </h3>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-lg font-black text-neutral-900 dark:text-white">
                    {formatCurrency(p.product.price)}
                  </p>
                  <div className="p-2 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <ShoppingBasket size={16} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <CommonPagination totalPages={totalPages} currentPage={page} />
      </div>
    </main>
  );
};

export default Products;
