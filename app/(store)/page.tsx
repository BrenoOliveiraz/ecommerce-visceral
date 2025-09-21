
import BannerS1 from '../../components/BannerS1'
import ProductsView from '@/components/ProductsView';
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div>
      <BannerS1
        images={[
          { src: "/BANNER_ASH.jpg", alt: "BANNER ASH" },
          { src: "/BANNER_LINDA.jpg", alt: "BANNER LINDA" },

        ]}
        imagesMD={[
          { src: "/banner1MD.jpeg", alt: "Banner 1" },
          { src: "/banner2MD.jpeg", alt: "Banner 2" },
          { src: "/banner3MD.jpeg", alt: "Banner 3" },
          { src: "/banner4MD.jpeg", alt: "Banner 4" },
          { src: "/banner5MD.jpeg", alt: "Banner 5" },
          { src: "/banner6MD.png", alt: "Banner 6" }, 
        ]}
      />


      <ProductsView products={products} />
      {/* <FastSelector />
      <ProductsView products={products} />
      <BannerS2 />
      <FinallSession /> */}
    </div>
  );
}
