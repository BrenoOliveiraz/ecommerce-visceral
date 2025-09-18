'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { Search,ShoppingCart, User, HelpCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useBasketStore } from '@/app/(store)/store'
import Form from 'next/form'
import { whatsappLink } from '@/lib/whatsLink';

export default function Header() {
  const { user } = useUser()
  const [scrolled, setScrolled] = useState(false)
  const itemCount = useBasketStore((state) => state.items.reduce((total, item) => total + item.quantity, 0)
  )

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-white w-full transition-all duration-300 ${scrolled ? 'shadow-md py-2' : 'shadow-sm py-4'
        }`}
    >

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">


        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo-Photoroom.png"
            alt="Logo"
            width={70}
            height={60}
            className="object-contain"
          />
          <span className="text-[#4FC3CF] font-bold text-xl">VitalZon</span>
        </Link>


        <Form action="/search" className="flex flex-1 max-w-xl bg-[#F6F6F6] rounded px-3 py-2 items-center shadow-sm">
          <input
            type="text"
            name="query"
            placeholder="Olá, o que está procurando hoje?"
            className="flex-1 outline-none text-sm text-[#333333] placeholder:text-gray-500 bg-transparent"
          />
          <Search className="w-5 h-8 text-gray-500" />
        </Form>


        <div className="flex items-center gap-6 text-sm font-medium text-[#333333] whitespace-nowrap">


          <Link href={whatsappLink} className="flex items-center gap-1 hover:opacity-75 transition" target="_blank">
            <HelpCircle className="w-5 h-5 text-[#4FC3CF]" />
            <span>Atendimento</span>
          </Link>





          <Link href="/basket" className="relative flex items-center gap-1 hover:opacity-75 transition">
            <ShoppingCart className="w-5 h-5 text-[#4FC3CF]" />
            <span
              className='
              absolute -top-2 -right-2 bg-blue-300 text-white rounded-full w-5 h-5 items-center justify-center text-center text-xs'
            >
              {itemCount}
            </span>
          </Link>



          {user ? (

            <Link href="/account" className="flex items-center gap-1 hover:opacity-75 transition">

              <UserButton />
            </Link>
          ) : (
            <SignInButton mode='modal'>
              <div className="flex items-center gap-2 bg-[#4FC3CF] hover:bg-[#3BB1BD] text-white font-semibold py-2 px-4 rounded-md cursor-pointer shadow-sm transition-all">
                <User className="w-4 h-4" />
                <span>Entrar</span>
              </div>
            </SignInButton>

          )
          }


        </div>
      </div>


      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#FFF9C4] via-[#4FC3CF] to-[#A1E5CF]


" />
    </header>
  )
}
