"use client";
import stripeInit from "@/lib/stripe-init";
import { totalPriceCalc } from "@/lib/total-price";
import { useCartStore } from "@/store/cart-store";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./payment-form";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import LoginRequired from "./login-required";
import { Stripe } from "@stripe/stripe-js";
import { Spinner } from "../ui/spinner";

const Payment = ({ onClose }: { onClose?: () => void }) => {
  const { data: session, status } = useSession();
  const cart = useCartStore((state) => state.cart);
  const setCartPosition = useCartStore((state) => state.setCartPosition);

  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);

  const total = useMemo(() => totalPriceCalc(cart), [cart]);

  const options = useMemo(
    () => ({
      mode: "payment" as const,
      currency: "usd",
      amount: total,
    }),
    [total]
  );

  useEffect(() => {
    if (cart.length === 0) setCartPosition("Order");
  }, [cart.length, setCartPosition]);

  useEffect(() => {
    setStripePromise(stripeInit());
  }, []);

  if (status === "loading" || !stripePromise) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (status === "unauthenticated" || !session)
        return <LoginRequired onClose={onClose} />;
    

  return (
    <div className="max-w-4xl mx-auto">
      <Elements stripe={stripePromise} options={options}>
        <PaymentForm totalPrice={total} />
      </Elements>
    </div>
  );
};

export default Payment;
