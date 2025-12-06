import { imageUrl } from '@/lib/imageUrl';
import { Product } from '@/sanity.types';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  
  const stockP = product.stockP ?? 0;
  const stockM = product.stockM ?? 0;
  const stockG = product.stockG ?? 0;

  const isOutOfStock = stockP <= 0 && stockM <= 0 && stockG <= 0;

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`
        group flex flex-col rounded-xl 
        border-2 border-red-700/40 
        bg-neutral-950 
        shadow-lg shadow-red-900/30 
        hover:shadow-red-600/50 
        hover:scale-105 
        transition-all duration-300 overflow-hidden
        ${isOutOfStock ? "opacity-50" : ""}
      `}
    >
      {/* imagem */}
      <div className="relative aspect-square w-full overflow-hidden">
        {product.image && (
          <Image
            className="object-contain transition-transform duration-500 group-hover:scale-110"
            src={imageUrl(product.image).url()}
            alt={product.name || "Product Image"}
            fill
          />
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="text-white font-semibold text-sm">Esgotado</span>
          </div>
        )}
      </div>

      {/* conteúdo */}
      <div className="p-4 text-center flex flex-col gap-2">
        <h2 className="text-sm md:text-base font-semibold text-white min-h-[80px]">
          {product.name}
        </h2>
        <p className="text-sm font-bold text-gray-300 group-hover:text-red-500">
          R${product.price?.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
