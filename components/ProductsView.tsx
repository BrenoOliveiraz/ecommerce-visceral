import { Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface ProductsViewProps {
  products: Product[];
}

export default function ProductsView({ products }: ProductsViewProps) {
  return (
    <section className="px-6 md:px-20 py-12 bg-black text-white">
      {/* <StoreSection /> */}

      {/* Título */}
      <div className="">
        <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide border-b-2 border-red-600 inline-block pb-1">
            EVIL DEAD
          </h2>

          <Link
            href="/allProducts"
            className="text-sm font-semibold text-red-600 hover:underline flex items-center gap-1"
          >
            Ver todos os produtos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Layout com imagem fora do bloco cinza */}
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
        {/* Imagem na parte preta */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <Image
            width={300}
            height={450}
            src="/initialImage2.jpeg"
            alt="Pre Order Highlight"
            className="h-[500px] w-[300px] rounded-lg object-cover shadow-lg"
          />
        </div>

        {/* Bloco de produtos */}
        <div className="flex-1 bg-gray-200 rounded-lg p-2">
          <ProductGrid products={products.slice(0, 3)} />
        </div>
      </div>
    </section>
  );
}
