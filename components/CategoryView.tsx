import { Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";



interface ProductsViewProps {
  products: Product[];
}

export default function CategoryView({ products }: ProductsViewProps) {
  return (
    <section className="px-6 md:px-20 py-12 bg-black text-white">
      {/* <StoreSection /> */}

      {/* Título */}
      <div className="">
        <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide border-b-2 border-red-600 inline-block pb-1">
            EVIL DEAD
          </h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
    
        {/* Bloco de produtos */}
        <div className="flex-1 bg-gray-200 rounded-lg p-2">
          <ProductGrid products={products.slice(0, 3)} />
        </div>
      </div>
    </section>
  );
}
