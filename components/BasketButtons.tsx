'use client';

import { useState } from "react";
import { useBasketStore } from "@/app/(store)/store";
import { Product } from "@/sanity.types";

interface AddToBasketButtonProps {
  product: Product;
  size?: "P" | "M" | "G" | "GG" | "XG" | null;
  stock?: number;
  disabled?: boolean;
}

export default function BasketButtons({
  product,
  size,
  stock = 0,
  disabled,
}: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const [error, setError] = useState<string | null>(null);

  // Conta quantos itens deste produto/tamanho estão no carrinho
  const itemCount = getItemCount(product._id, size || "");

  const handleAdd = () => {
    if (!size) {
      setError("Selecione um tamanho primeiro!");
      return;
    }

    // ⚠️ só mostra erro se tiver tamanho e estoque definido
    if (size && stock && itemCount >= stock) {
      setError("⚠️ Você já adicionou o máximo disponível em estoque.");
      return;
    }

    setError(null);
    addItem(product, size);
  };

  const handleRemove = () => {
    if (!size) return;
    setError(null);
    removeItem(product._id, size);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Botões + e - */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleRemove}
          disabled={disabled || itemCount === 0}
          className={`px-3 py-1 text-xl font-bold rounded-md border border-gray-600 transition-colors
            ${
              disabled || itemCount === 0
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-zinc-800 text-white hover:bg-zinc-700"
            }`}
        >
          -
        </button>

        <span className="text-white font-semibold min-w-[2rem] text-center">
          {itemCount}
        </span>

        <button
          onClick={handleAdd}
          disabled={disabled}
          className={`      w-10 h-10 rounded-full flex items-center justify-center 
            font-bold text-lg transition-all duration-200 
            border border-red-600 cursor-pointer
            ${
              disabled
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
               : "bg-red-600 text-white hover:bg-red-700 shadow-md"}
            }`}

      
        >
          +
        </button>
      </div>

      {/* Mensagens de erro */}
      {error && <p className="text-yellow-400 text-sm text-center">{error}</p>}
    </div>
  );
}
