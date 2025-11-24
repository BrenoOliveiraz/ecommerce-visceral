'use client';

import { useState } from "react";
import { useBasketStore } from "@/app/(store)/store";
import { Product } from "@/sanity.types";
import {  ShoppingCart } from "lucide-react";

interface AddToBasketButtonProps {
  product: Product;
  size?: "P" | "M" | "G" | null;
  stock?: number;
  disabled?: boolean;
}

export default function AddToBasketButton({
  product,
  size,
  stock = 0,
  disabled,
}: AddToBasketButtonProps) {
  const { addItem,  getItemCount } = useBasketStore();
  const [error, setError] = useState<string | null>(null);

  const itemCount = getItemCount(product._id, size || "");

  const handleAdd = () => {
    if (!size) {
      setError("Selecione um tamanho primeiro!");
      return;
    }

    if (size && stock && itemCount >= stock) {
      setError("⚠️ Você já adicionou o máximo disponível em estoque.");
      return;
    }

    setError(null);
    addItem(product, size);
  };

  // const handleRemove = () => {
  //   if (!size) return;
  //   setError(null);
  //   removeItem(product._id, size);
  // };

  return (
    <div className="flex flex-col items-center gap-2 w-3xs">
      {/* Controles de quantidade */}
      {/* <div className="flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 shadow-inner w-full max-w-[220px]">
        <button
          onClick={handleRemove}
          disabled={disabled || itemCount === 0}
          className={`p-2 rounded-full transition-all ${
            disabled || itemCount === 0
              ? "bg-zinc-800 text-gray-500 cursor-not-allowed"
              : "bg-zinc-800 text-white hover:bg-red-600"
          }`}
        >
          <Minus size={18} />
        </button>

        <span className="text-white font-semibold w-8 text-center select-none">
          {itemCount}
        </span>

        <button
          onClick={handleAdd}
          disabled={disabled}
          className={`p-2 rounded-full transition-all ${
            disabled
              ? "bg-zinc-800 text-gray-500 cursor-not-allowed"
              : "bg-zinc-800 text-white hover:bg-red-600"
          }`}
        >
          <Plus size={18} />
        </button>
      </div> */}

      {/* Botão principal */}
      <button
        onClick={handleAdd}
        disabled={disabled}
        className={`flex items-center justify-center gap-2 mt-2 px-4 py-2 w-full max-w-[220px] rounded-lg font-semibold text-sm uppercase tracking-wide transition-all
          ${
            disabled
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-red-800/40"
          }`}
      >
        <ShoppingCart size={18} />
        Adicionar ao carrinho
      </button>

      {/* Mensagens de erro */}
      {error && (
        <p className="text-yellow-400 text-sm text-center max-w-[220px] mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
