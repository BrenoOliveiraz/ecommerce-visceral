'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BannerCarouselProps {
  images: { src: string; alt: string }[];
  imagesMD: { src: string; alt: string }[];
}

const BannerCarousel = ({ images, imagesMD }: BannerCarouselProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // controla direção da transição
  const [loaded, setLoaded] = useState(false); // Para controle de animação de carregamento

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const selectedImages = isMobile ? imagesMD : images;

  // Troca automática a cada 6s
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [selectedImages.length]);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % selectedImages.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) =>
      prev === 0 ? selectedImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-screen h-[94vh] relative overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, scale: 1.05 }} // Começa com opacidade 0 e um leve zoom
          animate={{ opacity: 1, scale: 1 }} // Torna a imagem opaca e mantém a escala normal
          exit={{ opacity: 0, scale: 0.95 }} // Sai com uma escala reduzida e opacidade para efeito suave
          transition={{ duration: 1.2, ease: 'easeInOut' }} // Duração aumentada e transição mais suave
          className="w-full h-full absolute top-0 left-0"
        >
          {/* Animação de carregamento e transição de imagem */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }} // Suaviza a animação de carregamento
            className="w-full h-full relative"
          >
            <Image
              src={selectedImages[index].src}
              alt={selectedImages[index].alt}
              fill
              className="object-cover"
              priority
              onLoadingComplete={() => setLoaded(true)}  // Marca como carregado
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Botões (opcional) */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full"
      >
        ›
      </button>
    </div>
  );
};

export default BannerCarousel;
