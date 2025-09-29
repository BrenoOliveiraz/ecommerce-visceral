import AddToBasketButton from "@/components/AddToBasketButton";
import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#111] p-6 rounded-2xl shadow-lg">
        
        {/* Imagem do produto */}
        <div
          className={`relative aspect-square overflow-hidden rounded-xl border border-red-600 shadow-lg ${
            isOutOfStock ? "opacity-60" : ""
          }`}
        >
          {product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name ?? "Product image"}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
              <span className="text-white font-bold text-xl uppercase tracking-widest">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Info do produto */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold mb-4 text-white tracking-wide">
              {product.name}
            </h1>
            <div className="text-2xl font-bold mb-6 text-red-500">
              R${product.price?.toFixed(2)}
            </div>

            <div className="prose prose-invert max-w-none mb-8 text-gray-300">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>
          </div>

          {/* Botão de adicionar */}
          <div className="mt-6">
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
}
