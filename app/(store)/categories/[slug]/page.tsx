
import ProductsView from '@/components/ProductsView';

import { getProductsByCategory } from '@/sanity/lib/products/getProductByCategory';
import React from 'react';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const products = await getProductsByCategory(slug);


  const title =
    slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') + ' Collection';

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 text-left">
          {title}
        </h1>


      </div>

      <ProductsView products={products} />
    </div>
  );
}
