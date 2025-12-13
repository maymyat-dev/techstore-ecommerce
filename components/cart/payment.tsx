"use client"
import stripeInit from '@/lib/stripe-init'
import { totalPriceCalc } from '@/lib/total-price';
import { useCartStore } from '@/store/cart-store'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './payment-form';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react'; 
import LoginRequired from './login-required';

const stripe = stripeInit();

interface PaymentProps  {
    onClose ?: () => void;
}

const Payment = ({onClose}: PaymentProps) => {
    const { data: session, status } = useSession()
    const cart = useCartStore((state) => state.cart);
    const setCartPosition = useCartStore((state) => state.setCartPosition);

    useEffect(() => {
        if (cart.length === 0) setCartPosition("Order")
    }, [cart.length, setCartPosition])
    
   
    if (status === "loading") return <div className="flex flex-col items-center justify-center py-10 gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-sm text-muted-foreground">Verifying session...</p>
            </div>
    
 
    if (status === "unauthenticated" || !session) {
        return <LoginRequired onClose={onClose} />;
    }

  if (session) {
      return (
        <div className='max-w-4xl mx-auto'>
            <Elements key={session?.user?.email || "stripe-elements"} stripe={stripe} options={{ mode: "payment", currency: "usd", amount: totalPriceCalc(cart) }} >
                <PaymentForm totalPrice={totalPriceCalc(cart)} />
            </Elements>
        </div>
    )
    }
}

export default Payment