'use client'

import AddToBasketButton from '@/components/AddToBasketButton';
import { useBasketStore } from '../store';
import { SignInButton, useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
import Loader from '@/components/Loader';
import { createMercadoPagoCheckout } from '@/actions/createMercadoPagoCheckout';
import CalculoFrete from '@/components/FreteCalculator';
import { Product } from '@/sanity.types';

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type Size = 'P' | 'M' | 'G' | null | undefined;

interface BasketItem {
  product: Product;
  quantity: number;
  size?: Size;
}

export default function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems()) as BasketItem[];
  const clearBasket = useBasketStore((state) => state.clearBasket);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [valorFrete, setValorFrete] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <Loader />;

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-6 text-white">Carrinho</h1>
        <p className="text-gray-400 text-lg">Seu carrinho está vazio!</p>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return;

    setIsLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? 'Unknown',
        customerEmail: user?.emailAddresses[0].emailAddress ?? 'Unknown',
        clerkUserId: user!.id,
      };

      const checkoutUrl = await createMercadoPagoCheckout(
        groupedItems,
        metadata,
        valorFrete
      );

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error('Error creating checkout session', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStockForSize = (product: Product, size?: Size): number => {
    switch (size) {
      case 'P':
        return product.stockP ?? 0;
      case 'M':
        return product.stockM ?? 0;
      case 'G':
        return product.stockG ?? 0;
      default:
        return 0;
    }
  };

  const totalProdutos = useBasketStore.getState().getTotalPrice();
  const totalGeral = totalProdutos + valorFrete;

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4 text-white">Seu carrinho</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Lista de produtos */}
        <div className="flex-grow">
          {groupedItems.map((item) => (
            <div
              key={`${item.product._id}-${item.size ?? 'default'}`}
              className="mb-4 p-4 bg-zinc-900 border border-red-600 rounded-lg flex items-center justify-between shadow-md"
            >
              <div
                className="flex items-center cursor-pointer flex-1 min-w-0"
                onClick={() => {
                  const slug = item.product.slug?.current;
                  if (slug) router.push(`/product/${slug}`);
                }}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? 'Product image'}
                      className="w-full h-full object-cover rounded"
                      width={96}
                      height={96}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold truncate text-white">
                    {item.product.name}
                  </h2>

                  {item.size && (
                    <p className="text-sm sm:text-base text-gray-400">
                      Tamanho: <span className="text-gray-200">{item.size}</span>
                    </p>
                  )}

                  <p className="text-sm sm:text-base text-gray-300">
                    Quantidade: {item.quantity}
                  </p>

                  <p className="text-sm sm:text-base text-gray-300">
                    Preço: R${((item.product.price ?? 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center ml-4 flex-shrink-0">
                <AddToBasketButton
                  product={item.product}
                  size={item.size}
                  stock={getStockForSize(item.product, item.size)}
                />
              </div>
            </div>
          ))}

          {/* Botão Limpar Carrinho abaixo dos itens */}
          <div className="mb-6">
            <button
              onClick={clearBasket}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Limpar carrinho
            </button>
          </div>
        </div>

        {/* Resumo do pedido */}
        <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-zinc-900 p-6 border border-red-600 rounded-lg shadow-lg order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
          <h3 className="text-xl font-semibold text-white">Resumo do pedido</h3>

          <div className="mt-4 mb-6">
            <CalculoFrete onSelectFrete={(valor) => setValorFrete(valor)} />
          </div>

          <div className="mt-4 space-y-2 text-gray-300">
            <p className="flex justify-between">
              <span>Itens:</span>
              <span>{groupedItems.reduce((t, i) => t + i.quantity, 0)}</span>
            </p>

            <p className="flex justify-between">
              <span>Subtotal:</span>
              <span>R${totalProdutos.toFixed(2)}</span>
            </p>

            <p className="flex justify-between">
              <span>Frete:</span>
              <span>R${valorFrete.toFixed(2)}</span>
            </p>

            <p className="flex justify-between text-2xl font-bold border-t border-gray-700 pt-2 text-red-500">
              <span>Total</span>
              <span>R${totalGeral.toFixed(2)}</span>
            </p>
          </div>

          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              {isLoading ? 'Processando...' : 'Finalizar compra'}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer">
                Entre para o checkout!
              </button>
            </SignInButton>
          )}
        </div>

        <div className="h-64 lg:h-0">{/* Spacer */}</div>
      </div>
    </div>
  );
}
