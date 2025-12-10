import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cart-store";
import { PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

const Success = () => {
  const router = useRouter();
  const setCartPosition = useCartStore((state) => state.setCartPosition);
  const clearCart = useCartStore((state) => state.clearCart);
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });


    const timer = setTimeout(() => {
      clearCart();
      setCartPosition("Order");
      router.push("/");
    }, 5000); 


    return () => {
      clearTimeout(timer);
    };
  }, [clearCart, router, setCartPosition]); 

  return (
    <main className="animate-fadeIn max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
      <PartyPopper size={100} />

      <h2 className="text-3xl font-semibold mt-4">Payment Successful 🎉</h2>

      <p className="text-neutral-600">
        Thank you for your purchase! Your order is being processed.<br/> You will be
        automatically redirected in 5 seconds.
      </p>

      <div className="flex gap-3 mt-6">
        <Button> View Orders</Button>
        <Button
          variant="outline"
          onClick={() => {
            setCartPosition("Order");
            clearCart();
            router.push("/");
          }}
        >
          Go Home
        </Button>
      </div>
    </main>
  );
};

export default Success;