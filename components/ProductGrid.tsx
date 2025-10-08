'use client'

import { Product } from '@/sanity.types'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProductCard from './ProductCard'

export default function ProductGrid({ products }: { products: Product[] }) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4">
            {products.map((product) => (
                <AnimatePresence key={product._id}>
                    <motion.div
                        layout
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-center p-2"
                    >
                        <div className="w-full max-w-[350px]"> 
                            <ProductCard product={product} />
                        </div>
                    </motion.div>
                </AnimatePresence>
            ))}
        </div>

    )
}
