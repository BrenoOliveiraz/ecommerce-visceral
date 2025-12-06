"use client";

import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import { useState } from "react";

export default function ProductGallery({
  images,
  isOutOfStock,
}: {
  images: any[];
  isOutOfStock: boolean;
}) {
  const [selectedImage, setSelectedImage] = useState(images?.[0]);
  const [fade, setFade] = useState(false);

  const handleSelect = (img: any) => {
    // Ativa animação
    setFade(true);

    // Troca a imagem depois de um pequeno delay
    setTimeout(() => {
      setSelectedImage(img);
      setFade(false); // remove a animação
    }, 150); // Delay pequeno para o fade
  };

  return (
    <div className="flex gap-4">
      
      {/* MINIATURAS À ESQUERDA */}
      <div className="flex flex-col gap-3 w-20">
        {images?.map((img, index) => (
          <button
            key={index}
            onClick={() => handleSelect(img)}
            className={`relative w-20 h-20 rounded-md overflow-hidden border transition-colors
              ${selectedImage === img ? "border-red-500" : "border-gray-700"}`}
          >
            <Image
              src={imageUrl(img).url()}
              alt={`Miniatura ${index}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* IMAGEM PRINCIPAL */}
      <div
        className={`relative aspect-square flex-1 overflow-hidden rounded-xl shadow-md ${
          isOutOfStock ? "opacity-50" : ""
        }`}
      >
        {selectedImage ? (
          <Image
            key={imageUrl(selectedImage).url()} // força re-render
            src={imageUrl(selectedImage).url()}
            alt="Imagem principal do produto"
            fill
            className={`object-contain transition-opacity duration-300 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          />
        ) : (
          <Image
            src="/placeholder.png"
            alt="Imagem não disponível"
            fill
            className="object-contain"
          />
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="text-white font-semibold text-lg">Produto Esgotado</span>
          </div>
        )}
      </div>
    </div>
  );
}
