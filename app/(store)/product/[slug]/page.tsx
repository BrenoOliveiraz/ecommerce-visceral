import ProductSizeSelector from "@/components/ProductSizeSelector";



import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";


import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery"; // ⬅ IMPORTANTE

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  // Estoque
  const stockP = product.stockP ?? 0;
  const stockM = product.stockM ?? 0;
  const stockG = product.stockG ?? 0;
  const stockGG = product.stockGG ?? 0;
  const stockXG = product.stockXG ?? 0;
  const isOutOfStock = stockP <= 0 && stockM <= 0 && stockG <= 0;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Galeria com miniaturas */}
        <ProductGallery
          images={product.images || []}
          isOutOfStock={isOutOfStock}
        />

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
                  <div
                    key={index}
                    className="text-base leading-relaxed text-gray-300 mb-6 prose prose-invert max-w-none"
                  >
                    <PortableText value={desc} />
                  </div>
                )
            )}

            {/* Design */}
            <p className="text-sm text-gray-400 mt-8 italic">
              Design por — {product.design}
            </p>

           
            {/* <SizeChartModal /> */}

            {/* Aviso de pré-venda */}
            <div className="mt-10 bg-red-950 border-l-4 border-yellow-500 text-white p-5 rounded-lg text-sm leading-relaxed shadow-sm">
              <p>
                "Envio ocorre em até{" "}
              {" "}
                <strong>15 dias uteis após o pagamento</strong>.
              </p>
              <p className="mt-3">
                Por favor, leia isto antes de fazer o pedido. Obrigado.
              </p>

   
            </div>
          </div>

          {/* Botão de adicionar ao carrinho */}
          <ProductSizeSelector
            stockP={stockP}
            stockM={stockM}
            stockG={stockG}
            stockGG={stockGG}
            stockXG={stockXG}
            isOutOfStock={isOutOfStock}
            product={product}
          />
        </div>
      </div>
    </div>
  );
}
