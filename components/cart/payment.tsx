"use client"
import stripeInit from '@/lib/stripe-init'
import { totalPriceCalc } from '@/lib/total-price';
import { useCartStore } from '@/store/cart-store'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './payment-form';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react'; // Client-side hook
import LoginRequired from './login-required';

const stripe = stripeInit();


const Payment = () => {
    const { data: session, status } = useSession()
    const cart = useCartStore((state) => state.cart);
    const setCartPosition = useCartStore((state) => state.setCartPosition);

    useEffect(() => {
        if (cart.length === 0) setCartPosition("Order")
    }, [cart.length, setCartPosition])

   
    if (status === "loading") return <p className="text-center py-4">Checking access...</p>
    
 
    if (!session) return <LoginRequired />

  if (session) {
      return (
        <div className='max-w-4xl mx-auto'>
            <Elements stripe={stripe} options={{ mode: "payment", currency: "usd", amount: totalPriceCalc(cart) }} >
                <PaymentForm totalPrice={totalPriceCalc(cart)} />
            </Elements>
        </div>
    )
    }
}

export default Payment