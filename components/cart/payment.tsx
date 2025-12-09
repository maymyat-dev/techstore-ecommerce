"use client"
import stripeInit from '@/lib/stripe-init'
import { totalPriceCalc } from '@/lib/total-price';
import { useCartStore } from '@/store/cart-store'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './payment-form';

const stripe = stripeInit();

const Payment = () => {
    const cart = useCartStore((state) => state.cart);

    

  return (
      <div className='max-w-4xl mx-auto'>
          <Elements stripe={stripe} options={{ mode: "payment", currency: "usd", amount: totalPriceCalc(cart) }} >
            <PaymentForm totalPrice={totalPriceCalc(cart)} />
          </Elements>
    </div>
  )
}

export default Payment