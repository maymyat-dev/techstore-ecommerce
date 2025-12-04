import { AppleIcon, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NavLogo = () => {
  return (
      <Link href={'/'} className='flex items-center'>
          <AppleIcon className='mr-2' size={30} fill="black" />
          <span className='font-bold text-lg text-neutral-900'>TechStore</span>
        </Link>
  )
}

export default NavLogo