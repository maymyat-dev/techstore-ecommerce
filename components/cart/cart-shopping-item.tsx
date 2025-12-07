"use client";

import { useCartStore } from "@/store/cart-store";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatCurrency from "@/lib/formatCurrency";
import Image from "next/image";
import EmptyCartImg from "@/public/images/empty-cart.png";

const CartShoppingItem = () => {
  const cart = useCartStore((state) => state.cart);

  return (
    <main className="max-w-4xl mx-auto">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center py-10">
          <Image src={EmptyCartImg} alt="empty cart" width={200} height={200} />
          <p className="mt-4 text-gray-600">Your cart is empty</p>
        </div>
      ) : (
        <Table>
          <TableCaption>A list of your cart.</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cart.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-left">{item.name}</TableCell>

                <TableCell>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                </TableCell>

                <TableCell>{item.variant.quantity}</TableCell>

                <TableCell className="text-right">
                  ${formatCurrency(item.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
};

export default CartShoppingItem;
