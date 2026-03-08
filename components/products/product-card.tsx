import Link from "next/link";
import Image from "next/image";
import { ShoppingBasket } from "lucide-react";
import formatCurrency from "@/lib/formatCurrency";

interface ProductCardProps {
  product: any;
  isChat?: boolean;
}

export const ProductCard = ({ product, isChat = false }: ProductCardProps) => {
  const id = product.variantId || product.id;
  const productId = product.productId || product.id;
  const title = product.product?.title || product.title;
  const price = product.product?.price || product.price;
  const type = product.productType || product.type;
  const imageUrl =
    product.variantImages?.[0]?.image_url ||
    product.image_url ||
    "/images/placeholder-product.png";

  return (
    <Link
      href={{
        pathname: `/products/${id}`,
        query: {
          vid: id,
          productId: productId,
          type: type,
          image: imageUrl,
          title: title,
          price: price,
        },
      }}
      className={`group bg-white dark:bg-gray-800 rounded-2xl block border border-neutral-100 dark:border-neutral-800 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 
        ${isChat ? "p-2" : "p-3"}`}
    >
      <div
        className={`relative aspect-square overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900 
        ${isChat ? "mb-2" : "mb-4"}`}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
        {!isChat && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>

      <div className={`space-y-1 ${isChat ? "px-0" : "px-1"}`}>
        <p
          className={`${isChat ? "text-[8px]" : "text-[10px]"} text-primary font-bold uppercase tracking-widest opacity-70`}
        >
          {type}
        </p>
        <h3
          className={`${isChat ? "text-[11px]" : "text-sm"} font-semibold text-neutral-800 dark:text-neutral-200 truncate group-hover:text-primary transition-colors`}
        >
          {title}
        </h3>
        <div
          className={`flex items-center justify-between ${isChat ? "pt-1" : "pt-2"}`}
        >
          <p
            className={`${isChat ? "text-sm" : "text-lg"} font-black text-neutral-900 dark:text-white`}
          >
            {formatCurrency(price)}
          </p>
          <div
            className={`${isChat ? "p-1.5" : "p-2"} bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-all`}
          >
            <ShoppingBasket size={isChat ? 12 : 16} />
          </div>
        </div>
      </div>
    </Link>
  );
};
