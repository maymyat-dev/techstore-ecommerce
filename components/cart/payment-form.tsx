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
import { createOrder } from "@/server/actions/orders";
import { useAction } from "next-safe-action/hooks";
import { ArrowLeft } from "lucide-react";

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

  const { execute } = useAction(createOrder, {
    onSuccess: ({data}) => {
      if (data?.error) {

      }
      if (data?.success) {
        clearCart();
        setCartPosition("Success");
      }
    }

  })

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
          execute({
            paymentId: data.success.paymentIntentId,
            totalPrice,
            status: "pending",
            products: cart.map((cartItem) => ({
              productId: cartItem.id,
              quantity: cartItem.variant.quantity,
              variantId: cartItem.variant.variantId,
            }))
          })
        }
    }
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <PaymentElement />
      <div className="flex justify-between gap-2 mt-5">
        <Button type="button" variant={"outline"} onClick={()=>setCartPosition("Order")} className="w-[100px]"> <ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
        <Button type="button"  className="flex-1" disabled={loading || !stripe || !elements}>Pay</Button>
      </div>
    </form>
  );
};

export default PaymentForm;
