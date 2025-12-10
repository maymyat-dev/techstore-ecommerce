"use client";

import { useCartStore } from "@/store/cart-store";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatCurrency from "@/lib/formatCurrency";
import Image from "next/image";
import EmptyCartImg from "@/public/images/empty-cart.png";
import { Button } from "../ui/button";
import { DeleteIcon, MinusIcon, PlusIcon, Trash, Trash2 } from "lucide-react";
import { totalPriceCalc } from "@/lib/total-price";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const CartShoppingItem = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const setCartPosition = useCartStore((state) => state.setCartPosition);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <main className="max-w-4xl mx-auto">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center py-10">
          <Image src={EmptyCartImg} alt="empty cart" width={200} height={200} />
          <p className="mt-4 text-gray-600">Your cart is empty</p>
        </div>
      ) : (
        <>
          <ScrollArea className="max-h-80 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {cart.map((cItem, index) => (
                  <TableRow key={`${cItem.id}-${index}`}>
                    <TableCell className="font-medium text-left">
                      {cItem.name}
                    </TableCell>

                    <TableCell className="py-4">
                      <Image
                        src={cItem.image}
                        alt={cItem.name}
                        width={50}
                        height={50}
                        className="rounded-md border border-gray-200"
                      />
                    </TableCell>

                    <TableCell className="py-4">
                      <div className="flex justify-center gap-4">
                        <Button
                          className="
                          quantity-control-btn hover:opacity-50
                          transition"
                          disabled={cItem.variant.quantity === 1}
                          onClick={() =>
                            removeFromCart({
                              ...cItem,
                              variant: {
                                variantId: cItem.variant.variantId,
                                quantity: 1,
                              },
                            })
                          }
                        >
                          <MinusIcon size={18} />
                        </Button>
                        {cItem.variant.quantity}
                        <Button
                          className="
                          quantity-control-btn hover:opacity-50 
                          transition"
                          disabled={cItem.variant.quantity === 10}
                          onClick={() =>
                            addToCart({
                              ...cItem,
                              variant: {
                                variantId: cItem.variant.variantId,
                                quantity: 1,
                              },
                            })
                          }
                        >
                          <PlusIcon size={18} />
                        </Button>
                      </div>
                    </TableCell>

                    <TableCell className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {formatCurrency(cItem.price)}
                        <Trash2 size={18} color="red" onClick={() => removeFromCart(cItem)} className="cursor-pointer" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="font-medium text-right">
                    Total
                  </TableCell>
                  <TableCell className="text-right text-xl font-bold text-primary dark:text-white">
                    {formatCurrency(totalPriceCalc(cart))} 
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <ScrollBar orientation="horizontal" />
            <ScrollBar orientation="vertical" />
          </ScrollArea>
          <div
            className="flex justify-end mt-6"
            onClick={() => setCartPosition("Checkout")}
          >
            <Button className=" cursor-pointer">Continue to checkout</Button>
          </div>
        </>
      )}
    </main>
  );
};

export default CartShoppingItem;
