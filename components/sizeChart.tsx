'use client'

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Ruler } from "lucide-react";


export default function SizeChartModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    // Pequeno delay para acionar a transição após o elemento estar no DOM
    setTimeout(() => setShowContent(true), 10);
  };

  const closeModal = () => {
    // Esconde o conteúdo antes de remover o modal do DOM
    setShowContent(false);
    setTimeout(() => setIsOpen(false), 300); // Tempo igual à duração da animação
  };

  return (
    <>
      {/* Link que abre o modal */}
      <button
        onClick={openModal}
        className="text-red-600 hover:text-blue-800 transition cursor-pointer inline-flex items-center gap-1"
      >
        <Ruler className="w-4 h-4" />
        Ver tabela de tamanhos
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-opacity duration-300 "
          onClick={closeModal}
        >
          <div
            className={clsx(
              "bg-white rounded-2xl p-4 max-w-6xl w-full relative shadow-lg transform transition-all duration-300 ",
              showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de fechar */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            {/* Imagem da tabela */}
            <div className="relative w-full h-[600px]">
              <Image
                src="/tabela-tamanhos.png"
                alt="Tabela de tamanhos"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
