import { Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CollectionCard from "./CollectionCard";
import StoreSection from "./StoreSection";

interface ProductsViewProps {
  products: Product[];
}

export default function ProductsView({ products }: ProductsViewProps) {
  return (

    <section className="px-6 md:px-20 py-12 bg-black text-white">
      {/* Linha de infos */}
      <StoreSection />

      {/* Coleções */}
      <div className="flex justify-center gap-8 my-12">
        <CollectionCard image="/colection-icon.jpg" title="Evil Dead" />
        <CollectionCard image="/colection-icon.jpg" title="Halloween" />
        <CollectionCard image="/colection-icon.jpg" title="Scary Movie" />
      </div>

      {/* Título */}
      <div className="">
        <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide border-b-2 border-red-600 inline-block pb-1">
            PRE ORDER
          </h2>
          <Link
            href="/allProducts"
            className="text-sm font-semibold text-red-600 hover:underline flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Produtos */}
      {/* Produtos */}
      <div className="relative max-w-6xl mx-auto bg-[#1a1a1a] rounded-lg p-4">
        <ProductGrid products={products.slice(0, 5)} />
      </div>

    </section>

  );
}
