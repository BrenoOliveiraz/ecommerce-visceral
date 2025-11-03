'use client';

import { useState } from "react";
import AddToBasketButton from "@/components/AddToBasketButton";
import { Product } from "@/sanity.types";

interface ProductSizeSelectorProps {
  stockP: number;
  stockM: number;
  stockG: number;
  isOutOfStock: boolean;
  product: Product;
}

export default function ProductSizeSelector({
  stockP,
  stockM,
  stockG,
  isOutOfStock,
  product,
}: ProductSizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<"P" | "M" | "G" | null>(null);
  const [selectedStock, setSelectedStock] = useState(0);

  const handleSelectSize = (size: "P" | "M" | "G") => {
    setSelectedSize(size);
    switch (size) {
      case "P":
        setSelectedStock(stockP);
        break;
      case "M":
        setSelectedStock(stockM);
        break;
      case "G":
        setSelectedStock(stockG);
        break;
      default:
        setSelectedStock(0);
    }
  };

  return (
    <div className="mt-8">
      {/* Seletor de tamanhos */}
      <div className="flex gap-3 mb-6">
        {["P", "M", "G"].map((size) => {
          const stock =
            size === "P" ? stockP : size === "M" ? stockM : stockG;
          const isDisabled = stock <= 0;

          return (
            <button
              key={size}
              disabled={isDisabled}
              onClick={() => handleSelectSize(size as "P" | "M" | "G")}
              className={`px-4 py-2 rounded-md border ${
                selectedSize === size
                  ? "bg-red-600 text-white border-red-700"
                  : "bg-zinc-800 text-gray-200 border-gray-600"
              } ${
                isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>

      {/* Botão de adicionar ao carrinho */}
      <AddToBasketButton
        product={product}
        size={selectedSize}
        stock={selectedStock}
        disabled={isOutOfStock || !selectedSize} // 🚀 só habilita quando o tamanho foi escolhido
      />
    </div>
  );
}
