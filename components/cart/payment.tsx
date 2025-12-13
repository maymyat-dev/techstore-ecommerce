"use client"
import Script from 'next/script'
import stripeInit from '@/lib/stripe-init' 
import { totalPriceCalc } from '@/lib/total-price';
import { useCartStore } from '@/store/cart-store'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './payment-form';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; 
import LoginRequired from './login-required';
import { Stripe } from '@stripe/stripe-js';

const Payment = ({onClose}: {onClose?: () => void}) => {
    const { data: session, status } = useSession()
    const cart = useCartStore((state) => state.cart);
    const setCartPosition = useCartStore((state) => state.setCartPosition);
    
   
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

    useEffect(() => {
        if (cart.length === 0) setCartPosition("Order")
    }, [cart.length, setCartPosition])

    
    const handleScriptLoad = () => {
        setStripePromise(stripeInit());
    };

    if (status === "loading") return <div>Loading...</div>
    if (status === "unauthenticated" || !session) return <LoginRequired onClose={onClose} />;

    return (
        <div className='max-w-4xl mx-auto'>
            <Script 
                src="https://js.stripe.com/v3/" 
                strategy="afterInteractive"
                onLoad={handleScriptLoad} 
            />
            
            {stripePromise && (
                <Elements 
                    key={session?.user?.email || "stripe-elements"} 
                    stripe={stripePromise} 
                    options={{ mode: "payment", currency: "usd", amount: totalPriceCalc(cart) }} 
                >
                    <PaymentForm totalPrice={totalPriceCalc(cart)} />
                </Elements>
            )}
        </div>
    )
}

export default Payment