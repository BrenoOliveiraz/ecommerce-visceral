
import FullScreenImageSection from '@/components/FullScreenImageSection';
import BannerS1 from '../../components/BannerS1'
import ProductsView from '@/components/ProductsView';
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div>
      <BannerS1
        images={[
          { src: "/banner-teste.jpg", alt: "BANNER ASH" },
          { src: "/bannerDesktop2.jpg", alt: "BANNER LINDA " },
        ]}

        imagesMD={[
          { src: "/bannerCelular1.jpg", alt: "Banner 1" },
          { src: "/bannerCelular2.jpg", alt: "Banner 2" },
        ]}

      />


      <ProductsView products={products} />
      
      <FullScreenImageSection
        src="/teste2.jpg"
        alt="Imagem de transição com efeito parallax"
      />

      
      <ProductsView products={products} />
      {/* <FastSelector />
      <ProductsView products={products} />
      <BannerS2 />
      <FinallSession /> */}
    </div>
    
  );
}
