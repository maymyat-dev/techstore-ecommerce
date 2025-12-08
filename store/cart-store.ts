import { create } from "zustand";
import { persist } from "zustand/middleware"
export type Variant = {
    variantId: number;
    quantity: number;


}

export type CartItem = {
    id: number;
    name: string;
    image: string;
    price: number;
    variant: Variant;
}  

export type CartType = {
    cart: CartItem[],
    addToCart: (item: CartItem) => void
    removeFromCart: (item: CartItem) => void
}

export const useCartStore = create(persist<CartType>((set) => ({
    cart: [],
    addToCart: (item) => set((state) => {
        const existingItem = state.cart.find((cartItem) => cartItem.variant.variantId === item.variant.variantId)
        
        if (existingItem) {
            const updatedCart = state.cart.map((CartItem) => {
                if (CartItem.variant.variantId === item.variant.variantId) {
                    return {
                        ...CartItem,
                        variant: {
                            ...CartItem.variant,
                            quantity: CartItem.variant.quantity + item.variant.quantity
                        }
                    }
                }
                return CartItem
            });

            return {
                cart: updatedCart
            }
        }
        else {
            return {
                cart: [...state.cart, {...item, variant: {variantId: item.variant.variantId, quantity: item.variant.quantity}}]
            }
        }
    }),
    removeFromCart: (item) => set((state) => {
        const updatedCart = state.cart.map((CartItem) => {
                if (CartItem.variant.variantId === item.variant.variantId) {
                    return {
                        ...CartItem,
                        variant: {
                            ...CartItem.variant,
                            quantity: CartItem.variant.quantity -1
                        }
                    }
                }
                return CartItem
            }    
        );

        return {
            cart: updatedCart.filter((CartItem) => CartItem.variant.quantity > 0)
        }
    })
}), {
    name: "shopping-cart-store"
}))