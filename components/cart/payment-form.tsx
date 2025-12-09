"use client";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { processPayment } from "@/server/actions/payment";

type PaymentFormProps = {
  totalPrice: number;
};

const PaymentForm = ({ totalPrice }: PaymentFormProps) => {
  const cart = useCartStore((state) => state.cart);
  const setCartPosition = useCartStore((state) => state.setCartPosition);
  const clearCart = useCartStore((state) => state.clearCart);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setLoading(false);
      setErrorMsg(submitError.message || "Something went wrong");
      return;
    }
    const { data } = await processPayment({
      amount: totalPrice * 100,
      currency: "usd",
      cart: cart.map((cartItem) => ({
        quantity: cartItem.variant.quantity,
        productId: cartItem.id,
        title: cartItem.name,
        price: Number(cartItem.price),
        image: cartItem.image,
      })),
    });

    if (data?.error) {
      setLoading(false);
      setErrorMsg(data.error);
      return;
    }

    if (data?.success) {
      const paymentResponse = await stripe.confirmPayment({
        elements,
        clientSecret: data.success.clientSecretId!,
        redirect: "if_required",
        confirmParams: {
          return_url: "http://localhost:3000/success",
          receipt_email: data.success.user_email!,
        },
      });
        if (paymentResponse.error) {
            setErrorMsg(paymentResponse.error.message || "Something went wrong");
            setLoading(false);
            return
        } else {
            setLoading(false);
          console.log("Order is on the way.");
          setCartPosition("Success");
          clearCart();
        }
    }
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <PaymentElement />
      <div className="flex justify-end">
        <Button className="w-1/2 mt-5" disabled={loading || !stripe || !elements}>Pay</Button>
      </div>
    </form>
  );
};

export default PaymentForm;
