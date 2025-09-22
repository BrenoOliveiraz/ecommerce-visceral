'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BannerCarouselProps {
  images: { src: string; alt: string }[];
  imagesMD: { src: string; alt: string }[];
}

const BannerCarousel = ({ images, imagesMD }: BannerCarouselProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const selectedImages = isMobile ? imagesMD : images;

  const handleNext = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % selectedImages.length);
  }, [selectedImages.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) =>
      prev === 0 ? selectedImages.length - 1 : prev - 1
    );
  }, [selectedImages.length]);

  return (
    <div className="w-screen h-[90vh] relative overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="w-full h-full absolute top-0 left-0"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full h-full relative"
          >
            <Image
              src={selectedImages[index].src}
              alt={selectedImages[index].alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === 0} 
              loading={index <= 1 ? "eager" : "lazy"} 
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Botões de navegação */}
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
