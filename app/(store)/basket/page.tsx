'use client'

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
import BasketButtons from '@/components/BasketButtons';

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
  cep: string;
  endereco: string | null;
  complemento: string;
  cpf: string;
  nomeCompleto: string;
  numeroContato: string;
};

export type Size = 'P' | 'M' | 'G' | undefined;

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
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState<string | null>(null);
  const [complemento, setComplemento] = useState("");
  const [cpf, setCpf] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [numeroContato, setNumeroContato] = useState("");

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

    if (!complemento.trim()) {
      alert("Por favor, preencha o número / complemento.");
      return;
    }

    // ❌ Removida a trava do frete obrigatório

    setIsLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? 'Unknown',
        customerEmail: user?.emailAddresses[0].emailAddress ?? 'Unknown',
        clerkUserId: user!.id,
        cep,
        endereco: endereco ?? "Não informado",
        complemento: complemento ?? "",
        cpf,
        nomeCompleto,
        numeroContato
      };

      const checkoutUrl = await createMercadoPagoCheckout(
        groupedItems,
        metadata,
        valorFrete // frete opcional
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
      case 'P': return product.stockP ?? 0;
      case 'M': return product.stockM ?? 0;
      case 'G': return product.stockG ?? 0;
      default: return 0;
    }
  };

  const totalProdutos = useBasketStore.getState().getTotalPrice();
  const totalGeral = totalProdutos + (valorFrete > 0 ? valorFrete : 0);

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4 text-white">Seu carrinho</h1>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* LISTA DE PRODUTOS */}
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
                  {Array.isArray(item.product.images) && item.product.images[0] && (
                    <Image
                      src={imageUrl(item.product.images[0]).url()}
                      alt={item.product.name ?? "Product image"}
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
                    <p className="text-sm text-gray-400">
                      Tamanho: <span className="text-gray-200">{item.size}</span>
                    </p>
                  )}

                  <p className="text-sm text-gray-300">
                    Quantidade: {item.quantity}
                  </p>

                  <p className="text-sm text-gray-300">
                    Preço: R${((item.product.price ?? 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center ml-4">
                <BasketButtons
                  product={item.product}
                  size={item.size}
                  stock={getStockForSize(item.product, item.size)}
                />
              </div>
            </div>
          ))}

          {/* Botão limpar carrinho */}
          <div className="mb-6">
            <button
              onClick={clearBasket}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Limpar carrinho
            </button>
          </div>
        </div>

        {/* RESUMO DO CLIENTE */}
        {endereco && (
          <div className="w-full lg:w-80 bg-zinc-900 p-6 border border-blue-600 rounded-lg shadow-lg order-last">
            <h3 className="text-xl font-semibold text-white mb-4">Resumo do cliente</h3>

            <label className="text-gray-200 font-medium" htmlFor="cpf">
              CPF
            </label>
            <input
              id="cpf"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="000.000.000-00"
              className="p-2 rounded border border-gray-700 bg-zinc-800 text-white"
            />

            <label className="block text-gray-200 font-medium mt-6" htmlFor="nomecompleto">
              Nome Completo
            </label>
            <input
              id="nomecompleto"
              type="text"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              placeholder="Digite seu nome completo"
              className="p-2 rounded border border-gray-700 bg-zinc-800 text-white"
            />

            <label className="block text-gray-200 font-medium mt-6" htmlFor="numerocontato">
              Número para Contato
            </label>
            <input
              id="numerocontato"
              type="text"
              value={numeroContato}
              onChange={(e) => setNumeroContato(e.target.value)}
              placeholder="Número com DDD"
              className="p-2 rounded border border-gray-700 bg-zinc-800 text-white"
            />

            <label className="text-gray-200 font-medium mt-6" htmlFor="complemento">
              Número da Casa
            </label>
            <input
              id="complemento"
              type="text"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              placeholder="Ex: Apt 101, Casa 12"
              className="p-2 rounded border border-gray-700 bg-zinc-800 text-white"
            />
          </div>
        )}

        {/* RESUMO DO PEDIDO */}
        <div className="w-full lg:w-80 bg-zinc-900 p-6 border border-red-600 rounded-lg shadow-lg order-2 lg:sticky lg:top-4">
          <h3 className="text-xl font-semibold text-white mb-4">Resumo do pedido</h3>

          <div className="mb-6">
            <CalculoFrete
              onSelectFrete={(valor) => setValorFrete(valor)}
              onCepEncontrado={(ce, en) => {
                setEndereco(en);
                setCep(ce);
              }}
              onComplementoChange={(value) => setComplemento(value)}
            />
          </div>

          <div className="space-y-2 text-gray-300">
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

          {/* ❌ Removida a trava do frete obrigatório */}

          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading || !complemento.trim()}
              className={`mt-4 w-full px-4 py-2 rounded-lg transition-colors
                ${isLoading || !complemento.trim()
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-white'}
              `}
            >
              {isLoading ? "Processando..." : "Finalizar compra"}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer">
                Entre para o checkout!
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
}
