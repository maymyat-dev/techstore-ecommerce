import React from 'react'
import NavLogo from './nav-logo'
import { auth } from '@/server/auth'
import { ModeToggle } from '@/components/mode-button'
import UserButton from './user-button'
import { ShoppingCart } from 'lucide-react'
import CartDrawer from '../cart/cart-drawer'

const AppNav = async() => {
    const session = await auth();

  return (
      <div className='w-full h-16 border-b border-b-slate-60 flex items-center justify-between px-4 mb-10'>
      <NavLogo />
      <div className='flex gap-4 items-center'>
        <CartDrawer>
          <div className='relative'>
          <ShoppingCart size={24} />
          <span className='absolute top-[-10px] right-[-10px] bg-primary text-white w-4 h-4 rounded-full flex items-center justify-center text-xs'>0</span>
        </div>
        </CartDrawer>
        <UserButton user={session?.user} />
        <ModeToggle/>
      </div>
    </div>
  )
}

export default AppNav