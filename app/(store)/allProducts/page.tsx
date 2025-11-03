import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

import ProductGrid from "@/components/ProductGrid";

import { Product } from "@/sanity.types";

export const dynamic = "force-dynamic";
export const revalidate = 60


export default async function AllProductsPage() {
  const products: Product[] = await getAllProducts();
 

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 text-center sm:text-left">
          Todos os Produtos
        </h1>

        <div className="w-full sm:w-72">
        
        </div>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
