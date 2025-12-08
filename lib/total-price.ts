import { CartItem } from "@/store/cart-store"
export const totalPriceCalc = (cartItem: CartItem[]) => {
    return cartItem.reduce(
        (totalPrice, item) => {
             const price = Number(item.price);
            const total = price * item.variant.quantity;
            return totalPrice + total;
        }, 0
          
    )
}