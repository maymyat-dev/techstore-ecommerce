import React from 'react'
import NavLogo from './nav-logo'
import { auth } from '@/server/auth'
import { ModeToggle } from '@/components/mode-button'
import UserButton from './user-button'
import CartBtn from '../cart/cart-btn'


const AppNav = async() => {
  const session = await auth();


  return (
      <div className='w-full h-16 border-b border-b-slate-60  bg-white dark:bg-slate-800 flex items-center justify-between px-4 mb-10'>
      <NavLogo />
      <div className='flex gap-4 items-center'>
        <CartBtn/>
        <UserButton user={session?.user} />
        <ModeToggle/>
      </div>
    </div>
  )
}

export default AppNav