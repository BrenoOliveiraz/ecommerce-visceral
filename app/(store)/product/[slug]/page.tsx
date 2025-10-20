import AddToBasketButton from "@/components/AddToBasketButton";
import SizeChartModal from "@/components/sizeChart";

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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Imagem do produto */}
        <div className={`relative aspect-square overflow-hidden rounded-lg ${isOutOfStock ? "opacity-50" : ""}`}>
          {product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name ?? "Product image"}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Informações do produto */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Nome e preço */}
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="text-xl font-semibold  mb-4">
              R${product.price?.toFixed(2)}
            </div>

            {/* Descrição do produto */}
            {Array.isArray(product.description) && (
              <div className="text-base leading-relaxed  mb-4">
                <PortableText value={product.description} />
              </div>
            )}

            <p className="mt-10">Design por - brunoold.art</p>
            {/* Tabela de tamanhos */}

            {/* Tabela de tamanhos */}
            <div className="mb-6 mt-6">
              <SizeChartModal />
            </div>

            {/* Aviso de pré-venda */}
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded mb-6 text-sm leading-relaxed">
              <p>
                Observe que as <strong>pré-vendas</strong> ficarão disponíveis por um período de <strong>2 meses</strong> e, após o
                encerramento das vendas, o envio ocorre em até <strong>15 dias úteis</strong>.
              </p>
              <p className="mt-2">
                Por favor, leia isto antes de fazer o pedido. Obrigado.
              </p>
              <p className="mt-2 font-medium">
                Envios da pré-venda iniciam-se a partir do dia <strong>15 de Janeiro</strong>.
              </p>
            </div>

          </div>

          {/* Botão de adicionar ao carrinho */}
          <div className="mt-6">
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>
        </div>

      </div>
    </div>
  );
}
