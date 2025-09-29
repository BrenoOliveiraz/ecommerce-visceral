'use client'

import { useBasketStore } from '@/app/(store)/store';
import { Product } from '@/sanity.types';
import { useEffect, useState } from 'react';

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      {/* Botão de remover */}
      <button
        onClick={() => removeItem(product._id)}
        disabled={itemCount === 0 || disabled}
        className={`
          w-10 h-10 rounded-full flex items-center justify-center 
          font-bold text-lg transition-all duration-200 
          border border-red-600
          ${itemCount === 0 || disabled
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : "bg-black text-red-500 hover:bg-red-600 hover:text-white shadow-md"}
        `}
      >
        -
      </button>

      {/* Quantidade */}
      <span className="min-w-[2rem] text-center font-semibold text-lg text-white">
        {itemCount}
      </span>

      {/* Botão de adicionar */}
      <button
        onClick={() => addItem(product)}
        disabled={disabled}
        className={`
          w-10 h-10 rounded-full flex items-center justify-center 
          font-bold text-lg transition-all duration-200 
          border border-red-600
          ${disabled
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : "bg-red-600 text-white hover:bg-red-700 shadow-md"}
        `}
      >
        +
      </button>
    </div>
  );
}

export default AddToBasketButton;
