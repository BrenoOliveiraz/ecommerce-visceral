
import ProductSizeSelector from "@/components/ProductSizeSelector";
import SizeChartModal from "@/components/sizeChart";

import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";

import { notFound } from "next/navigation";


export const dynamic = "force-dynamic";
export const revalidate = 60


export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  // 🧠 Nova lógica de estoque
  const stockP = product.stockP ?? 0;
  const stockM = product.stockM ?? 0;
  const stockG = product.stockG ?? 0;

  const isOutOfStock = stockP <= 0 && stockM <= 0 && stockG <= 0;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Imagem do produto */}
        <div className={`relative aspect-square overflow-hidden rounded-xl shadow-md ${isOutOfStock ? "opacity-50" : ""}`}>
          {product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name ?? "Product image"}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <span className="text-white font-semibold text-lg">Produto Esgotado</span>
            </div>
          )}
        </div>

        {/* Informações do produto */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Nome e preço */}
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            <div className="text-2xl font-semibold text-red-500 mb-6">
              R${product.price?.toFixed(2)}
            </div>

            {/* Descrição */}
            {[product.description, product.descriptionP2, product.descriptionP3].map(
              (desc, index) =>
                Array.isArray(desc) && (
                  <div key={index} className="text-base leading-relaxed text-gray-300 mb-6 prose prose-invert max-w-none">
                    <PortableText value={desc} />
                  </div>
                )
            )}

            {/* Estoque por tamanho */}


            {/* Design */}
            <p className="text-sm text-gray-400 mt-8 italic">Design por — {product.design}</p>

            {/* Tabela de tamanhos */}
              <SizeChartModal />

            {/* Aviso de pré-venda */}
            <div className="mt-10 bg-red-950 border-l-4 border-yellow-500 text-white p-5 rounded-lg text-sm leading-relaxed shadow-sm">
              <p>
                Observe que as <strong>pré-vendas</strong> ficarão disponíveis por um período de <strong>5 dias</strong> e, após o
                encerramento das vendas, o envio ocorre em até <strong>15 dias úteis</strong>.
              </p>
              <p className="mt-3">
                Por favor, leia isto antes de fazer o pedido. Obrigado.
              </p>
              <p className="mt-3 font-medium">
                Envios da pré-venda iniciam-se a partir do dia <strong>5 de Dezembro</strong>.
              </p>
            </div>
          </div>

          {/* Botão de adicionar ao carrinho */}
          <ProductSizeSelector
            stockP={stockP}
            stockM={stockM}
            stockG={stockG}
            isOutOfStock={isOutOfStock}
            product={product}
          />
        </div>

      </div>
    </div>
  );
}
