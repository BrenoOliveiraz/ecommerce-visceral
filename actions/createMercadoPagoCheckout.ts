'use server'

import { preference } from '@/lib/mercadopago';
import { BasketItem } from '@/app/(store)/store';
import { imageUrl } from '@/lib/imageUrl';

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
  cep: string;
  endereco: string | null;
};

export type GroupBasketItem = {
  product: BasketItem['product']
  quantity: number
  size?: 'P' | 'M' | 'G' | undefined
}

export async function createMercadoPagoCheckout(
  items: GroupBasketItem[],
  metadata: Metadata,
  valorFrete: number
) {
  const rawBaseUrl = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
  if (!rawBaseUrl || !/^https?:\/\//.test(rawBaseUrl)) throw new Error("BASE_URL inválida.");

  const baseUrl = rawBaseUrl.replace(/\/$/, '');

  const successUrl = `${baseUrl}/success?orderNumber=${metadata.orderNumber}`;
  const failureUrl = `${baseUrl}/basket`;
  const pendingUrl = `${baseUrl}/basket`;

  const itemsComFrete = [
    ...items.map(item => ({
      id: item.product._id,
      title: item.product.name || 'Produto sem nome',
      description: `Tamanho: ${item.size ?? 'N/A'}`,
      picture_url: item.product.image ? imageUrl(item.product.image).url() : 'https://via.placeholder.com/150',
      quantity: Number(item.quantity),
      currency_id: 'BRL',
      unit_price: Number(item.product.price!.toFixed(2)),
      category_id: item.size,
      metadata: {
        size: item.size,
        cep: metadata.cep,
        endereco: metadata.endereco,
      }
    })),
    ...(valorFrete > 0 ? [{
      id: 'frete',
      title: 'Frete',
      description: 'Custo de envio',
      quantity: 1,
      currency_id: 'BRL',
      unit_price: valorFrete,
    }] : []),
  ];

  const response = await preference.create({
    body: {
      items: itemsComFrete,
      payer: {
        name: metadata.customerName,
        email: metadata.customerEmail,
      },
      external_reference: metadata.orderNumber,
      notification_url: `${baseUrl}/api/webhook/mercadopago`,
      back_urls: {
        success: successUrl,
        failure: failureUrl,
        pending: pendingUrl,
      },
      auto_return: 'approved',
      metadata: {
        clerkUserId: metadata.clerkUserId,
        cep: metadata.cep,
        endereco: metadata.endereco,
      },
    },
  });

  return response.init_point;
}
