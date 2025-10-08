
import BannerS1 from '../../components/BannerS1'
import ProductsView from '@/components/ProductsView';
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import Footer from '@/components/Footer';
import Poster from '@/components/PosterSession';

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div>
      <BannerS1
        images={[
          { src: "/banner-1.jpg", alt: "BANNER ASH" },
          { src: "/banner-2.jpg", alt: "BANNER LINDA " },
          { src: "/banner-3.jpg", alt: "BANNER INICIO " },
        ]}

        imagesMD={[
          { src: "/celular-1.jpg", alt: "Banner 1" },
          { src: "/celular-2.jpg", alt: "Banner 2" },
          { src: "/celular-3.jpg", alt: "Banner 3" },
        ]}

      />


      <ProductsView products={products} />
      <Poster />
      
      {/* <FullScreenImageSection
        src="/teste2.jpg"
        alt="Imagem de transição com efeito parallax"
      /> */}

        <Footer />
      {/* <FastSelector />
      <ProductsView products={products} />
      <BannerS2 />
      <FinallSession /> */}
    </div>
    
  );
}
