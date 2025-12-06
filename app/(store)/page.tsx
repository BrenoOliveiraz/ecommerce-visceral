
import BannerS1 from '../../components/BannerS1'
import ProductsView from '@/components/ProductsView';
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import Footer from '@/components/Footer';
import Poster from '@/components/PosterSession';


export const dynamic = "force-dynamic";
export const revalidate = 60

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div>
      <BannerS1
        images={[
          // { src: "/banner-ash-desktop.jpeg", alt: "BANNER ASH" },
          { src: "/banner-desktop-camisa.jpeg", alt: "BANNER ASH2 " },
          { src: "/banner-ash-desktop.jpeg", alt: "BANNER INICIO " },
          { src: "/banner-3.jpg", alt: "BANNER INICIO " },
        ]}

        imagesMD={[
          { src: "/banner-ash-cel.jpeg", alt: "Banner 1" },
          { src: "/banner-ash2-cel.jpeg", alt: "Banner 2" },
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
