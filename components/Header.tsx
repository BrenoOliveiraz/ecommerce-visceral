'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { Search, ShoppingCart, User, HelpCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useBasketStore } from '@/app/(store)/store'
import Form from 'next/form'
import { whatsappLink } from '@/lib/whatsLink'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const { user } = useUser()
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  )

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-black/95 shadow-md py-2' : 'bg-black py-4 '
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap relative">

          <Link href="/" className="flex items-center space-x-2">

            <h1 className="font-[var(--font-visceral)] text-red-600 text-4xl tracking-widest">
              VISCERAL
            </h1>
          </Link>


          <Form
            action="/search"
            className="flex flex-1 max-w-xl bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 items-center shadow-sm"
          >
            <input
              type="text"
              name="query"
              placeholder="Buscar camisas de terror..."
              className="flex-1 outline-none text-sm text-gray-200 placeholder:text-gray-500 bg-transparent"
            />
            <Search className="w-5 h-8 text-gray-400" />
          </Form>


          <div className="flex items-center gap-6 text-sm font-medium text-gray-200 whitespace-nowrap relative">

            <button
              className="hover:text-red-600 transition"
              onMouseEnter={() => setOpenMenu(true)}
            >
              Collections
            </button>


            <Link
              href={whatsappLink}
              className="flex items-center gap-1 hover:text-red-600 transition"
              target="_blank"
            >
              <HelpCircle className="w-5 h-5 text-red-600" />
              <span>Atendimento</span>
            </Link>


            <Link
              href="/basket"
              className="relative flex items-center gap-1 hover:text-red-600 transition"
            >
              <ShoppingCart className="w-5 h-5 text-red-600" />
              <span className="absolute -top-2 -right-2 bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            </Link>


            {user ? (
              <Link
                href="/account"
                className="flex items-center gap-1 hover:text-red-600 transition"
              >
                <UserButton />
              </Link>
            ) : (
              <SignInButton mode="modal">
                <div className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-md cursor-pointer shadow-sm transition-all">
                  <User className="w-4 h-4" />
                  <span>Entrar</span>
                </div>
              </SignInButton>
            )}
          </div>
        </div>


        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-900 via-red-700 to-red-500" />
      </header>

      <AnimatePresence>
        {openMenu && (
          <motion.div
            key="megaMenu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute top-[80px] left-0 w-full bg-[#0D0D0D] border-t border-red-900 shadow-lg z-50"
            onMouseLeave={() => setOpenMenu(false)}
          >
            <div className="max-w-7xl mx-auto px-20 py-8 grid grid-cols-4 gap-8">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-red-600">Evil Dead</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>
                    <Link href="/collections/evil-dead" className="hover:text-red-500 transition">
                      Evil Dead (1981)
                    </Link>
                  </li>
            
                </ul>
              </div>
            </div>
          </motion.div>

        )}
      </AnimatePresence>
    </>
  )
}
