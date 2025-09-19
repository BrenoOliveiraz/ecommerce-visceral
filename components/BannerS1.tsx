'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion'; // 👈 importando framer-motion

interface BannerCarouselProps {
  images: { src: string; alt: string }[];
  imagesMD: { src: string; alt: string }[];
}

const BannerCarousel = ({ images, imagesMD }: BannerCarouselProps) => {
  const router = useRouter();
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
    slides: {
      perView: 1,
    },
  });

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (!slider) return;
    timer.current = setInterval(() => {
      slider.current?.next();
    }, 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [slider]);

  const selectedImages = isMobile ? imagesMD : images;

  return (
    <div ref={sliderRef} className="keen-slider w-screen h-[94vh]  relative overflow-hidden">
      {selectedImages.map((image, index) => (
        <div key={index} className="keen-slider__slide relative w-full h-full">
          {index === 0 ? (
            <motion.div
              initial={{ scale: 1.5 }} 
              animate={{ scale: 1 }} 
              transition={{ duration: 2, ease: 'easeOut' }} 
              className="w-full h-full relative"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          ) : (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default BannerCarousel;
